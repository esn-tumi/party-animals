import { itemURL } from '~/utils';
import { Form } from '@remix-run/react';
import { LoaderFunction, redirect } from '@remix-run/node';
import { authenticator } from '~/services/auth.server';
import { db } from '~/utils/db.server';

export let loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  if (user) {
    const registration = await db.registration.findFirst({
      where: {
        id: user.id,
      },
    });
    if (registration) {
      redirect('/registration/status');
    }
    return redirect('/registration/form');
  }
  return null;
};

export default function RegistrationLogin() {
  return (
    <section className="bg-black my-2 md:my-8 rounded-[2.25rem] md:rounded-[3rem] overflow-hidden">
      <div className="max-w-4xl px-8 py-12 md:p-12">
        <p className="mb-1 text-sm md:text-base font-black tracking-wide text-opacity-60 text-white">
          WELCOME TO TUMi
        </p>
        <h2 className="mb-8 text-2xl font-medium leading-2 md:text-4xl md:leading-none tracking-tight text-white">
          Log in or create an account to continue
        </h2>
        <Form action="/auth/auth0" method="post">
          <button className="shrink-0 h-fit overflow-hidden inline-block leading-none rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all px-4 py-2 focus:outline-none focus:ring">
            <span className="block font-medium text-lg text-center">
              Log in
            </span>
          </button>
        </Form>
      </div>
    </section>
  );
}
