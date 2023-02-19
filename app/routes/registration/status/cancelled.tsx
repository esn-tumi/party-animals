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
  if (registration.registrationStatus !== Status.CANCELLED)
    return redirect('/registration/status');
  return registration;
};

export default function RegistrationStatusCancelled() {
  const registration = useLoaderData<Registration & { user: User }>();
  return (
    <section className="bg-neutral-200 my-2 md:my-8 rounded-[2.25rem] md:rounded-[3rem] overflow-hidden">
      <div className="max-w-4xl px-8 py-12 md:p-12">
        <p className="mb-1 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
          Registration cancelled
        </p>
        <h2 className="mb-6 text-4xl font-medium leading-2 md:text-6xl md:leading-none tracking-tight text-black">
          Sad to see you go, {registration.callBy}.
        </h2>
        <p className="mb-6 font-normal text-base leading-normal md:text-xl md:leading-normal text-neutral-600">
          We cancelled your registration as per your request. Make sure to check
          out our other events during the{' '}
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
          If you believe this to be an error, please reach out to{' '}
          <a
            className="text-blue-600 underline hover:text-blue-700"
            href="mailto:questions@esn-tumi.de?subject=[Party Animals] Registration Issue"
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
          <h1 className="text-4xl font-medium text-red-600 md:text-9xl">
            Error!
          </h1>

          <h6 className="mb-2 text-center text-lg font-medium text-black md:text-2xl md:text-3xl">
            <span className="text-red-560">Oops!</span> We had a problem.
          </h6>

          <p className="mb-8 text-center text-neutral-600 md:text-lg">
            You can try refreshing the page or contact us at{' '}
            <a href="mailto:questions@esn-tumi.de">questions@esn-tumi.de</a>{' '}
            <br />
            Please send the following error message along with your request:
          </p>

          <pre className="select-all whitespace-pre-wrap text-sm text-neutral-600">
            {error.message}
          </pre>
        </div>
      </div>
    </div>
  );
}
