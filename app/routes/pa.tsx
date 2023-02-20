import styles from '~/styles/landing.css';
import { Link } from '@remix-run/react';
import { itemURL } from '~/utils';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export default function PartyAnimals() {
  return (
    <main className="max-w-7xl m-auto px-2 md:px-8">
      <section className="my-2 md:my-8 rounded-[2.25rem] md:rounded-[3rem] overflow-hidden">
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-0 right-0">
            <img
              className="block h-full w-full object-cover"
              src="/images/party-animals.jpg"
            />
          </div>
          <div className="relative z-10 px-8 pt-12 md:px-12">
            <img
              className="block w-48 md:w-64 h-auto"
              src="/images/logo-stack.png"
            />
          </div>
          <div className="relative bg-gradient-to-t from-[rgba(77,0,38,0.8)] bg-blend-multiply">
            <div className="max-w-4xl px-8 pb-12 pt-16 md:px-12 md:pb-12 md:pt-32">
              <p className="mb-1 text-sm md:text-base font-black tracking-wide uppercase text-opacity-60 text-white">
                The ultimate exchange experience
              </p>
              <h1 className="mb-6 text-4xl font-medium leading-2 md:text-6xl md:leading-none tracking-tight text-white ">
                Welcome to <br />
                Party Animals
              </h1>
              <p className="mb-8 font-normal text-base leading-normal md:text-xl md:leading-normal text-white text-opacity-80">
                Party Animals is the ultimate orientation program for exchange
                and international students who want to dive into Munich's
                student (night) life. Join one of eight teams of 25 students
                (incl. five tutors), make new friends, and get to know the ins
                and outs of the city together. The programme is intense but
                incredibly rewarding.
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
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Opening
                  <span className="ml-2 font-medium text-neutral-600 uppercase text-xs md:text-sm tracking-wide">
                    afternoon
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Meet all the participants and break the ice
              </p>
            </div>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Dinner
                  <span className="ml-2 font-medium text-neutral-600 uppercase text-xs md:text-sm tracking-wide">
                    evening
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Enjoy a meal together with all teams in a typical Bavarian beer
                hall
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Tuesday, April 4
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Info session @ TUM
                  <span className="ml-2 font-medium text-neutral-600 uppercase text-xs md:text-sm tracking-wide">
                    afternoon
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Learn everything you need to know about your semester in Munich
              </p>
            </div>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Pub quiz
                  <span className="ml-2 font-medium text-neutral-600 uppercase text-xs md:text-sm tracking-wide">
                    evening
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Get to know Munich's student bar scene and showcase your trivia
                knowledge
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Wednesday, April 5
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Brewery tour
                  <span className="ml-2 font-medium text-neutral-600 uppercase text-xs md:text-sm tracking-wide">
                    afternoon
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Take a behind the scenes look at how Bavarian beer is made
              </p>
            </div>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Karaoke
                  <span className="ml-2 font-medium text-neutral-600 uppercase text-xs md:text-sm tracking-wide">
                    evening
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Singing in the shower has finally paid off
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Thursday, April 6
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Movie night
                  <span className="ml-2 font-medium text-neutral-600 uppercase text-xs md:text-sm tracking-wide">
                    evening
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Experience a movie&mdash;but in a large lecture hall
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Friday, April 7
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Group time
                  <span className="ml-2 font-medium text-neutral-600 uppercase text-xs md:text-sm tracking-wide">
                    all-day
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Dedicated time with your group to do whatever you want
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Saturday, April 8
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  City rallye
                  <span className="ml-2 font-medium text-neutral-600 uppercase text-xs md:text-sm tracking-wide">
                    half-day
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Explore Munich through fun challenges
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Sunday, April 9
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Easter break
                  <span className="ml-2 font-medium text-neutral-600 uppercase text-xs md:text-sm tracking-wide">
                    all-day
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Bavaria loves its public holidays
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Monday, April 10
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Sports day
                  <span className="ml-2 font-medium text-neutral-600 uppercase text-xs md:text-sm tracking-wide">
                    half-day
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Show your competitive side and help your team win
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
                  Overnight stay at a castle
                  <span className="ml-2 font-medium text-neutral-600 uppercase text-xs md:text-sm tracking-wide">
                    all-day
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                There's nothing quite like a party in a castle
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
                  Return from castle
                  <span className="ml-2 font-medium text-neutral-600 uppercase text-xs md:text-sm tracking-wide">
                    half-day
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                There's nothing quite like a party in a castle
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
                  Club party
                  <span className="ml-2 font-medium text-neutral-600 uppercase text-xs md:text-sm tracking-wide">
                    evening
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Because a party in a castle is not enough
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
                  Day trip
                  <span className="ml-2 font-medium text-neutral-600 uppercase text-xs md:text-sm tracking-wide">
                    all-day
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Explore a picturesque town in the region around Munich
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Saturday, April 15
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Beerlympics
                  <span className="ml-2 font-medium text-neutral-600 uppercase text-xs md:text-sm tracking-wide">
                    half-day
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                The name says it all
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Sunday, April 16
            </p>
            <div className="px-4 py-3 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Group time
                  <span className="ml-2 font-medium text-neutral-600 uppercase text-xs md:text-sm tracking-wide">
                    all-day
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Reminisce about your incredible orientation experience
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
              Party Animals is one of my best memories from Erasmus and I am
              still in touch with the people I met there!
            </p>
            <div className="mt-4 text-base md:text-xl font-medium leading-snug md:leading-snug">
              <p className="text-orange-900">Linnéa</p>
              <p className="text-orange-600">Student from France</p>
            </div>
          </div>
        </div>
        <div className="bg-green-200 rounded-md md:rounded-lg overflow-hidden">
          <div className="max-w-4xl p-8 md:p-12 h-full flex flex-col justify-between">
            <p className="font-medium leading-tight tracking-tight text-xl md:text-3xl md:leading-tight text-black">
              If I could join Party Animals again, I would! I had an absolute
              blast. I made a lot of friends that I kept hanging out with all
              semester.
            </p>
            <div className="mt-4 text-base md:text-xl font-medium leading-snug md:leading-snug">
              <p className="text-green-900">Philippe</p>
              <p className="text-green-600">Student from Canada</p>
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
              Party Animals allowed me to make friends right from the start and
              the tutors gave me loads of information that was really useful
              throughout the semester.
            </p>
            <div className="mt-4 text-base md:text-xl font-medium leading-snug md:leading-snug">
              <p className="text-sky-900">Wilf</p>
              <p className="text-sky-600">Student from the UK</p>
            </div>
          </div>
        </div>
        <div className="bg-pink-200 rounded-md md:rounded-lg overflow-hidden">
          <div className="max-w-4xl p-8 md:p-12 h-full flex flex-col justify-between">
            <p className="font-medium leading-tight tracking-tight text-xl md:text-3xl md:leading-tight text-black">
              If you want to make friends for life and see the real side of
              student life in Munich, Party Animals is the place to go!
            </p>
            <div className="mt-4 text-base md:text-xl font-medium leading-snug md:leading-snug">
              <p className="text-pink-900">Katie</p>
              <p className="text-pink-600">Student from Czech Republic</p>
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
