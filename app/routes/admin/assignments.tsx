import { ActionFunction, LoaderFunction, redirect } from '@remix-run/node';
import { authenticator } from '~/services/auth.server';
import {
  Group,
  Priority,
  Registration,
  Role,
  Status,
  User,
} from '~/generated/prisma';
import { db } from '~/utils/db.server';
import { Form, useLoaderData } from '@remix-run/react';
import { Popover } from '@headlessui/react';

const prioToNum = (prio: Priority) => {
  switch (prio) {
    case Priority.LOW:
      return 1;
    case Priority.MEDIUM:
      return 2;
    case Priority.HIGH:
      return 3;
    default:
      return 2;
  }
};

const statusToNum = (status: string) => {
  switch (status) {
    case 'l':
      return 1;
    case 'i':
      return 2;
    case 'o':
      return 3;
    case 'e':
      return 3;
    default:
      return 0;
  }
};

const genderInGroup = (group: Registration[], gender: string) => {
  return group.filter((reg) => reg.gender === gender).length;
};

const countryInGroup = (group: Registration[], country: string) =>
  group.some((reg) => reg.country === country);

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    return redirect('/auth/login');
  }
  if (user.role !== Role.ADMIN) {
    throw new Error('You are not authorized to view this page');
  }
  const countries = await fetch(
    'https://restcountries.com/v2/all?fields=name,alpha2Code,flags'
  ).then((res) => res.json());
  const registrationsQuery = db.registration.findMany({
    where: {
      OR: [
        { registrationStatus: Status.PENDING },
        { registrationStatus: Status.ACCEPTED },
      ],
    },
    include: { user: true },
    orderBy: { createdAt: 'asc' },
  });
  const groupsQuery = db.group.findMany({
    orderBy: { name: 'asc' },
    include: { registrations: { include: { user: true } } },
  });
  const [groups, registrations] = await Promise.all([
    groupsQuery,
    registrationsQuery,
  ]);
  registrations.sort((a, b) => {
    if (
      a.registrationStatus === 'ACCEPTED' &&
      b.registrationStatus !== 'ACCEPTED'
    ) {
      return -1;
    }
    if (
      a.registrationStatus !== 'ACCEPTED' &&
      b.registrationStatus === 'ACCEPTED'
    ) {
      return 1;
    }
    if (prioToNum(a.priority) > prioToNum(b.priority)) {
      return -1;
    }
    if (prioToNum(a.priority) < prioToNum(b.priority)) {
      return 1;
    }
    if (statusToNum(a.status) > statusToNum(b.status)) {
      return -1;
    }
    if (statusToNum(a.status) < statusToNum(b.status)) {
      return 1;
    }
    return 0;
  });
  const assignments: { [groupId: string]: Registration[] } = {};
  const nonAssigned: Registration[] = [];
  groups.forEach((group) => {
    assignments[group.id] = [];
    assignments[group.id] = group.registrations;
  });
  registrations
    .filter((registration) => !registration.groupId)
    .forEach((registration) => {
      let assigned = false;
      groups.sort(
        (a, b) => assignments[a.id].length - assignments[b.id].length
      );
      groups.forEach((group) => {
        if (!assigned) {
          if (!countryInGroup(assignments[group.id], registration.country)) {
            if (
              genderInGroup(assignments[group.id], registration.gender) < 10
            ) {
              if (assignments[group.id].length < 20) {
                assignments[group.id].push(registration);
                assigned = true;
              }
            }
          }
        }
      });
      if (!assigned) {
        nonAssigned.push(registration);
      }
    });
  //sort groups by name
  groups.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return { registrations, groups, assignments, nonAssigned, countries };
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
  const action = formData.get('action');
  if (typeof action !== 'string') {
    throw new Error('No action specified');
  }
  switch (action) {
    case 'pinGroup': {
      const groupId = formData.get('groupId');
      if (typeof groupId !== 'string') {
        throw new Error('No groupId specified');
      }
      const group = await db.group.findUnique({
        where: { id: groupId },
        include: { registrations: true },
      });
      if (!group) {
        throw new Error('Group not found');
      }
      const registrationIds = formData.get('registrationIds');
      if (typeof registrationIds !== 'string') {
        throw new Error('No registrationIds specified');
      }
      const registrationIdsArray = registrationIds.split(',');
      if (registrationIdsArray.length === 0) {
        throw new Error('No registrations specified');
      }
      await db.registration.updateMany({
        where: { id: { in: registrationIdsArray } },
        data: { groupId: group.id },
      });
      break;
    }
    case 'acceptGroup': {
      const groupId = formData.get('groupId');
      if (typeof groupId !== 'string') {
        throw new Error('No groupId specified');
      }
      const group = await db.group.findUnique({
        where: { id: groupId },
        include: { registrations: true },
      });
      if (!group) {
        throw new Error('Group not found');
      }
      const registrationIds = formData.get('registrationIds');
      if (typeof registrationIds !== 'string') {
        throw new Error('No registrationIds specified');
      }
      const registrationIdsArray = registrationIds.split(',');
      if (registrationIdsArray.length === 0) {
        throw new Error('No registrations specified');
      }
      await db.registration.updateMany({
        where: { id: { in: registrationIdsArray } },
        data: { registrationStatus: Status.ACCEPTED, groupId: group.id },
      });
      break;
    }
    case 'pinUser': {
      const groupId = formData.get('groupId');
      if (typeof groupId !== 'string') {
        throw new Error('No groupId specified');
      }
      const group = await db.group.findUnique({
        where: { id: groupId },
        include: { registrations: true },
      });
      if (!group) {
        throw new Error('Group not found');
      }
      const registrationId = formData.get('registrationId');
      if (typeof registrationId !== 'string') {
        throw new Error('No registrationId specified');
      }
      await db.registration.update({
        where: { id: registrationId },
        data: { groupId: group.id },
      });
      break;
    }
  }
  return null;
};

