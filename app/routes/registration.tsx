import styles from '~/styles/registration.css';
import { Link, Outlet } from '@remix-run/react';
import { itemURL } from '~/utils';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export default function Registration() {
  return (
    <main className="max-w-7xl m-auto px-2 md:px-8">
      <section className="bg-neutral-200 my-2 md:my-8 rounded-[2.25rem] md:rounded-[3rem] overflow-hidden">
        <div className="max-w-4xl px-8 py-12 md:p-12">
          <p className="mb-1 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
            Sign up
          </p>
          <h1 className="mb-6 text-4xl font-medium leading-2 md:text-6xl md:leading-none tracking-tight text-black">
            Only a few more steps
          </h1>
          <p className="mb-6 font-normal text-base leading-normal md:text-xl md:leading-normal text-neutral-600">
            Are you interested in joining one of our flagship orientation
            programmes? Then please read the following information carefully and
            follow the instructions to sign up. We cannot wait to have you on
            board.
          </p>
          <p className="text-black">
            If you encounter technical trouble while signing up, please
            contact&nbsp;
            <a
              className="text-blue-600 underline hover:text-blue-700"
              href="mailto:questions@esn-tumi.de?subject=[Party Animals] Technical Issue"
            >
              questions@esn-tumi.de
            </a>
            .
          </p>
        </div>
      </section>
      <section className="my-2 md:my-8 w-full grid grid-flow-row grid-cols-1 gap-x-2 gap-y-2 md:gap-y-8 sm:grid-cols-2">
        <div className="bg-orange-200 rounded-md md:rounded-lg overflow-hidden">
          <div className="max-w-4xl p-8 md:p-12">
            <p className="font-medium leading-tight tracking-tight text-xl md:text-3xl md:leading-tight text-black">
              Which programme is right for me?
            </p>
            <p className="mt-4 text-base md:text-xl font-normal leading-normal md:leading-normal text-orange-900">
              Party Animals is designed as the ultimate exchange experience. As
              the name suggests, it is suited for students who enjoy partying
              and do not mind a couple of drinks along the way. Culture
              Creatures is more relaxed and focuses on cultural enjoyment.
            </p>
          </div>
        </div>
        <div className="bg-green-200 rounded-md md:rounded-lg overflow-hidden">
          <div className="max-w-4xl p-8 md:p-12">
            <p className="font-medium leading-tight tracking-tight text-xl md:text-3xl md:leading-tight text-black">
              How much is it?
            </p>
            <p className="mt-4 text-base md:text-xl font-normal leading-normal md:leading-normal text-green-900">
              The Party Animals package is €119 (only €7.50 per day). This
              covers 14 days of activities. Culture Creatures is €89 (only
              €12.50 per day) for seven days of activites. Neither of the
              programmes include local transportation within Munich or any
              additional food and drinks you might want to consume during the
              events.
            </p>
          </div>
        </div>
        <div className="bg-sky-200 rounded-md md:rounded-lg overflow-hidden">
          <div className="max-w-4xl p-8 md:p-12">
            <p className="font-medium leading-tight tracking-tight text-xl md:text-3xl md:leading-tight text-black">
              Can I be in a group with my friends?
            </p>
            <p className="mt-4 text-base md:text-xl font-normal leading-normal md:leading-normal text-sky-900">
              No, you cannot decide which of the groups you will be placed in.
              Party Animals and Culture Creatures are all about meeting new
              people. Team spirit is a core aspect of both programmes.
            </p>
          </div>
        </div>
        <div className="bg-pink-200 rounded-md md:rounded-lg overflow-hidden">
          <div className="max-w-4xl p-8 md:p-12">
            <p className="font-medium leading-tight tracking-tight text-xl md:text-3xl md:leading-tight text-black">
              What if I cannot attend every event?
            </p>
            <p className="mt-4 text-base md:text-xl font-normal leading-normal md:leading-normal text-pink-900">
              Please make sure you are able to attend as many events as
              possible. Party Animals and Culture Creatures are designed as
              complete packages. You should only ever miss an event if it is due
              to a crucial appoinment (e.g. apartment registration).
            </p>
          </div>
        </div>
        <div className="bg-yellow-200 rounded-md md:rounded-lg overflow-hidden">
          <div className="max-w-4xl p-8 md:p-12">
            <p className="font-medium leading-tight tracking-tight text-xl md:text-3xl md:leading-tight text-black">
              How does the application work?
            </p>
            <p className="mt-4 text-base md:text-xl font-normal leading-normal md:leading-normal text-yellow-900">
              In order to ensure the best experience for participants, we
              unfortunately cannot guarantee a spot to everyone who signs up.
              The sooner you sign up, the better your chances of being selected.
              We try to facilitate diverse groups to bring students with
              different backgrounds together.
            </p>
          </div>
        </div>
        <div className="bg-indigo-200 rounded-md md:rounded-lg overflow-hidden">
          <div className="max-w-4xl p-8 md:p-12">
            <p className="font-medium leading-tight tracking-tight text-xl md:text-3xl md:leading-tight text-black">
              Are there any other options?
            </p>
            <p className="mt-4 text-base md:text-xl font-normal leading-normal md:leading-normal text-indigo-900">
              If you are unable to join one of our multi-day programmes, you can
              still sign up for our individual events during the orientation
              weeks. You can explore our general event schedule on{' '}
              <a
                className="underline hover:text-blue-700"
                href="https://tumi.esn.world"
                target="_blank"
              >
                tumi.esn.world
              </a>
              . You can choose events which fit your schedule and interests
              without joining a dedicated orientation programme.
            </p>
          </div>
        </div>
      </section>
      <Outlet />
      <section className="my-2 md:my-8 w-full grid grid-flow-row grid-cols-1 gap-x-2 gap-y-2 md:gap-y-8 sm:grid-cols-2">
        <div className="bg-green-200 rounded-md md:rounded-lg overflow-hidden">
          <div className="max-w-4xl p-8 md:p-12">
            <p className="font-medium leading-tight tracking-tight text-xl md:text-3xl md:leading-tight text-black">
              How can I stay in the loop?
            </p>
            <p className="mt-4 text-base md:text-xl font-normal leading-normal md:leading-normal text-green-900">
              Follow us on{' '}
              <a
                className="underline hover:text-blue-700"
                href="https://www.instagram.com/tumi.esn/"
                target="_blank"
              >
                Instagram
              </a>{' '}
              to stay up-to date on all things TUMi, Party Animals, and Culture
              Creatures. Do not hesitate to send us a direct message if you have
              any questions.
            </p>
          </div>
        </div>
        <div className="bg-pink-200 rounded-md md:rounded-lg overflow-hidden">
          <div className="max-w-4xl p-8 md:p-12">
            <p className="font-medium leading-tight tracking-tight text-xl md:text-3xl md:leading-tight text-black">
              What's next?
            </p>
            <p className="mt-4 text-base md:text-xl font-normal leading-normal md:leading-normal text-pink-900">
              <ul className="list-none">
                <li>
                  Applications close:{' '}
                  <strong className="font-medium">March 20, 6&nbsp;PM</strong>
                </li>
                <li>
                  First round of admissions:{' '}
                  <strong className="font-medium">March 23, 6&nbsp;PM</strong>
                </li>
                <li>
                  Second round of admissions:{' '}
                  <strong className="font-medium">March 25, 6&nbsp;PM</strong>
                </li>
              </ul>
              Check your e-mail to confirm your registration.
            </p>
          </div>
        </div>
      </section>
      <section className="mt-12 mb-8 md:mt-24 md:mb-12 flex items-center justify-center">
        <div className="flex flex-col space-y-3 w-full px-8 md:flex-row md:justify-center md:space-x-4 md:space-y-0">
          <Link
            className="shrink-0 h-fit overflow-hidden inline-block leading-none rounded-xl text-black border border-neutral-300 hover:bg-neutral-300 transition-all px-4 py-2 focus:outline-none focus:ring"
            to="/"
          >
            <span className="block font-medium text-lg text-center">
              Back to overview
            </span>
          </Link>
        </div>
      </section>
      <section className="mb-16 md:mb-28 flex items-center justify-center">
        <div className="flex w-full px-8 flex-row justify-center space-x-4">
          <a
            className="shrink-0 font-medium text-center text-sm inline-block text-neutral-600 hover:text-black transition-all"
            href="https://tumi.esn.world/page/imprint"
            target="_blank"
          >
            <span>Imprint</span>
          </a>
          <a
            className="shrink-0 font-medium text-center text-sm md:text-sm inline-block text-neutral-600 hover:text-black transition-all"
            href="https://tumi.esn.world/page/privacy"
            target="_blank"
          >
            <span>Privacy Policy</span>
          </a>
        </div>
      </section>
    </main>
  );
}
