import styles from '~/styles/registration.css';
import { Link, Outlet } from '@remix-run/react';
import { itemURL } from '~/utils';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export default function Registration() {
  return (
    <main className="max-w-7xl m-auto px-2 md:px-8">
      <section className="bg-stone-200 my-2 md:my-8 rounded-[2.25rem] md:rounded-[3rem] overflow-hidden">
        <div className="max-w-4xl px-8 py-12 md:p-12">
          <p className="mb-1 text-sm md:text-base font-black tracking-wide uppercase text-stone-600">
            Sign up
          </p>
          <h1 className="mb-6 text-4xl font-medium leading-2 md:text-6xl md:leading-none tracking-tight text-black">
            Only a few more steps
          </h1>
          <p className="mb-6 font-normal text-lg leading-normal md:text-xl md:leading-normal text-stone-600">
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
        <div className="bg-yellow-200 rounded-md md:rounded-lg overflow-hidden">
          <div className="max-w-4xl p-8 md:p-12">
            <p className="font-medium leading-tight tracking-tight text-xl md:text-3xl md:leading-tight text-black">
              Can I be in a group with my friends?
            </p>
            <p className="mt-4 text-lg md:text-xl font-normal leading-normal md:leading-normal text-yellow-900">
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
            <p className="mt-4 text-lg md:text-xl font-normal leading-normal md:leading-normal text-pink-900">
              Please make sure you are able to attend as many events as
              possible. Party Animals and Culture Creatures are designed as
              complete packages. You should only ever miss an event if it is due
              to a crucial appoinment (e.g. apartment registration).
            </p>
          </div>
        </div>
        <div className="bg-cyan-200 rounded-md md:rounded-lg overflow-hidden">
          <div className="max-w-4xl p-8 md:p-12">
            <p className="font-medium leading-tight tracking-tight text-xl md:text-3xl md:leading-tight text-black">
              How does the application work?
            </p>
            <p className="mt-4 text-lg md:text-xl font-normal leading-normal md:leading-normal text-cyan-900">
              In order to ensure the best experience for participants, we
              unfortunately cannot guarantee a spot to everyone who signs up.
              The sooner you sign up, the better your chances of being selected.
              We try to facilitate diverse groups to bring students with
              different backgrounds together.
            </p>
          </div>
        </div>
        <div className="bg-green-200 rounded-md md:rounded-lg overflow-hidden">
          <div className="max-w-4xl p-8 md:p-12">
            <p className="font-medium leading-tight tracking-tight text-xl md:text-3xl md:leading-tight text-black">
              Are there any other options?
            </p>
            <p className="mt-4 text-lg md:text-xl font-normal leading-normal md:leading-normal text-green-900">
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
      {/* <section className="intro">
          <div className="rounded-lg border border-white bg-gray-300 bg-opacity-10 p-4">
            <strong>Where can I find out more?</strong>
            <p>
              To find out more about the program go to the overview or reach us
              on instagram, facebook and via mail. You can also join our
              telegram group for this semester.
            </p>
            <div className="mt-2 flex space-x-2">
              <a href="https://www.instagram.com/tumi.esn/" target="_blank">
                <img
                  src={itemURL('instagram-new:fluency')}
                  className="w-8"
                  alt=""
                />
              </a>
              <a
                href="https://www.facebook.com/esntumi.munchen"
                target="_blank"
              >
                <img
                  src={itemURL('facebook-new:fluency')}
                  className="w-8"
                  alt=""
                />
              </a>
              <a href="https://t.me/+GDxAsMO1m7VlZTBk" target="_blank">
                <img
                  src={itemURL('telegram-app:fluency')}
                  className="w-8"
                  alt=""
                />
              </a>
              <a
                href="mailto:questions@esn-tumi.de?subject=[Party Animals] "
                target="_blank"
              >
                <img
                  src={itemURL('email-sign:fluency')}
                  className="w-8"
                  alt=""
                />
              </a>
            </div>
          </div>
          <div className="rounded-lg border border-white bg-gray-300 bg-opacity-10 p-4">
            <strong>What's next?</strong>
            <p>
              Keep the following dates in mind:
              <ul className="list-inside list-disc">
                <li>
                  <strong>20.09. 18:00</strong>: Applications close
                </li>
                <li>
                  <strong>23.09. 18:00</strong>: First round of admissions
                </li>
                <li>
                  <strong>25.09. 18:00</strong>: Second round of admissions
                </li>
              </ul>
              Check your mails to confirm your registration.
            </p>
          </div>
        </div>
        <Link
          to="/"
          className="inline-block rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
        >
          <span className="block rounded-full bg-slate-800 px-8 py-3 text-sm font-medium hover:bg-transparent">
            Go to overview
          </span>
        </Link>
      </section> */}
      <Outlet />
      <section className="my-2 md:my-8 w-full grid grid-flow-row grid-cols-1 gap-x-2 gap-y-2 md:gap-y-8 sm:grid-cols-2">
        <div className="bg-purple-200 rounded-md md:rounded-lg overflow-hidden">
          <div className="max-w-4xl p-8 md:p-12">
            <p className="font-medium leading-tight tracking-tight text-xl md:text-3xl md:leading-tight text-black">
              How can I stay in the loop?
            </p>
            <p className="mt-4 text-lg md:text-xl font-normal leading-normal md:leading-normal text-purple-900">
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
        <div className="bg-red-200 rounded-md md:rounded-lg overflow-hidden">
          <div className="max-w-4xl p-8 md:p-12">
            <p className="font-medium leading-tight tracking-tight text-xl md:text-3xl md:leading-tight text-black">
              What’s next?
            </p>
            <p className="mt-4 text-lg md:text-xl font-normal leading-normal md:leading-normal text-red-900">
              <ul className="list-none">
                <li>
                  <strong className="font-medium">March 20, 18:00</strong>{' '}
                  Applications close
                </li>
                <li>
                  <strong className="font-medium">March 23, 18:00</strong> First
                  round of admissions
                </li>
                <li>
                  <strong className="font-medium">March 25, 18:00</strong>{' '}
                  Second round of admissions
                </li>
              </ul>
              Check your e-mail to confirm your registration.
            </p>
          </div>
        </div>
      </section>
      <section className="mt-12 mb-16 md:mt-24 md:mb-28 flex items-center justify-center">
        <div className="flex flex-col space-y-3 w-full px-8 md:flex-row md:justify-center md:space-x-4 md:space-y-0">
          <Link
            className="shrink-0 h-fit overflow-hidden inline-block leading-none rounded-xl text-black border border-stone-300 hover:bg-stone-300 transition-all px-4 py-2 focus:outline-none focus:ring"
            to="/"
          >
            <span className="block font-medium text-lg text-center">
              Back to overview
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