export default function AdminAssignments() {
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
  const { groups, assignments, nonAssigned, countries } = useLoaderData<{
    registrations: (Registration & { user: User })[];
    groups: Group[];
    assignments: { [groupId: string]: (Registration & { user: User })[] };
    nonAssigned: (Registration & { user: User })[];
    countries: any[];
  }>();
  const getCountry = (code: string) => {
    return countries.find((c) => c.alpha2Code === code);
  };
  const totalAssigned = groups.reduce(
    (acc, group) => acc + assignments[group.id].length,
    0
  );
  return (
    <main className="px-2 md:px-8">
      <section className="text-black bg-neutral-200 min-w-fit rounded-[2.25rem] md:rounded-[3rem] overflow-hidden p-8 md:p-12 m-auto my-2 md:my-8">
        <h1 className="mb-4 md:mb-6 text-2xl font-medium leading-2 md:text-4xl md:leading-none tracking-tight">
          Assignments{' '}
          <span className="text-neutral-600">
            ({groups.length * 20 - totalAssigned} available)
          </span>
        </h1>
        <div className="mb-4 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {groups.map((group) => (
            <div className="bg-neutral-100 rounded-xl p-4">
              <div className="mb-4 flex flex-col">
                <div>
                  <h3 className="text-lg font-medium">
                    {group.name}{' '}
                    <span className="text-neutral-600">
                      ({assignments[group.id].length} assigned)
                    </span>
                  </h3>
                  <p className="mb-4">
                    {
                      assignments[group.id].filter((r) => r.gender === 'f')
                        .length
                    }{' '}
                    female,{' '}
                    {
                      assignments[group.id].filter((r) => r.gender === 'm')
                        .length
                    }{' '}
                    male
                  </p>
                </div>
                <div className="flex w-full gap-2">
                  <Form method="patch" className="w-full">
                    <input
                      type="hidden"
                      name="action"
                      defaultValue="acceptGroup"
                    />
                    <input
                      type="hidden"
                      name="groupId"
                      defaultValue={group.id}
                    />
                    <input
                      type="hidden"
                      name="registrationIds"
                      defaultValue={assignments[group.id]
                        .map((r) => r.id)
                        .join(',')}
                    />
                    <button className="border border-transparent w-full shrink-0 h-fit overflow-hidden inline-block rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all px-4 py-2 focus:outline-none focus:ring">
                      <span className="block font-medium text-center">
                        Accept group
                      </span>
                    </button>
                  </Form>
                  <Form method="patch" className="w-full">
                    <input
                      type="hidden"
                      name="action"
                      defaultValue="pinGroup"
                    />
                    <input
                      type="hidden"
                      name="groupId"
                      defaultValue={group.id}
                    />
                    <input
                      type="hidden"
                      name="registrationIds"
                      defaultValue={assignments[group.id]
                        .map((r) => r.id)
                        .join(',')}
                    />
                    <button className="w-full shrink-0 border border-neutral-300 h-fit overflow-hidden inline-block rounded-xl text-black bg-white hover:bg-neutral-300 transition-all px-4 py-2 focus:outline-none focus:ring">
                      <span className="block font-medium text-center">
                        Pin group
                      </span>
                    </button>
                  </Form>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                {assignments[group.id].map((registration) => (
                  <div className="flex items-strech justify-between bg-white border border-neutral-300 rounded-md">
                    {/* <img
                      className="h-10 w-10 rounded-full"
                      referrerPolicy="no-referrer"
                      src={registration.user.photo}
                      alt={registration.user.firstName}
                    /> */}
                    <div className="px-3 py-2 rounded-md overflow-hidden w-full">
                      <p
                        className={`${
                          registration.gender !== 'f' &&
                          registration.gender !== 'm' &&
                          'text-violet-600'
                        } ${registration.gender === 'f' && 'text-pink-600'} ${
                          registration.gender === 'm' && 'text-blue-600'
                        } overflow-hidden text-ellipsis font-medium whitespace-nowrap mb-1`}
                      >
                        {registration.user.firstName}{' '}
                        {registration.user.lastName}
                        {registration.groupId ? ' 📌' : ''}
                        {registration.registrationStatus === 'ACCEPTED'
                          ? ' ✅'
                          : ''}
                        {registration.paymentStatus === 'SUCCESS' ? ' 💶' : ''}{' '}
                      </p>
                      <div className="flex items-center overflow-hidden">
                        <img
                          src={getCountry(registration.country).flags.svg}
                          className="mr-2 h-4"
                          alt=""
                        />
                        <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                          {getCountry(registration.country).name}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 w-fit flex flex-col items-strech divide-y border-l border-neutral-300 divide-neutral-300">
                      <Popover className="h-full relative">
                        <Popover.Button className="h-full w-full p-2 leading-none text-neutral-600 hover:text-black hover:bg-neutral-300 transition-all">
                          Read
                        </Popover.Button>
                        <Popover.Panel className="absolute left-1/2 -translate-x-1/2 z-10 mt-2 w-screen max-w-sm p-4 bg-white overflow-hidden rounded-md shadow-lg">
                          <div className="relative">
                            <p>{registration.expectations}</p>
                          </div>
                        </Popover.Panel>
                      </Popover>
                      <Form method="patch" className="h-full">
                        <input
                          type="hidden"
                          name="action"
                          defaultValue="pinUser"
                        />
                        <input
                          type="hidden"
                          name="groupId"
                          defaultValue={group.id}
                        />
                        <input
                          type="hidden"
                          name="registrationId"
                          defaultValue={registration.id}
                        />
                        <button className="h-full w-full p-2 leading-none text-neutral-600 hover:text-black hover:bg-neutral-300 transition-all">
                          Pin
                          {/* <img src={itemURL('pin:fluency')} className="w-8" /> */}
                        </button>
                      </Form>
                      {/* <img
                        className="h-8 rounded-full"
                        referrerPolicy="no-referrer"
                        src={itemURL(`${mapGender(registration.gender)}:color`)}
                        alt={registration.gender}
                      /> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h3 className="mb-4 md:mb-6 text-2xl font-medium leading-2 md:text-4xl md:leading-none tracking-tight">
            Not assigned{' '}
            <span className="text-neutral-600">({nonAssigned.length})</span>
          </h3>
          {nonAssigned.length !== 0 && (
            <div className="bg-neutral-100 rounded-xl p-4 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {nonAssigned.map((registration) => (
                <div className="flex items-strech justify-between bg-white border border-neutral-300 rounded-md">
                  <div className="px-3 py-2 rounded-md overflow-hidden w-full">
                    <p
                      className={`${
                        registration.gender !== 'f' &&
                        registration.gender !== 'm' &&
                        'text-violet-600'
                      } ${registration.gender === 'f' && 'text-pink-600'} ${
                        registration.gender === 'm' && 'text-blue-600'
                      } overflow-hidden text-ellipsis font-medium whitespace-nowrap mb-1`}
                    >
                      {registration.user.firstName} {registration.user.lastName}
                      {registration.groupId ? ' 📌' : ''}
                      {registration.registrationStatus === 'ACCEPTED'
                        ? ' ✅'
                        : ''}
                      {registration.paymentStatus === 'SUCCESS' ? ' 💶' : ''}{' '}
                    </p>
                    <div className="flex items-center overflow-hidden">
                      <img
                        src={getCountry(registration.country).flags.svg}
                        className="mr-2 h-4"
                        alt=""
                      />
                      <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                        {getCountry(registration.country).name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <div
      className="
    mt-6
    flex
    w-full
    items-center
    justify-center
    px-8
  "
    >
      <div className="rounded-md bg-white px-10 py-5 shadow-xl md:py-20 md:px-40">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-blue-600 md:text-9xl">
            Error!
          </h1>

          <h6 className="mb-2 text-center text-lg font-bold text-gray-800 md:text-2xl md:text-3xl">
            <span className="text-red-500">Oops!</span> We had a problem.
          </h6>

          <p className="mb-8 text-center text-gray-500 md:text-lg">
            You can try refreshing the page or contact us at{' '}
            <a href="mailto:questions@esn-tumi.de">questions@esn-tumi.de</a>{' '}
            <br />
            Please send the following error message along with your request:
          </p>

          <pre className="select-all whitespace-pre-wrap text-sm text-slate-600">
            {error.message}
          </pre>
        </div>
      </div>
    </div>
  );
}
