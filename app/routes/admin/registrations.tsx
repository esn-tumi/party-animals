import { ActionFunction, LoaderFunction, redirect } from '@remix-run/node';
import { useFetcher } from '@remix-run/react';
import { authenticator } from '~/services/auth.server';
import {
  Priority,
  Registration,
  Role,
  User,
  Status,
  Group,
} from '~/generated/prisma';
import { useLoaderData } from '@remix-run/react';
import { itemURL } from '~/utils';
import { db } from '~/utils/db.server';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    return redirect('/auth/login');
  }
  if (user.role !== Role.ADMIN) {
    throw new Error('You are not authorized to view this page');
  }
  const countries = fetch(
    'https://restcountries.com/v2/all?fields=name,alpha2Code,flags'
  ).then((res) => res.json());
  const registrations = db.registration.findMany({
    include: { user: true, group: true },
    orderBy: { createdAt: 'asc' },
  });
  const groups = db.group.findMany({
    orderBy: { name: 'asc' },
  });
  return Promise.all([registrations, countries, groups]);
};

export const action: ActionFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    return redirect('/auth/login');
  }
  if (user.role !== Role.ADMIN) {
    throw new Error(
      `Only Admins are allowed to change this! You are ${user.role}`
    );
  }
  const formData = await request.formData();
  const id = formData.get('id');
  if (typeof id !== 'string') {
    throw new Error('No id provided');
  }
  const priority = formData.get('prio');
  const groupId = formData.get('group');
  if (priority) {
    switch (priority) {
      case 'high':
        await db.registration.update({
          where: { id },
          data: { priority: Priority.HIGH },
        });
        break;
      case 'medium':
        await db.registration.update({
          where: { id },
          data: { priority: Priority.MEDIUM },
        });
        break;
      case 'low':
        await db.registration.update({
          where: { id },
          data: { priority: Priority.LOW },
        });
        break;
      case 'cancel':
        await db.registration.update({
          where: { id },
          data: {
            registrationStatus: Status.CANCELLED,
            group: { disconnect: true },
          },
        });
        break;
      case 'pending':
        await db.registration.update({
          where: { id },
          data: {
            registrationStatus: Status.PENDING,
          },
        });
        break;
      case 'none':
        await db.registration.update({
          where: { id },
          data: {
            registrationStatus: Status.REJECTED,
            group: { disconnect: true },
          },
        });
    }
  }
  if (typeof groupId === 'string') {
    if (groupId === 'none') {
      await db.registration.update({
        where: { id },
        data: { group: { disconnect: true } },
      });
    } else {
      await db.registration.update({
        where: { id },
        data: { group: { connect: { id: groupId } } },
      });
    }
  }
  return null;
};

