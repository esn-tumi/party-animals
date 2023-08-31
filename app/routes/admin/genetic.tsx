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
      <section className="text-black bg-neutral-200 min-w-fit rounded-[3rem] md:rounded-[3rem] overflow-hidden p-8 md:p-12 m-auto my-2 md:my-8">
        <h1 className="mb-4 md:mb-6 text-2xl font-medium leading-2 md:text-4xl md:leading-none tracking-tight">
          Genetic Assignments{' '}
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
                  {/* <Form method="patch" className="w-full">
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
                  </Form> */}
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                {assignments[group.id].map((registration) => (
                  <div className="flex items-strech justify-between bg-white border border-neutral-300 rounded-[3rem]">
                    {/* <img
                      className="h-10 w-10 rounded-full"
                      referrerPolicy="no-referrer"
                      src={registration.user.photo}
                      alt={registration.user.firstName}
                    /> */}
                    <div className="px-3 py-2 rounded-[3rem] overflow-hidden w-full">
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
                    {/* <div className="shrink-0 w-fit flex flex-col items-strech divide-y border-l border-neutral-300 divide-neutral-300">
                      <Popover className="h-full relative">
                        <Popover.Button className="h-full w-full p-2 leading-none text-neutral-600 hover:text-black hover:bg-neutral-300 transition-all">
                          Read
                        </Popover.Button>
                        <Popover.Panel className="absolute left-1/2 -translate-x-1/2 z-10 mt-2 w-screen max-w-sm p-4 bg-white overflow-hidden rounded-[3rem] shadow-lg">
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
                        </button>
                      </Form>
                    </div> */}
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
                <div className="flex items-strech justify-between bg-white border border-neutral-300 rounded-[3rem]">
                  <div className="px-3 py-2 rounded-[3rem] overflow-hidden w-full">
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
    <div className="w-full max-w-7xl m-auto px-2 md:px-8">
      <div className="bg-red-200 my-2 md:my-8 rounded-[3rem] md:rounded-[3rem] overflow-hidden">
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
