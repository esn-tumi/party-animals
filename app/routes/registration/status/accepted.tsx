import { LoaderFunction, redirect } from '@remix-run/node';
import { authenticator } from '~/services/auth.server';
import { db } from '~/utils/db.server';
import { Outlet, useLoaderData } from '@remix-run/react';
import {
  Group,
  GroupType,
  Registration,
  Status,
  User,
} from '~/generated/prisma';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) return redirect('/registration');
  const registration = await db.registration.findFirst({
    where: {
      user: {
        id: user.id,
      },
    },
    include: {
      user: true,
      group: true,
    },
  });
  if (!registration) return redirect('/registration/form');
  if (registration.registrationStatus !== Status.ACCEPTED)
    return redirect('/registration/status');
  return registration;
};

export default function () {
  const registration = useLoaderData<
    Registration & { user: User; group: Group }
  >();
  return (
    <section className="bg-neutral-200 my-2 md:my-8 rounded-[3rem] md:rounded-[3rem] overflow-hidden">
      <div className="max-w-4xl px-8 py-12 md:p-12">
        <p className="mb-1 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
          Congratulations
        </p>
        <h2 className="mb-8 text-4xl font-medium leading-2 md:text-6xl md:leading-none tracking-tight text-black">
          You have been granted a spot{' '}
          {registration.group.groupType === GroupType.PA ? (
            <span>in Party Animals</span>
          ) : (
            <span>in Culture Creatures</span>
          )}
          , {registration.callBy}!
        </h2>
        <ol className="list-none">
          <li className="mb-8">
            <p className="mb-4 font-medium leading-tight tracking-tight text-xl md:text-3xl md:leading-tight text-black">
              <span className="text-neutral-600 tabular-nums">(1)</span> Pay the
              participation fee
            </p>
            <p className="font-normal text-base leading-normal md:text-xl md:leading-normal text-neutral-600">
              You have to pay the participation fee in order to take part in the
              programme. If you miss your payment window, your spot will expire
              and be given to someone on the waitlist.
            </p>
            <Outlet />
          </li>
          <li className="mb-8">
            <p className="mb-4 font-medium leading-tight tracking-tight text-xl md:text-3xl md:leading-tight text-black">
              <span className="text-neutral-600 tabular-nums">(2)</span> Get to
              know your group
            </p>
            <p className="font-normal text-base leading-normal md:text-xl md:leading-normal text-neutral-600">
              Once we have received your payment, we will invite you to your
              group chat on WhatsApp.
            </p>
          </li>
          <li>
            <p className="mb-4 font-medium leading-tight tracking-tight text-xl md:text-3xl md:leading-tight text-black">
              <span className="text-neutral-600 tabular-nums">(3)</span> Have
              fun!
            </p>
            <p className="font-normal text-base leading-normal md:text-xl md:leading-normal text-neutral-600">
              Make sure to read all of the announcements in the WhatsApp group,
              so you know exactly when and where we will get started.
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <div className="w-full max-w-7xl m-auto">
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