export default function AdminRegistrations() {
  const fetcher = useFetcher();
  const [registrations, countries, groups] =
    useLoaderData<
      [(Registration & { user: User; group?: Group })[], any[], Group[]]
    >();
  const nonRejectedRegistrations = registrations.filter(
    (registration) => registration.status !== 'REJECTED'
  );
  const newExchangeRegistrations = nonRejectedRegistrations.filter(
    (registration) => registration.status === 'e'
  );
  const cultureCreaturesRegistrations = nonRejectedRegistrations.filter(
    (registration) => registration.programme === 'cc'
  );
  const partyAnimalsRegistrations = nonRejectedRegistrations.filter(
    (registration) => registration.programme === 'pa'
  );
  const eitherProgrammeRegistrations = nonRejectedRegistrations.filter(
    (registration) =>
      registration.programme === 'pa-cc' || registration.programme === 'cc-pa'
  );
  const femaleRegistrations = nonRejectedRegistrations.filter(
    (registration) => registration.gender === 'f'
  );
  const maleRegistrations = nonRejectedRegistrations.filter(
    (registration) => registration.gender === 'm'
  );
  const registrationsToday = registrations.filter(
    (registration) =>
      new Date().getDate() === new Date(registration.createdAt).getDate()
  );
  const mapGender = (short: string) => {
    switch (short) {
      case 'm':
        return 'male';
      case 'f':
        return 'female';
      case 'd':
        return 'genderqueer';
      case 'n':
        return 'question-mark';
    }
  };
  const mapStatus = (short: string) => {
    switch (short) {
      case 'l':
        return 'Local';
      case 'i':
        return 'International';
      case 'o':
        return 'Exchange (old)';
      case 'e':
        return 'Exchange (new)';
    }
  };
  const mapProgramme = (short: string) => {
    switch (short) {
      case 'pa':
        return 'Animals';
      case 'cc':
        return 'Creatures';
      case 'pa-cc':
        return 'Animals > Creatures';
      case 'cc-pa':
        return 'Creatures > Animals';
    }
  };
  const getCountry = (code: string) => {
    return countries.find((c) => c.alpha2Code === code);
  };

  function setPriority(id: string, prio: string) {
    fetcher.submit({ id, prio }, { method: 'patch' });
  }

  function setGroup(id: string, group: string) {
    fetcher.submit({ id, group }, { method: 'patch' });
  }

  return (
    <main className="px-2 md:px-8">
      <section className="bg-black min-w-fit rounded-md md:rounded-lg overflow-hidden p-8 md:p-12 m-auto my-2 md:my-8">
        <h1 className="text-2xl mb-6 font-medium text-white">Registrations</h1>
        <ul className="text-white grid gap-6 xl:gap-y-8 grid-cols-2 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
          <li className="">
            <p className="text-6xl font-medium mb-2">
              {nonRejectedRegistrations.length}
            </p>
            <p className="text-base font-normal text-white text-opacity-60 leading-snug">
              Total
            </p>
          </li>

          <li className="">
            <p className="text-6xl font-medium mb-2">
              {partyAnimalsRegistrations.length}
            </p>
            <p className="text-base font-normal text-white text-opacity-60 leading-snug">
              Animals
            </p>
          </li>

          <li className="">
            <p className="text-6xl font-medium mb-2">
              {cultureCreaturesRegistrations.length}
            </p>
            <p className="text-base font-normal text-white text-opacity-60 leading-snug">
              Creatures
            </p>
          </li>

          <li className="">
            <p className="text-6xl font-medium mb-2">
              {eitherProgrammeRegistrations.length}
            </p>
            <p className="text-base font-normal text-white text-opacity-60 leading-snug">
              Either
            </p>
          </li>

          <li className="">
            <p className="text-6xl font-medium mb-2">
              {femaleRegistrations.length}
            </p>
            <p className="text-base font-normal text-white text-opacity-60 leading-snug">
              Female
            </p>
          </li>

          <li className="">
            <p className="text-6xl font-medium mb-2">
              {maleRegistrations.length}
            </p>
            <p className="text-base font-normal text-white text-opacity-60 leading-snug">
              Male
            </p>
          </li>

          <li className="">
            <p className="text-6xl font-medium mb-2">
              {newExchangeRegistrations.length}
            </p>
            <p className="text-base font-normal text-white text-opacity-60 leading-snug">
              New Exchange
            </p>
          </li>

          <li className="">
            <p className="text-6xl font-medium mb-2">
              {registrationsToday.length}
            </p>
            <p className="text-base font-normal text-white text-opacity-60 leading-snug">
              Today
            </p>
          </li>
        </ul>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mb-8 gap-2 md:gap-y-8">
        {registrations.map((registration) => (
          <div
            key={registration.id}
            className={`flex flex-col rounded-[2.25rem] p-6 min-w-fit w-full h-fit ${(() => {
              if (registration.registrationStatus === 'ACCEPTED')
                return 'bg-green-200';
              switch (registration.gender) {
                case 'f':
                  return 'bg-pink-200';
                case 'm':
                  return 'bg-blue-200';
                case 'd':
                  return 'bg-violet-200';
                case 'n':
                  return 'bg-violet-200';
                default:
                  return 'bg-neutral-200';
              }
            })()}`}
          >
            <div className="mb-4 flex items-center">
              <img
                src={registration.user.photo}
                className="mr-4 w-12 overflow-hidden rounded-full"
                referrerPolicy={'no-referrer'}
              />
              <div>
                <h2 className="text-xl font-medium leading-tight">
                  {registration.user.firstName} {registration.user.lastName}{' '}
                </h2>
                <p className="text-neutral-600 leading-tight">
                  "{registration.callBy}"
                </p>
              </div>
              <div className="grow"></div>
              <img
                src={itemURL(`${mapGender(registration.gender)}:color`)}
                className="w-6"
              />
            </div>

            <div className="grid grid-cols-[minmax(max-content,_0.5fr)_1fr] gap-x-8 gap-y-1">
              <p className="text-neutral-600 leading-snug">Registered at</p>
              <p className="leading-snug">
                {new Date(registration.createdAt).toLocaleString('en-DE', {
                  month: 'numeric',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </p>

              <p className="text-neutral-600 leading-snug">Programme</p>
              <p className="leading-snug">
                {mapProgramme(registration.programme)}
              </p>

              <p className="text-neutral-600 leading-snug">Priority</p>
              <p className="leading-snug">{registration.priority}</p>

              <p className="text-neutral-600 leading-snug">Status</p>
              <p className="leading-snug">{registration.registrationStatus}</p>

              <p className="text-neutral-600 leading-snug">Payment</p>
              <p className="leading-snug">{registration.paymentStatus}</p>

              <p className="text-neutral-600 leading-snug">Group</p>
              <p className="leading-snug">
                {registration.group
                  ? registration?.group?.name ?? 'Not assigned'
                  : '-'}
              </p>

              {registration.group && registration.paymentStatus === 'PENDING' && (
                <>
                  <div></div>
                  <p className="text-red-600 font-medium leading-snug">
                    This registration has a group but is not paid!
                  </p>
                </>
              )}

              <hr className="border-black border-opacity-20 col-span-2 my-2" />

              <p className="text-neutral-600 leading-snug">Mail</p>
              <p className="leading-snug">{registration.user.email}</p>

              <p className="text-neutral-600 leading-snug">Phone</p>
              <div className="inline-flex items-center">
                <a
                  target="_blank"
                  href={`https://wa.me/${registration.phone.replace(`+`, ``)}`}
                  className="flex items-center"
                >
                  <p className="leading-snug">{registration.phone}</p>
                  <img
                    src={itemURL('whatsapp:color')}
                    className="block ml-1 w-6"
                  />
                </a>
              </div>

              <p className="text-neutral-600 leading-snug">University</p>
              <p className="leading-snug">{registration.university}</p>

              <p className="text-neutral-600 leading-snug">Status</p>
              <p className="leading-snug">{mapStatus(registration.status)}</p>

              <p className="text-neutral-600 leading-snug">ESN</p>
              <p className="leading-snug">
                {registration.esnSection ? registration.esnSection : '-'}
              </p>

              <hr className="border-black border-opacity-20 col-span-2 my-2" />

              <p className="text-neutral-600 leading-snug">Country</p>
              <div>
                <div className="leading-snug inline-flex flex-col items-center mr-2">
                  <img
                    src={getCountry(registration.country).flags.svg}
                    className="inline-block h-3 "
                    alt=""
                  />
                </div>
                <p className="inline leading-snug">
                  {getCountry(registration.country).name}
                </p>
              </div>

              <p className="text-neutral-600 leading-snug">Languages</p>
              <p className="leading-snug">
                {registration.languages ? registration.languages : '-'}
              </p>

              <hr className="border-black border-opacity-20 col-span-2 my-2" />

              <p className="text-neutral-600 leading-snug">Diet</p>
              <p className="leading-snug">{registration.diet}</p>

              <hr className="border-black border-opacity-20 col-span-2 my-2" />

              <p className="text-neutral-600 leading-snug">Oldie</p>
              <p className="leading-snug">
                {registration.oldie ? 'Yes' : 'No'}
              </p>

              <p className="text-neutral-600 leading-snug">Expectations</p>
              <p className="leading-snug">{registration.expectations}</p>

              <p className="text-neutral-600 leading-snug">Requests</p>
              <p className="leading-snug">
                {registration.requests ? registration.requests : '-'}
              </p>
            </div>

            <div className="flex flex-col gap-2 w-full mt-6">
              <Menu as="div" className="relative w-full text-left">
                <div>
                  <Menu.Button className="border border-transparent flex w-full justify-center rounded-xl bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2">
                    Set Priority
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-[50%] top-[100%] -translate-x-1/2 -translate-y-full z-20 w-full divide-y divide-neutral-200 rounded-md bg-white shadow-lg focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? 'bg-neutral-100 text-black'
                                : 'text-black'
                            } group flex w-full items-center px-2 py-2 text-sm`}
                            onClick={() =>
                              setPriority(registration.id, 'pending')
                            }
                          >
                            <img
                              src={itemURL('connection-status-off:color')}
                              className="mr-2 w-6"
                            />
                            Set to pending
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? 'bg-neutral-100 text-black'
                                : 'text-black'
                            } group flex w-full items-center px-2 py-2 text-sm`}
                            onClick={() =>
                              setPriority(registration.id, 'cancel')
                            }
                          >
                            <img
                              src={itemURL('cancel:color')}
                              className="mr-2 w-6"
                            />
                            Cancel
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? 'bg-neutral-100 text-black'
                                : 'text-black'
                            } group flex w-full items-center px-2 py-2 text-sm`}
                            onClick={() => setPriority(registration.id, 'none')}
                          >
                            <img
                              src={itemURL('remove-user-female:color')}
                              className="mr-2 w-6"
                            />
                            Reject
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? 'bg-neutral-100 text-black'
                                : 'text-black'
                            } group flex w-full items-center px-2 py-2 text-sm`}
                            onClick={() => setPriority(registration.id, 'high')}
                          >
                            <img
                              src={itemURL('high-priority:color')}
                              className="mr-2 w-6"
                            />
                            High Priority
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? 'bg-neutral-100 text-black'
                                : 'text-black'
                            } group flex w-full items-center px-2 py-2 text-sm`}
                            onClick={() =>
                              setPriority(registration.id, 'medium')
                            }
                          >
                            <img
                              src={itemURL('medium-priority:color')}
                              className="mr-2 w-6"
                            />
                            Medium Priority
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? 'bg-neutral-100 text-black'
                                : 'text-black'
                            } group flex w-full items-center px-2 py-2 text-sm`}
                            onClick={() => setPriority(registration.id, 'low')}
                          >
                            <img
                              src={itemURL('low-priority:color')}
                              className="mr-2 w-6"
                            />
                            Low Priority
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <Menu as="div" className="relative w-full text-left">
                <div>
                  <Menu.Button className="flex w-full justify-center rounded-xl bg-white px-4 py-2 font-medium text-black hover:text-neutral-600 transition-all focus:outline-none focus-visible:ring-2">
                    Pin to Group
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-[50%] top-[100%] -translate-x-1/2 -translate-y-full z-20 w-full divide-y divide-neutral-200 rounded-md bg-white shadow-lg focus:outline-none">
                    {groups.length !== 0 ? (
                      <div className="py-1">
                        {groups.map((group) => (
                          <Menu.Item key={group.id}>
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? 'bg-neutral-100 text-black'
                                    : 'text-black'
                                } group flex w-full items-center px-2 py-2 text-sm`}
                                onClick={() =>
                                  setGroup(registration.id, group.id)
                                }
                              >
                                {group.name}
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    ) : (
                      <div className="py-1">
                        <p className="text-black group flex w-full items-center px-2 py-2 text-sm">
                          You have to create a group first.
                        </p>
                      </div>
                    )}
                    {registration.groupId && (
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? 'bg-neutral-100 text-black'
                                  : 'text-black'
                              } group flex w-full items-center px-2 py-2 text-sm`}
                              onClick={() => setGroup(registration.id, 'none')}
                            >
                              Remove from group
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    )}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <div className="w-full max-w-7xl m-auto px-2 md:px-8">
      <div className="bg-red-200 my-2 md:my-8 rounded-[2.25rem] md:rounded-[3rem] overflow-hidden">
        <div className="max-w-4xl px-8 py-12 md:p-12">
          <h1 className="text-red-600 mb-6 text-4xl font-medium leading-2 md:text-6xl md:leading-none tracking-tight">
            Error
          </h1>

          <p className="mb-6 font-normal text-base leading-normal md:text-xl md:leading-normal text-neutral-600">
            Oops! We had a problem. You can try refreshing the page or contact
            us at{' '}
            <a
              href="mailto:party.animals@esn-tumi.de"
              className="underline text-blue-600 transition-all hover:text-blue-700"
            >
              party.animals@esn-tumi.de
            </a>
            . Please send the following error message along with your request:
          </p>

          <pre className="select-all blackspace-pre-wrap text-sm text-black">
            {error.message}
          </pre>
        </div>
      </div>
    </div>
  );
}
