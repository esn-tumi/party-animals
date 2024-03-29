import styles from '~/styles/landing.css';
import { Link } from '@remix-run/react';
import { itemURL } from '~/utils';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export default function CultureCreatures() {
  return (
    <main className="max-w-7xl m-auto px-2 md:px-8">
      <section className="my-2 md:my-8 rounded-[2.25rem] md:rounded-[3rem] overflow-hidden">
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-green-600">
            <img
              className="block h-full w-full object-cover"
              src="/images/culture-creatures.jpg"
            />
          </div>
          <div className="relative z-10 px-8 pt-12 md:px-12">
            <img
              className="block w-48 md:w-64 h-auto"
              src="/images/logo-stack.png"
            />
          </div>
          <div className="relative bg-gradient-to-t from-[rgba(13,38,0,0.8)] bg-blend-multiply">
            <div className="max-w-4xl px-8 pb-12 pt-16 md:px-12 md:pb-12 md:pt-32">
              <p className="mb-1 text-sm md:text-base font-black tracking-wide uppercase text-opacity-60 text-white">
                April 10 &ndash; April 16, 2023
              </p>
              <h1 className="mb-6 text-4xl font-medium leading-2 md:text-6xl md:leading-none tracking-tight text-white ">
                Welcome to <br />
                Culture Creatures
              </h1>
              <p className="mb-8 font-normal text-base leading-normal md:text-xl md:leading-normal text-white text-opacity-80">
                Believe it or not, Bavaria has more to offer than beer. So, let
                the Party Animals roam free and turn into a Culture Creature.
                Instead of copious amounts of adult beverages, you'll engage in
                copious amounts of cultural events and activities. The programme
                is also a great way to get to know Munich and make friends. It
                takes place from April 10 to April 16, 2023.
              </p>
              <div className="flex flex-col md:flex-row">
                <Link
                  className="shrink-0 h-fit overflow-hidden inline-block leading-none rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all px-4 py-2 focus:outline-none focus:ring"
                  to="/registration"
                >
                  <span className="block font-medium text-lg text-center">
                    Sign up
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-neutral-200 my-2 md:my-8 rounded-[2.25rem] md:rounded-[3rem] overflow-hidden">
        <div className="px-8 py-12 md:p-12">
          <p className="mb-1 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
            What and when
          </p>
          <h2 className="mb-6 text-4xl font-medium leading-2 md:text-6xl md:leading-none tracking-tight text-black">
            Culture Creatures
            <br />
            Schedule
          </h2>
          <p className="max-w-4xl mb-8 font-normal leading-normal text-base md:text-xl md:leading-normal text-neutral-600">
            We have planned this preliminary schedule for you. This is mainly a
            guide to indicate when the Culture Creatures events will happen and
            give you an impression of the time needed. The exact schedule is
            subject to change.
          </p>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Monday, April 10
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Kick-off{' '}
                  <span className="font-normal text-neutral-600 lowercase">
                    (afternoon)
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Get to know everyone and break the ice.
              </p>
            </div>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Dinner{' '}
                  <span className="font-normal text-neutral-600 lowercase">
                    (evening)
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Few things in life are better than food, so let's enjoy a meal
                together!
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Tuesday, April 11
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Overnight stay in Regensburg{' '}
                  <span className="font-normal text-neutral-600 lowercase">
                    (all-day)
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Explore the lovely town of Regensburg, take part in a medieval
                city tour, and round off the day with a dinner.
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Wednesday, April 12
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Day trip to Landshut{' '}
                  <span className="font-normal text-neutral-600 lowercase">
                    (all-day)
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Explore the medieval Trausnitz Castle&mdash;the home of the
                Wittelsbach dynasty.
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Thursday, April 13
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Rest day{' '}
                  <span className="font-normal text-neutral-600 lowercase">
                    (all-day)
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Enjoy a day off to complete organisational matters and moving
                in.
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Friday, April 14
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Munich and campus tour{' '}
                  <span className="font-normal text-neutral-600 lowercase">
                    (half-day)
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Let's explore Munich including the university district and TUM
                main campus&mdash;with the help of our tutors you'll find your
                way in no time.
              </p>
            </div>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Classical concert{' '}
                  <span className="font-normal text-neutral-600 lowercase">
                    (evening)
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Experience a concerto for violin and orchestra (premiere of a
                composition commissioned by the Bamberg Symphony Orchestra).
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Saturday, April 15
            </p>
            <div className="px-4 py-3 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Hike{' '}
                  <span className="font-normal text-neutral-600 lowercase">
                    (all-day)
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                The area surrounding Munich offers incredibly picturesque hiking
                routes which are enjoyable and beginner friendly. Enjoy
                magnificent views over Lake Schliersee and Tegernsee.
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Sunday, April 16
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Museum visit{' '}
                  <span className="font-normal text-neutral-600 lowercase">
                    (half-day)
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Visit Deutsches Museum&mdash;one of the largest natural science
                museums in the world.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-12 mb-8 md:mt-24 md:mb-12 flex items-center justify-center">
        <div className="flex flex-col space-y-3 w-full px-8 md:flex-row md:justify-center md:space-x-4 md:space-y-0">
          <Link
            className="shrink-0 h-fit overflow-hidden inline-block leading-none rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all px-4 py-2 focus:outline-none focus:ring"
            to="/registration"
          >
            <span className="block font-medium text-lg text-center">
              Sign up now
            </span>
          </Link>
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
