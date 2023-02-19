import styles from '~/styles/landing.css';
import { Link } from '@remix-run/react';
import { itemURL } from '~/utils';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export default function Index() {
  return (
    <main className="max-w-7xl m-auto px-2 md:px-8">
      <section className="my-2 md:my-8 rounded-[2.25rem] md:rounded-[3rem] overflow-hidden">
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-0 right-0">
            <img
              className="block h-full w-full object-cover"
              src="/images/spring.jpg"
            />
          </div>
          <div className="relative z-10 px-8 py-12 md:px-12">
            <img
              className="block w-48 md:w-64 h-auto"
              src="/images/logo-stack.png"
            />
          </div>
          <div className="relative bg-gradient-to-t from-[rgba(0,26,102,0.8)] bg-blend-multiply">
            <div className="max-w-4xl px-8 pb-12 pt-24 md:px-12 md:pb-12 md:pt-48">
              <p className="mb-1 text-sm md:text-base font-black tracking-wide uppercase text-opacity-60 text-white">
                The ultimate exchange experience
              </p>
              <h1 className="mb-6 text-4xl font-medium leading-2 md:text-6xl md:leading-none tracking-tight text-white ">
                Unleash your inner <br />
                Party Animal
              </h1>
              <p className="mb-8 font-normal text-base leading-normal md:text-xl md:leading-normal text-white text-opacity-80">
                Once upon a time, a secret council came together to develop the
                perfect student exchange experience in Munich. In the name of
                science, we have been perfecting the formula ever since: Party
                Animals is the ultimate orientation program for exchange and
                international students who want to dive into Munich's student
                (night) life.
              </p>
              <div className="flex flex-col md:flex-row">
                <Link
                  className="shrink-0 h-fit overflow-hidden inline-block leading-none rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all px-4 py-2 focus:outline-none focus:ring"
                  to="/registration"
                >
                  <span className="block font-medium text-lg text-center">
                    Sign up for Party Animals
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#140033] my-2 md:my-8 rounded-[2.25rem] md:rounded-[3rem] overflow-hidden">
        <div className="max-w-4xl px-8 py-12 md:p-12">
          <p className="mb-1 text-sm md:text-base font-black tracking-wide uppercase text-violet-400 ">
            Not a big party person?
          </p>
          <h2 className="mb-6 text-4xl font-medium leading-2 md:text-6xl md:leading-none tracking-tight text-violet-200">
            Comfort your inner
            <br />
            Culture Creature
          </h2>
          <p className="mb-8 font-normal text-base leading-normal md:text-xl md:leading-normal text-violet-400">
            Believe it or not, Bavaria has more to offer than beer. So, let the
            Party Animals roam free and turn into a Culture Creature. Instead of
            copious amounts of adult beverages, you'll engage in copious amounts
            of cultural events and activities. The programme is also a great way
            to get to know Munich, meet people, and make friends. Your doctor
            might thank you.
          </p>
          <div className="flex flex-col md:flex-row">
            <Link
              className="shrink-0 h-fit overflow-hidden inline-block leading-none rounded-xl bg-violet-200 text-black hover:bg-violet-300 transition-all px-4 py-2 focus:outline-none focus:ring"
              to="/registration"
            >
              <span className="block font-medium text-lg text-center">
                Sign up for Culture Creatures
              </span>
            </Link>
          </div>
        </div>
      </section>
      <section className="my-2 md:my-8 rounded-[2.25rem] md:rounded-[3rem] overflow-hidden">
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-0 right-0">
            <img
              className="block h-full w-full object-cover"
              src="/images/lake.jpg"
            />
          </div>
          <div className="relative bg-gradient-to-t from-[rgba(0,0,0,0.8)] bg-blend-multiply">
            <div className="max-w-4xl px-8 pb-12 pt-48 md:px-12 md:pb-12 md:pt-96">
              <h2 className="mb-4 text-2xl font-medium leading-tight md:mb-6 md:text-4xl md:leading-tight text-white tracking-tight">
                Subheading
              </h2>
              <p className="font-normal text-base leading-normal md:text-xl md:leading-normal text-white text-opacity-80">
                We cannot wait to welcome you to the green and beautiful scenery
                of Munich, the perfect place for a warm get together with your
                future best friends for the semester and beyond. Bring out the
                athlete that lies within you and impress them from the very
                start! But don't worry, it's not about winning. Much more
                importantly, we will be playing beautiful games and enjoy tasty
                Bavarian beer culture, combined into one beautiful competition,
                where the only losers are those who choose not to participate!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="my-2 md:my-8 w-full grid grid-flow-row grid-cols-1 gap-x-2 gap-y-2 md:gap-y-8 sm:grid-cols-2">
        <div className="bg-violet-200 rounded-md md:rounded-lg overflow-hidden">
          <div className="max-w-4xl p-8 md:p-12">
            <h2 className="font-medium leading-tight text-2xl md:leading-tight text-black tracking-tight mb-6 ">
              Culture Creatures
            </h2>
            <p className="font-medium text-6xl text-black mb-2">€89</p>
            <div className="text-base font-normal leading-snug text-black md:leading-snug mb-8">
              <p className="text-violet-600 font-medium">Only €12.50 per day</p>
              <p>7 days of action</p>
            </div>
            <div className="flex flex-col md:flex-row">
              <Link
                className="shrink-0 h-fit overflow-hidden inline-block leading-none rounded-xl bg-white text-black hover:text-opacity-80 transition-all px-4 py-2 focus:outline-none focus:ring"
                to="/registration"
              >
                <span className="block font-medium text-lg text-center">
                  Sign up
                </span>
              </Link>
            </div>
            <div className="mt-6 text-sm md:text-base font-normal leading-snug md:leading-snug">
              <p className="text-black text-opacity-60">
                For exchange and international students who want to explore
                Munich's rich cultural landscape. The package includes the cost
                of all activities. It does not cover additional drinks and food
                that you may want to consume during the events. You will join of
                of two groups of 20 students each (incl. 3 organisers per
                group).
              </p>
            </div>
          </div>
        </div>
        <div className="bg-black rounded-md md:rounded-lg overflow-hidden">
          <div className="max-w-4xl p-8 md:p-12">
            <h2 className="font-medium leading-tight text-2xl md:leading-tight text-white tracking-tight mb-6">
              Party Animals
            </h2>
            <p className="font-medium text-6xl text-white mb-2">€119</p>
            <div className="text-base font-normal leading-snug text-white md:leading-snug mb-8">
              <p className="text-blue-400 font-medium">Only €8.50 per day</p>
              <p>14 days of action</p>
            </div>
            <div className="flex flex-col md:flex-row">
              <Link
                className="shrink-0 h-fit overflow-hidden inline-block leading-none rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all px-4 py-2 focus:outline-none focus:ring"
                to="/registration"
              >
                <span className="block font-medium text-lg text-center">
                  Sign up
                </span>
              </Link>
            </div>
            <div className="mt-6 text-sm md:text-base font-normal leading-snug md:leading-snug">
              <p className="text-white text-opacity-60">
                For exchange and international students who want to dive into
                Munich's student (night) life. The package includes the cost of
                all activities. It does not cover additional drinks and food
                that you may want to consume during the events. You will join of
                of eight groups of 25 students each (incl. five organisers per
                group).
              </p>
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
            Party Animals
            <br />
            Schedule
          </h2>
          <p className="max-w-4xl mb-8 font-normal leading-normal text-base md:text-xl md:leading-normal text-neutral-600">
            We have planned this preliminary schedule for you. This is mainly a
            guide to indicate when the Party Animals events will happen and give
            you an impression of the time needed. The exact schedule is subject
            to change.
          </p>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Monday, April 3
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <strong className="self-center font-normal text-base md:text-lg">
                Event Name
              </strong>
              <p className="self-center text-neutral-600 text-base md:text-lg">
                Time: Description
              </p>
            </div>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <strong className="self-center font-normal text-base md:text-lg">
                Event Name
              </strong>
              <p className="self-center text-neutral-600 text-base md:text-lg">
                Time: Description
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Tuesday, April 4
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <strong className="self-center font-normal text-base md:text-lg">
                Event Name
              </strong>
              <p className="self-center text-neutral-600 text-base md:text-lg">
                Time: Description
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Wednesday, April 5
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <strong className="self-center font-normal text-base md:text-lg">
                Event Name
              </strong>
              <p className="self-center text-neutral-600 text-base md:text-lg">
                Time: Description
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Thursday, April 6
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <strong className="self-center font-normal text-base md:text-lg">
                Event Name
              </strong>
              <p className="self-center text-neutral-600 text-base md:text-lg">
                Time: Description
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Friday, April 7
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <strong className="self-center font-normal text-base md:text-lg">
                Event Name
              </strong>
              <p className="self-center text-neutral-600 text-base md:text-lg">
                Time: Description
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Saturday, April 8
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <strong className="self-center font-normal text-base md:text-lg">
                Event Name
              </strong>
              <p className="self-center text-neutral-600 text-base md:text-lg">
                Time: Description
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Sunday, April 9
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <strong className="self-center font-normal text-base md:text-lg">
                Event Name
              </strong>
              <p className="self-center text-neutral-600 text-base md:text-lg">
                Time: Description
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Monday, April 10
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <strong className="self-center font-normal text-base md:text-lg">
                Event Name
              </strong>
              <p className="self-center text-neutral-600 text-base md:text-lg">
                Time: Description
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Tuesday, April 11
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <strong className="self-center font-normal text-base md:text-lg">
                Event Name
              </strong>
              <p className="self-center text-neutral-600 text-base md:text-lg">
                Time: Description
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Wednesday, April 12
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <strong className="self-center font-normal text-base md:text-lg">
                Event Name
              </strong>
              <p className="self-center text-neutral-600 text-base md:text-lg">
                Time: Description
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Thursday, April 13
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <strong className="self-center font-normal text-base md:text-lg">
                Event Name
              </strong>
              <p className="self-center text-neutral-600 text-base md:text-lg">
                Time: Description
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Friday, April 14
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <strong className="self-center font-normal text-base md:text-lg">
                Event Name
              </strong>
              <p className="self-center text-neutral-600 text-base md:text-lg">
                Time: Description
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Saturday, April 15
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <strong className="self-center font-normal text-base md:text-lg">
                Event Name
              </strong>
              <p className="self-center text-neutral-600 text-base md:text-lg">
                Time: Description
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Sunday, April 16
            </p>
            <div className="px-4 py-3 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <strong className="self-center font-normal text-base md:text-lg">
                Event Name
              </strong>
              <p className="self-center text-neutral-600 text-base md:text-lg">
                Time: Description
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="my-2 md:my-8 rounded-[2.25rem] md:rounded-[3rem] overflow-hidden">
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-0 right-0">
            <img
              className="block h-full w-full object-cover"
              src="/images/tutors/gavin.jpg"
            />
          </div>
          <div className="relative bg-gradient-to-t from-[rgba(0,0,0,0.8)] bg-blend-multiply">
            <div className="max-w-4xl px-8 pb-12 pt-48 md:px-12 md:pb-12 md:pt-96">
              <h2 className="mb-4 text-2xl font-medium leading-tight md:mb-6 md:text-4xl md:leading-tight text-white tracking-tight">
                Subheading
              </h2>
              <p className="font-normal text-base leading-normal md:text-xl md:leading-normal text-white text-opacity-80">
                We cannot wait to welcome you to the green and beautiful scenery
                of Munich, the perfect place for a warm get together with your
                future best friends for the semester and beyond. Bring out the
                athlete that lies within you and impress them from the very
                start! But don't worry, it's not about winning. Much more
                importantly, we will be playing beautiful games and enjoy tasty
                Bavarian beer culture, combined into one beautiful competition,
                where the only losers are those who choose not to participate!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="my-2 md:my-8 w-full grid grid-flow-row grid-cols-1 gap-x-2 gap-y-2 md:gap-y-8 sm:grid-cols-2">
        <div className="bg-orange-200 rounded-md md:rounded-lg overflow-hidden">
          <div className="max-w-4xl p-8 md:p-12 h-full flex flex-col justify-between">
            <p className="font-medium leading-tight tracking-tight text-xl md:text-3xl md:leading-tight text-black">
              The best way to start an exchange semester and meet amazing people
              from all over the world. The best way to start an exchange
              semester and meet amazing people from all over the world.
            </p>
            <div className="mt-4 text-base md:text-xl font-medium leading-snug md:leading-snug">
              <p className="text-orange-900">Anna</p>
              <p className="text-orange-600">Participated in Oct 22</p>
            </div>
          </div>
        </div>
        <div className="bg-green-200 rounded-md md:rounded-lg overflow-hidden">
          <div className="max-w-4xl p-8 md:p-12 h-full flex flex-col justify-between">
            <p className="font-medium leading-tight tracking-tight text-xl md:text-3xl md:leading-tight text-black">
              The best way to start an exchange semester and meet amazing people
              from all over the world.
            </p>
            <div className="mt-4 text-base md:text-xl font-medium leading-snug md:leading-snug">
              <p className="text-green-900">Anna</p>
              <p className="text-green-600">Participated in Oct 22</p>
            </div>
          </div>
        </div>
      </section>
      <section className="my-2 md:my-8 rounded-[2.25rem] md:rounded-[3rem] overflow-hidden">
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-0 right-0">
            <img
              className="block h-full w-full object-cover"
              src="/images/dinner.jpg"
            />
          </div>
          <div className="relative bg-gradient-to-t from-[rgba(0,0,0,0.8)] bg-blend-multiply">
            <div className="max-w-4xl px-8 pb-12 pt-48 md:px-12 md:pb-12 md:pt-96">
              <h2 className="mb-4 text-2xl font-medium leading-tight md:mb-6 md:text-4xl md:leading-tight text-white tracking-tight">
                Subheading
              </h2>
              <p className="font-normal text-base leading-normal md:text-xl md:leading-normal text-white text-opacity-80">
                We cannot wait to welcome you to the green and beautiful scenery
                of Munich, the perfect place for a warm get together with your
                future best friends for the semester and beyond. Bring out the
                athlete that lies within you and impress them from the very
                start! But don't worry, it's not about winning. Much more
                importantly, we will be playing beautiful games and enjoy tasty
                Bavarian beer culture, combined into one beautiful competition,
                where the only losers are those who choose not to participate!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="my-2 md:my-8 w-full grid grid-flow-row grid-cols-1 gap-x-2 gap-y-2 md:gap-y-8 sm:grid-cols-2">
        <div className="bg-sky-200 rounded-md md:rounded-lg overflow-hidden">
          <div className="max-w-4xl p-8 md:p-12 h-full flex flex-col justify-between">
            <p className="font-medium leading-tight tracking-tight text-xl md:text-3xl md:leading-tight text-black">
              The best way to start an exchange semester and meet amazing people
              from all over the world.
            </p>
            <div className="mt-4 text-base md:text-xl font-medium leading-snug md:leading-snug">
              <p className="text-sky-900">Anna</p>
              <p className="text-sky-600">Participated in Oct 22</p>
            </div>
          </div>
        </div>
        <div className="bg-pink-200 rounded-md md:rounded-lg overflow-hidden">
          <div className="max-w-4xl p-8 md:p-12 h-full flex flex-col justify-between">
            <p className="font-medium leading-tight tracking-tight text-xl md:text-3xl md:leading-tight text-black">
              The best way to start an exchange semester and meet amazing people
              from all over the world.
            </p>
            <div className="mt-4 text-base md:text-xl font-medium leading-snug md:leading-snug">
              <p className="text-pink-900">Anna</p>
              <p className="text-pink-600">Participated in Oct 22</p>
            </div>
          </div>
        </div>
      </section>
      <section className="my-2 md:my-8 rounded-[2.25rem] md:rounded-[3rem] overflow-hidden">
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-0 right-0">
            <img
              className="block h-full w-full object-cover"
              src="/images/beerlympics.jpg"
            />
          </div>
          <div className="relative bg-gradient-to-t from-[rgba(0,0,0,0.8)] bg-blend-multiply">
            <div className="max-w-4xl px-8 pb-12 pt-48 md:px-12 md:pb-12 md:pt-96">
              <h2 className="mb-4 text-2xl font-medium leading-tight md:mb-6 md:text-4xl md:leading-tight text-white tracking-tight">
                Subheading
              </h2>
              <p className="font-normal text-base leading-normal md:text-xl md:leading-normal text-white text-opacity-80">
                We cannot wait to welcome you to the green and beautiful scenery
                of Munich, the perfect place for a warm get together with your
                future best friends for the semester and beyond. Bring out the
                athlete that lies within you and impress them from the very
                start! But don't worry, it's not about winning. Much more
                importantly, we will be playing beautiful games and enjoy tasty
                Bavarian beer culture, combined into one beautiful competition,
                where the only losers are those who choose not to participate!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="my-2 md:my-8 rounded-[2.25rem] md:rounded-[3rem] overflow-hidden">
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-0 right-0">
            <img
              className="block h-full w-full object-cover"
              src="/images/party.jpg"
            />
          </div>
          <div className="relative bg-gradient-to-t from-[rgba(0,0,0,0.8)] bg-blend-multiply">
            <div className="max-w-4xl px-8 pb-12 pt-48 md:px-12 md:pb-12 md:pt-96">
              <h2 className="mb-4 text-2xl font-medium leading-tight md:mb-6 md:text-4xl md:leading-tight text-white tracking-tight">
                Subheading
              </h2>
              <p className="font-normal text-base leading-normal md:text-xl md:leading-normal text-white text-opacity-80">
                We cannot wait to welcome you to the green and beautiful scenery
                of Munich, the perfect place for a warm get together with your
                future best friends for the semester and beyond. Bring out the
                athlete that lies within you and impress them from the very
                start! But don't worry, it's not about winning. Much more
                importantly, we will be playing beautiful games and enjoy tasty
                Bavarian beer culture, combined into one beautiful competition,
                where the only losers are those who choose not to participate!
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
          <a
            className="shrink-0 h-fit overflow-hidden inline-block leading-none rounded-xl text-black border border-neutral-300 hover:bg-neutral-300 transition-all px-4 py-2 focus:outline-none focus:ring"
            href="https://tumi.esn.world/events"
            target="_blank"
          >
            <span className="block font-medium text-lg text-center">
              Explore our other events
            </span>
          </a>
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
