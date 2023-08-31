import { Link } from '@remix-run/react';

export default function Cancelled() {
  return (
    <div className="w-full max-w-7xl m-auto px-2 md:px-8">
      <div className="bg-neutral-200 my-2 md:my-8 rounded-[3rem] md:rounded-[3rem] overflow-hidden">
        <div className="max-w-4xl px-8 py-12 md:p-12">
          <h1 className="mb-6 text-4xl font-medium leading-2 md:text-6xl md:leading-none tracking-tight text-black">
            Payment cancelled!
          </h1>
          <p className="mb-6 font-normal text-base leading-normal md:text-xl md:leading-normal text-neutral-600">
            You will not be charged. You can try restarting the process or
            contact us at{' '}
            <a
              className="underline text-blue-600 transition-all hover:text-blue-700"
              href="mailto:party.animals@esn-tumi.de"
            >
              party.animals@esn-tumi.de
            </a>
          </p>

          <div className="flex flex-col space-y-3 w-full md:flex-row md:space-x-4 md:space-y-0">
            <Link
              className="shrink-0 h-fit bg-white overflow-hidden inline-block leading-none rounded-xl text-black border border-neutral-300 hover:bg-neutral-300 transition-all px-4 py-2 focus:outline-none focus:ring"
              to="/"
            >
              <span className="block font-medium text-lg text-center">
                Back to overview
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
