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
  if (registration.registrationStatus !== Status.PENDING)
    return redirect('/registration/status');
  return registration;
};

export default function RegistrationStatusPending() {
  const registration = useLoaderData<Registration & { user: User }>();
  return (
    <section className="bg-neutral-200 my-2 md:my-8 rounded-[2.25rem] md:rounded-[3rem] overflow-hidden">
      <div className="max-w-4xl px-8 py-12 md:p-12">
        <p className="mb-1 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
          Registration complete
        </p>
        <h2 className="mb-6 text-4xl font-medium leading-2 md:text-6xl md:leading-none tracking-tight text-black">
          Thank you, {registration.callBy}!
        </h2>
        <p className="mb-6 font-normal text-base leading-normal md:text-xl md:leading-normal text-neutral-600">
          You have signed up successfully. We will inform you during the
          admission rounds whether there is a spot for you. The admission rounds
          are on <span className="text-black">Thursday, March 23</span> and{' '}
          <span className="text-black">Saturday, March 25</span>. Do not forget
          to check your e-mail or this page to see if you got a spot. Otherwise
          you might miss your payment window.
        </p>
        <p className="text-black">
          Please note that we only send out e-mails during the admission rounds
          and not immediately after this initial registration. If you see this
          message, your registration was successful. In case anything changes
          for you please reach out to us via{' '}
          <a
            className="text-blue-600 underline hover:text-blue-700"
            href="mailto:party-animals@esn-tumi.de?subject=[Party Animals] Registration Question"
          >
            party-animals@esn-tumi.de
          </a>{' '}
          and inform us about your current situation.
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
            <a href="mailto:party-animals@esn-tumi.de">
              party-animals@esn-tumi.de
            </a>{' '}
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
