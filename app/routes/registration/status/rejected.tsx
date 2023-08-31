import { LoaderFunction, redirect } from '@remix-run/node';
import { authenticator } from '~/services/auth.server';
import { db } from '~/utils/db.server';
import { useLoaderData } from '@remix-run/react';
import { Registration, Status, User } from '~/generated/prisma';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) return redirect('/registration');
  const registration = await db.registration.findFirst({
    where: {
      user: {
        id: user.id,
      },
    },
  });
  if (!registration) return redirect('/registration/form');
  if (registration.registrationStatus !== Status.REJECTED)
    return redirect('/registration/status');
  return registration;
};

export default function RegistrationStatusRejected() {
  const registration = useLoaderData<Registration & { user: User }>();
  return (
    <section className="bg-neutral-200 my-2 md:my-8 rounded-[3rem] md:rounded-[3rem] overflow-hidden">
      <div className="max-w-4xl px-8 py-12 md:p-12">
        <p className="mb-1 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
          Better luck next time
        </p>
        <h2 className="mb-6 text-4xl font-medium leading-2 md:text-6xl md:leading-none tracking-tight text-black">
          We are sorry, {registration.callBy}.
        </h2>
        <p className="mb-6 font-normal text-base leading-normal md:text-xl md:leading-normal text-neutral-600">
          Unfortunately, we cannot offer you a spot this semester. This is not
          the end though, make sure to check out our other events during the{' '}
          <a
            className="underline hover:text-blue-700"
            href="https://tumi.esn.world"
            target="_blank"
          >
            orientation weeks
          </a>
          .
        </p>
        <p className="text-black">
          If you have any questions, please reach out to{' '}
          <a
            className="text-blue-600 underline hover:text-blue-700"
            href="mailto:questions@esn-tumi.de?subject=[Party Animals] Rejection"
          >
            questions@esn-tumi.de
          </a>
          .
        </p>
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
