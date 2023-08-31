import { itemURL } from '~/utils';
import { Form } from '@remix-run/react';

export default function AuthLogin() {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <section className="w-full max-w-7xl m-auto px-2 md:px-8">
        <div className="w-full bg-black my-2 md:my-8 rounded-[3rem] md:rounded-[3rem] overflow-hidden">
          <div className="max-w-4xl px-8 py-12 md:p-12">
            <p className="mb-8 text-2xl font-medium leading-2 md:text-4xl md:leading-none tracking-tight text-white">
              Please log in to continue.
            </p>
            <Form action="/auth/auth0" method="post">
              <button className="shrink-0 h-fit overflow-hidden inline-block leading-none rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all px-4 py-2 focus:outline-none focus:ring">
                <span className="block font-medium text-lg text-center">
                  Log in
                </span>
              </button>
            </Form>
          </div>
        </div>
      </section>
    </main>
  );
}
