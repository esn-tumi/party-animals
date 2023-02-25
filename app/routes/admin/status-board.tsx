import { LoaderFunction, redirect } from '@remix-run/node';
import { authenticator } from '~/services/auth.server';
import { Group, Registration, Role, User } from '~/generated/prisma';
import { db } from '~/utils/db.server';
import { itemURL } from '~/utils';
import { useLoaderData, useLocation } from '@remix-run/react';
import { useEffect, useState } from 'react';

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
    orderBy: [{ group: { name: 'asc' } }, { user: { lastName: 'asc' } }],
  });
  const groups = db.group.findMany({
    orderBy: { name: 'asc' },
  });
  return Promise.all([registrations, countries, groups]);
};

const mapRegistrationDate = (
  registration: any
): Registration & { user: User; group?: Group } => ({
  ...registration,
  createdAt: new Date(registration.createdAt),
  user: {
    ...registration.user,
    createdAt: new Date(registration.user.createdAt),
  },
  group: registration.group
    ? {
        ...registration.group,
        createdAt: new Date(registration.group.createdAt),
      }
    : undefined,
});

export default function () {
  // parse query params
  const query = new URLSearchParams(useLocation().search);
  const [registrations, countries, groups] =
    useLoaderData<
      [(Registration & { user: User; group?: Group })[], any[], Group[]]
    >();
  // selected registrationStatus
  const [registrationStatus, setRegistrationStatus] = useState<string>(
    query.get('registrationStatus') || ''
  );
  // selected group
  const [group, setGroup] = useState<string>(query.get('group') || '');
  // selected paymentStatus
  const [paymentStatus, setPaymentStatus] = useState<string>(
    query.get('paymentStatus') || ''
  );
  // filtered registrations
  const [filteredRegistrations, setFilteredRegistrations] = useState<
    (Registration & { user: User; group?: Group })[]
  >(registrations.map(mapRegistrationDate));

  // deadline date
  const [deadlineDate, setDeadlineDate] = useState<string>(
    new Date(new Date().setUTCHours(18, 0, 0)).toLocaleString('de-DE')
  );

  useEffect(() => {
    const filterObject = {
      registrationStatus,
      group,
      paymentStatus,
    };
    // set query params
    const queryParams = new URLSearchParams(filterObject);
    window.history.replaceState({}, '', `?${queryParams}`);
    setFilteredRegistrations(
      registrations.map(mapRegistrationDate).filter((registration) => {
        if (
          registrationStatus &&
          registration.registrationStatus !== registrationStatus
        ) {
          return false;
        }
        if (group && registration?.group?.id !== group) {
          return false;
        }
        return !(paymentStatus && registration.paymentStatus !== paymentStatus);
      })
    );
  }, [registrationStatus, group, paymentStatus, registrations]);

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
        return 'Local Student';
      case 'i':
        return 'International degree student';
      case 'o':
        return 'Exchange Student (arrived in 2022)';
      case 'e':
        return 'Exchange Student (arrived in 2023)';
    }
  };
  const getCountry = (code: string) => {
    return countries.find((c) => c.alpha2Code === code);
  };
  const generateWaLink = (
    registration: Registration & { user: User; group?: Group }
  ) => {
    const number = registration.phone.replace(/[ +]/g, '');
    const message = encodeURIComponent(`Hi, ${registration.callBy}!
It seems like we didn't get your payment for your TUMi orientation program spot yet. Please pay your registration fee at the following link:
https://party-animals.esn.world/registration/status 
This is also where you can see your registration status, if the payment is confirmed here you are good to go.
The *payment deadline is ${deadlineDate} CET* if you do not pay or contact us we will cancel your spot.
Should you not be able to take part in the program anymore, please contact us at party-animals@esn-tumi.de and we will cancel your spot.
Best, 
Your TUMi team`);
    return `https://wa.me/${number}?text=${message}`;
  };
  return (
    <main className="px-2 md:px-8">
      <section className="text-black bg-neutral-200 min-w-fit rounded-[2.25rem] md:rounded-[3rem] overflow-hidden p-8 md:p-12 m-auto my-2 md:my-8">
        <h1 className="mb-4 md:mb-6 text-2xl font-medium leading-2 md:text-4xl md:leading-none tracking-tight">
          Registration Status Board
        </h1>
        <div className="w-full grid grid-cols-1 gap-2 md:gap-4 md:grid-cols-2 lg:grid-cols-4">
          <label className="relative block h-fit" htmlFor="status">
            <select
              id="status"
              onChange={(event) => setRegistrationStatus(event.target.value)}
              className="peer w-full font-medium text-black rounded-lg border-2 border-neutral-300 overflow-hidden bg-neutral-100 px-3 pt-6 pb-2 text-base placeholder-transparent focus:ring-1 focus:ring-blue-600"
              defaultValue={registrationStatus}
            >
              <option value="">All</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="PENDING">Pending</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="REJECTED">Rejected</option>
            </select>
            <span className="border-l-2 border-transparent absolute left-3 top-2 text-xs font-medium text-neutral-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs">
              Status
            </span>
          </label>
          <label className="relative block h-fit" htmlFor="group">
            <select
              id="group"
              onChange={(event) => setGroup(event.target.value)}
              className="peer w-full font-medium text-black rounded-lg border-2 border-neutral-300 overflow-hidden bg-neutral-100 px-3 pt-6 pb-2 text-base placeholder-transparent focus:ring-1 focus:ring-blue-600"
              defaultValue={group}
            >
              <option value="">All</option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
            <span className="border-l-2 border-transparent absolute left-3 top-2 text-xs font-medium text-neutral-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs">
              Group
            </span>
          </label>
          <label className="relative block h-fit" htmlFor="paymentStatus">
            <select
              id="paymentStatus"
              onChange={(event) => setPaymentStatus(event.target.value)}
              className="peer w-full font-medium text-black rounded-lg border-2 border-neutral-300 overflow-hidden bg-neutral-100 px-3 pt-6 pb-2 text-base placeholder-transparent focus:ring-1 focus:ring-blue-600"
              defaultValue={paymentStatus}
            >
              <option value="">All</option>
              <option value="PENDING">Pending</option>
              <option value="SUCCESS">Paid</option>
            </select>
            <span className="border-l-2 border-transparent absolute left-3 top-2 text-xs font-medium text-neutral-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs">
              Payment Status
            </span>
          </label>
          <label htmlFor="deadLineDate" className="relative block h-fit">
            <input
              type="tex"
              onChange={(event) => setDeadlineDate(event.target.value)}
              className="peer w-full font-medium text-black rounded-lg border-2 border-neutral-300 overflow-hidden bg-neutral-100 px-3 pt-6 pb-2 text-base placeholder-transparent focus:ring-1 focus:ring-blue-600"
              defaultValue={deadlineDate}
            />
            <span className="border-l-2 border-transparent absolute left-3 top-2 text-xs font-medium text-neutral-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs">
              Deadline
            </span>
          </label>
        </div>
      </section>
      <section className="w-full text-black bg-neutral-200 rounded-[2.25rem] md:rounded-[3rem] overflow-hidden p-8 md:p-12 m-auto my-2 md:my-8">
        <h2 className="mb-4 md:mb-6 text-2xl font-medium leading-2 md:text-4xl md:leading-none tracking-tight">
          Selected Registrations{' '}
          <span className="text-neutral-600">
            ({filteredRegistrations.length})
          </span>
        </h2>
        <div className="w-full bg-neutral-100 rounded-xl overflow-x-scroll border border-neutral-300">
          <table className="w-min-fit w-full border-collapse whitespace-nowrap">
            <thead>
              <tr>
                <th className="font-medium text-left px-4 py-3">First Name</th>
                <th className="font-medium text-left px-4 py-3">Last Name</th>
                <th className="font-medium text-left px-4 py-3">Email</th>
                <th className="font-medium text-left px-4 py-3">Phone</th>
                <th className="font-medium text-left px-4 py-3">Group</th>
                <th className="font-medium text-left px-4 py-3">
                  Registration Status
                </th>
                <th className="font-medium text-left px-4 py-3">
                  Payment status
                </th>
                <th className="font-medium text-left px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {filteredRegistrations.map((registration) => (
                <tr key={registration.id} className="">
                  <td className="border-t border-neutral-300 text-left px-4 py-3">
                    {registration.user.firstName}
                  </td>
                  <td className="border-t border-neutral-300 text-left px-4 py-3">
                    {registration.user.lastName}
                  </td>
                  <td className="border-t border-neutral-300 text-left px-4 py-3">
                    {registration.user.email}
                  </td>
                  <td className="border-t border-neutral-300 text-left px-4 py-3">
                    {registration.phone}
                  </td>
                  <td className="border-t border-neutral-300 text-left px-4 py-3">
                    {registration.group?.name}
                  </td>
                  <td className="border-t border-neutral-300 text-left px-4 py-3">
                    {registration.registrationStatus}
                  </td>
                  <td className="border-t border-neutral-300 text-left px-4 py-3">
                    {registration.paymentStatus}
                  </td>
                  <td className="border-t border-neutral-300 text-left px-4 py-3">
                    <a
                      className="underline text-blue-600 hover:text-blue-700"
                      href={generateWaLink(registration)}
                      target="_blank"
                    >
                      Send payment reminder
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="text-black bg-neutral-200 rounded-[2.25rem] md:rounded-[3rem] overflow-hidden p-8 md:p-12 m-auto my-2 md:my-8">
        <h2 className="mb-4 md:mb-6 text-2xl font-medium leading-2 md:text-4xl md:leading-none tracking-tight">
          Selected Mails{' '}
          <span className="text-neutral-600">
            ({filteredRegistrations.length})
          </span>
        </h2>
        <pre className="select-all whitespace-pre-wrap break-words">
          {filteredRegistrations.map((r) => r.user.email).join(';')}
        </pre>
      </section>
      <section className="text-black bg-neutral-200 rounded-[2.25rem] md:rounded-[3rem] overflow-hidden p-8 md:p-12 m-auto my-2 md:my-8">
        <h2 className="mb-4 md:mb-6 text-2xl font-medium leading-2 md:text-4xl md:leading-none tracking-tight">
          Selected IDs{' '}
          <span className="text-neutral-600">
            ({filteredRegistrations.length})
          </span>
        </h2>
        <pre className="select-all whitespace-pre-wrap break-words">
          {filteredRegistrations.map((r) => `'${r.user.authId}'`).join(',')}
        </pre>
      </section>
    </main>
  );
}
