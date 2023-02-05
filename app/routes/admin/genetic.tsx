import { LoaderFunction, redirect } from '@remix-run/node';
import { Group, Registration, Role, Status, User } from '~/generated/prisma';
import { authenticator } from '~/services/auth.server';
import { db } from '~/utils/db.server';
import { GeneticAlgorithm } from '~/services/genetics/algorithm.server';
import { Form, useLoaderData } from '@remix-run/react';
import { itemURL } from '~/utils';
import { Popover } from '@headlessui/react';

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
  const groupIds = groups.map((group) => group.id);
  const registrationIds = registrations.map((registration) => registration.id);

  const geneticAlgorithm = new GeneticAlgorithm(
    200,
    registrationIds,
    groupIds,
    registrations
  );

  geneticAlgorithm.run(5000);

  const fittest = geneticAlgorithm.getFittest();
  const genes = fittest.getGenes();
  const assignments: { [groupId: string]: Registration[] } = {};
  const nonAssigned: Registration[] = [];

  genes.forEach((registrationIds, groupId) => {
    if (groupId === 'X') {
      nonAssigned.push(
        ...registrationIds.map((id) => registrations.find((r) => r.id === id)!)
      );
    } else {
      assignments[groupId] = registrationIds.map(
        (id) => registrations.find((r) => r.id === id) as Registration
      );
    }
  });

  return { registrations, groups, assignments, nonAssigned, countries };
};
export default function AdminGeneticAssignment() {
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
  // console.log(groups);
  // console.log(assignments);
  // console.log(nonAssigned);
  const getCountry = (code: string) => {
    return countries.find((c) => c.alpha2Code === code);
  };
  const totalAssigned = groups.reduce(
    (acc, group) => acc + assignments[group.id].length,
    0
  );
  return (
    <main>
      <section className="mb-2 p-4 text-white">
        <h1 className="mb-6 text-2xl font-bold">
          Assignments - Genetic ({groups.length * 20 - totalAssigned} still
          free)
        </h1>
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {groups.map((group) => (
            <div className="border border-slate-200 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="mb-1 text-lg font-bold">
                    {group.name} ({assignments[group.id].length} assigned)
                  </h3>
                  <p className="mb-4">
                    {
                      assignments[group.id].filter((r) => r.gender === 'm')
                        .length
                    }{' '}
                    male
                  </p>
                </div>
                <div className="flex">
                  <Form method="patch">
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
                    <button>
                      <img
                        src={itemURL('check-all:fluency')}
                        className="w-10"
                      />
                    </button>
                  </Form>
                  <Form method="patch">
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
                    <button>
                      <img src={itemURL('pin:fluency')} className="w-10" />
                    </button>
                  </Form>
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                {assignments[group.id].map((registration) => (
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full"
                      referrerPolicy="no-referrer"
                      src={registration.user.photo}
                      alt={registration.user.firstName}
                    />
                    <div className="ml-2 overflow-hidden">
                      <p className="overflow-hidden text-ellipsis whitespace-nowrap text-lg">
                        {registration.groupId ? '📌' : ''}
                        {registration.registrationStatus === 'ACCEPTED'
                          ? '✅'
                          : ''}
                        {registration.paymentStatus === 'SUCCESS' ? '💶' : ''}{' '}
                        {registration.user.firstName}{' '}
                        {registration.user.lastName}
                      </p>
                      <div className="flex items-center">
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
                    <div className="grow" />
                    <Popover className="relative">
                      <Popover.Button>💭</Popover.Button>

                      <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-2 ring-white ring-opacity-5">
                          <div className="relative grid gap-8 bg-gray-800 p-7">
                            <p>{registration.expectations}</p>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Popover>
                    <Form method="patch">
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
                      <button>
                        <img src={itemURL('pin:fluency')} className="w-8" />
                      </button>
                    </Form>
                    <img
                      className="h-8 rounded-full"
                      referrerPolicy="no-referrer"
                      src={itemURL(`${mapGender(registration.gender)}:color`)}
                      alt={registration.gender}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="border border-slate-200 p-4">
          <h3 className="mb-4 text-lg font-bold">
            Not assigned ({nonAssigned.length})
          </h3>
          <div className="flex">
            <div className="flex flex-col space-y-4">
              {nonAssigned.map((registration) => (
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full"
                    referrerPolicy="no-referrer"
                    src={registration.user.photo}
                    alt={registration.user.firstName}
                  />
                  <div className="ml-2">
                    <p className="text-lg">
                      {registration.groupId ? '📌' : ''}
                      {registration.registrationStatus === 'ACCEPTED'
                        ? '✅'
                        : ''}
                      {registration.user.firstName} {registration.user.lastName}
                    </p>
                    <div className="flex items-center">
                      <img
                        src={getCountry(registration.country).flags.svg}
                        className="mr-2 h-4"
                        alt=""
                      />
                      <p>{getCountry(registration.country).name}</p>
                    </div>
                  </div>
                  <div className="grow" />
                  <img
                    className="ml-4 h-8 rounded-full"
                    referrerPolicy="no-referrer"
                    src={itemURL(`${mapGender(registration.gender)}:color`)}
                    alt={registration.user.firstName}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
