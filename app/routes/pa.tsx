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
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-pink-600">
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
                October 5 &ndash; October 15, 2023
              </p>
              <h1 className="mb-6 text-4xl font-medium leading-2 md:text-6xl md:leading-none tracking-tight text-white ">
                Welcome to <br />
                Party Animals - into the City Jungle
              </h1>
              <p className="mb-8 font-normal text-base leading-normal md:text-xl md:leading-normal text-white text-opacity-80">
                Party Animals is the ultimate orientation program for exchange
                and international students who want to dive into Munich's
                student (night) life. Join one of eight teams of 25 students,
                make new friends, and get to know the ins and outs of the city
                together. The programme is designed to be intense and takes
                place from October 5 to October 15, 2023.
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
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-0 right-0">
            <img
              className="block h-full w-full object-cover object-bottom"
              src="/images/group.jpg"
            />
          </div>
          <div className="relative bg-gradient-to-t from-[rgba(0,0,0,0.8)] bg-blend-multiply">
            <div className="max-w-4xl px-8 pb-12 pt-48 md:px-12 md:pb-12 md:pt-96">
              <h2 className="mb-4 text-2xl font-medium leading-tight md:mb-6 md:text-4xl md:leading-tight text-white tracking-tight">
                Ten Days &mdash; One Package of Wild Fun
              </h2>
              <p className="font-normal text-base leading-normal md:text-xl md:leading-normal text-white text-opacity-80">
                Party Animals includes a welcome event, a group dinner, pub quiz
                and karaoke nights, parties, a sports day, a city rally, an overnight stay in the Alps, 
                a city trip, and Beerlympics. There are 200 participants and 8 groups.
                Join your Party Animals group for ten days and kick off your semester with new friends.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-neutral-200 my-2 md:my-8 rounded-md md:rounded-lg overflow-hidden">
        <div className="px-8 py-12 md:px-12">
          <p className="mb-1 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
            8 party animals
          </p>
          <h2 className="mb-8 md:mb-12 text-4xl font-medium leading-2 md:text-6xl md:leading-none tracking-tight text-black">
            Who will you join?
          </h2>
          <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-4 md:gap-y-6 xl:gap-y-8 xl:grid-cols-4">
            <div className="flex flex-row gap-3 md:gap-4 items-center">
              <img
                className="block h-auto w-8 md:w-12 shrink-0 object-cover"
                src="/images/teams/icon_orange.svg"
              />
              <p className="font-medium text-xl md:text-2xl shrink-0">
                Orange Octopi
              </p>
            </div>
            <div className="flex flex-row gap-3 md:gap-4 items-center">
              <img
                className="block h-auto w-8 md:w-12 shrink-0 object-cover"
                src="/images/teams/icon_blue.svg"
              />
              <p className="font-medium text-xl md:text-2xl shrink-0">
                Blue Bulls
              </p>
            </div>
            <div className="flex flex-row gap-3 md:gap-4 items-center">
              <img
                className="block h-auto w-8 md:w-12 shrink-0 object-cover"
                src="/images/teams/icon_turquoise.svg"
              />
              <p className="font-medium text-xl md:text-2xl shrink-0">
                Turquoise Turtles
              </p>
            </div>
            <div className="flex flex-row gap-3 md:gap-4 items-center">
              <img
                className="block h-auto w-8 md:w-12 shrink-0 object-cover"
                src="/images/teams/icon_lime.svg"
              />
              <p className="font-medium text-xl md:text-2xl shrink-0">
                Lemon Llamas
              </p>
            </div>
            <div className="flex flex-row gap-3 md:gap-4 items-center">
              <img
                className="block h-auto w-8 md:w-12 shrink-0 object-cover"
                src="/images/teams/icon_green.svg"
              />
              <p className="font-medium text-xl md:text-2xl shrink-0">
                Green Goats
              </p>
            </div>
            <div className="flex flex-row gap-3 md:gap-4 items-center">
              <img
                className="block h-auto w-8 md:w-12 shrink-0 object-cover"
                src="/images/teams/icon_pink.svg"
              />
              <p className="font-medium text-xl md:text-2xl shrink-0">
                Pink Penguins
              </p>
            </div>
            <div className="flex flex-row gap-3 md:gap-4 items-center">
              <img
                className="block h-auto w-8 md:w-12 shrink-0 object-cover"
                src="/images/teams/icon_purple.svg"
              />
              <p className="font-medium text-xl md:text-2xl shrink-0">
                Purple Panthers
              </p>
            </div>
            <div className="flex flex-row gap-3 md:gap-4 items-center">
              <img
                className="block h-auto w-8 md:w-12 shrink-0 object-cover"
                src="/images/teams/icon_red.svg"
              />
              <p className="font-medium text-xl md:text-2xl shrink-0">
                Red Rhinos
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-neutral-200 my-2 md:my-8 rounded-[2.25rem] md:rounded-[3rem] overflow-hidden">
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-0 right-0">
            <img
              className="block h-full w-full object-cover"
              src="/images/red-rhinos.jpg"
            />
          </div>
          <div className="relative bg-gradient-to-t from-[rgba(0,0,0,0.8)] bg-blend-multiply">
            <div className="max-w-4xl px-8 pb-12 pt-48 md:px-12 md:pb-12 md:pt-96">
              <h2 className="mb-4 text-2xl font-medium leading-tight md:mb-6 md:text-4xl md:leading-tight text-white tracking-tight">
                Unleash your inner Party Animal
              </h2>
              <p className="font-normal text-base leading-normal md:text-xl md:leading-normal text-white text-opacity-80">
                What's better than a party? Multiple parties. We make sure to
                justify the name of the programme by providing you with plenty
                of opportunities to party. Outdoors, indoors, during the day, or
                at night&mdash;as a Party Animal, there is a party anywhere and
                anytime.
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
      <section className="bg-neutral-200 my-2 md:my-8 rounded-[2.25rem] md:rounded-[3rem] overflow-hidden">
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-0 right-0">
            <img
              className="block h-full w-full object-cover"
              src="/images/teams.jpg"
            />
          </div>
          <div className="relative bg-gradient-to-t from-[rgba(0,0,0,0.8)] bg-blend-multiply">
            <div className="max-w-4xl px-8 pb-12 pt-48 md:px-12 md:pb-12 md:pt-96">
              <h2 className="mb-4 text-2xl font-medium leading-tight md:mb-6 md:text-4xl md:leading-tight text-white tracking-tight">
              Eight Teams &mdash; One unforgettable adventure
              </h2>
              <p className="font-normal text-base leading-normal md:text-xl md:leading-normal text-white text-opacity-80">
                united for Munich's ultimate student experience
              </p>
              <p className="font-normal text-base leading-normal md:text-xl md:leading-normal text-white text-opacity-80">
                At Party Animals, we focus on making new friends and building a strong team.
                While we enjoy fun competitions and games between teams, we all share the spirit of being Party Animals.
                Most importantly, it's about having a great time.
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
              <p className="text-pink-600">Student from the Czech Republic</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-neutral-200 my-2 md:my-8 rounded-[2.25rem] md:rounded-[3rem] overflow-hidden">
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-0 right-0">
            <img
              className="block h-full w-full object-cover"
              src="/images/tu-film.jpg"
            />
          </div>
          <div className="relative bg-gradient-to-t from-[rgba(0,0,0,0.8)] bg-blend-multiply">
            <div className="max-w-4xl px-8 pb-12 pt-48 md:px-12 md:pb-12 md:pt-96">
              <h2 className="mb-4 text-2xl font-medium leading-tight md:mb-6 md:text-4xl md:leading-tight text-white tracking-tight">
                Maybe something about the overnight stay in the alps
              </h2>
              <p className="font-normal text-base leading-normal md:text-xl md:leading-normal text-white text-opacity-80">
                Text text text text help me @Alissa text text text text text text text text text text text text text text
                Text text text text help me @Alissa text text text text text text text text text text text text text text
                Text text text text help me @Alissa text text text text text text text text text text text text text text
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-neutral-200 my-2 md:my-8 rounded-[2.25rem] md:rounded-[3rem] overflow-hidden">
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-0 right-0">
            <img
              className="block h-full w-full object-cover"
              src="/images/team.jpg"
            />
          </div>
          <div className="relative bg-gradient-to-t from-[rgba(0,0,0,0.8)] bg-blend-multiply">
            <div className="max-w-4xl px-8 pb-12 pt-48 md:px-12 md:pb-12 md:pt-96">
              <h2 className="mb-4 text-2xl font-medium leading-tight md:mb-6 md:text-4xl md:leading-tight text-white tracking-tight">
                Make friends for the rest of the semester
              </h2>
              <p className="font-normal text-base leading-normal md:text-xl md:leading-normal text-white text-opacity-80">
                Our orientation programmes provide the perfect opportunity to
                get to know other students and form friendships that will
                amplify your exchange experience throughout the semester. Most
                Party Animals teams keep in touch long after the last day of the
                programme and embark on many more journeys together.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-neutral-200 my-2 md:my-8 rounded-[2.25rem] md:rounded-[3rem] overflow-hidden hover-click">
        <Link to="/team">
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-0 right-0">
            <img
              className="block h-full w-full object-cover"
              src="/images/kickoff.jpg"
            />
          </div>
          <div className="relative bg-gradient-to-t from-[rgba(0,0,0,0.8)] bg-blend-multiply">
            <div className="max-w-4xl px-8 pb-12 pt-48 md:px-12 md:pb-12 md:pt-96">
              <h2 className="mb-4 text-2xl font-medium leading-tight md:mb-6 md:text-4xl md:leading-tight text-white tracking-tight">
                Get to know us
              </h2>
              <p className="font-normal text-base leading-normal md:text-xl md:leading-normal text-white text-opacity-80">
                Take a look at the people behind TUMi and Party Animals
              </p>
            </div>
          </div>
        </div>
        </Link>
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
            We are planning this preliminary schedule for you. This will be mainly a
            guide to indicate when the Party Animals events will happen and give
            you an impression of the time needed. The exact schedule needs to be finished already wtf
          </p>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Thursday, October 5
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Kickoff{' '}
                  <span className="font-normal text-neutral-600 lowercase">
                    (afternoon)
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Get to know your party group, make first connections, and plan how you'll be the best team.
              </p>
            </div>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Coffee and Cake/Dinner 2.0{' '}
                  <span className="font-normal text-neutral-600 lowercase">
                    (evening)
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Few things in life are better than food, so let's bond over some good Kaffee und Kuchen!
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Friday, October 6
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  PUB QUIZ {' '}
                  <span className="font-normal text-neutral-600 lowercase">
                    (afternoon)
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Get to know Munich's student bar scene and combine your (trivia) knowledge as a team and take home the winning prize.
              </p>
            </div>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  KARAOKE {' '}
                  <span className="font-normal text-neutral-600 lowercase">
                    (afternoon)
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Tired of singing in the shower? Warm up your vocal cords and get yourself ready for an unforgettable karaoke night! And even if you're not much of a singer, you won't be able to resist grabbing the microphone.
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Saturday, October 7
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  City Ralley{' '}
                  <span className="font-normal text-neutral-600 lowercase">
                    (morning)
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Explore Munich through fun challenges. Can you collect more points than the other teams?
              </p>
            </div>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Karaoke{' '}
                  <span className="font-normal text-neutral-600 lowercase">
                    (afternoon)
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Tired of singing in the shower? Warm up your vocal cords and get
                yourself ready for an unforgettable karaoke night! And even if
                you're not much of a singer, you won't be able to resist
                grabbing the microphone.
              </p>
            </div>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  PUB QUIZ {' '}
                  <span className="font-normal text-neutral-600 lowercase">
                    (afternoon)
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
              Get to know Munich's student bar scene and combine your (trivia) knowledge as a team and take home the winning prize.
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Sunday, October 8
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Group time{' '}
                  <span className="font-normal text-neutral-600 lowercase">
                    (all-day)
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Reminisce about your incredible orientation experience and make plans for what's next.
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Monday, October 9
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Sports day{' '}
                  <span className="font-normal text-neutral-600 lowercase">
                    (all-day)
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                After a relaxed day, physical activity will help us to get back into the groove. Show your competitive side and help your team win.
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Tuesday, October 10
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Overnight Stay in the Austrian Alps{' '}
                  <span className="font-normal text-neutral-600 lowercase">
                    (whole-day)
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
              There is no better way to connect with your team than spending 24 hours together &ndash; and partying 1564m above sea level.
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Wednesday, October 11
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Return from the Alps{' '}
                  <span className="font-normal text-neutral-600 lowercase">
                    (whole-day)
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Have fun on the ride home or catch up on some sleep.
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Thursday, October 12
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Kiosk/Pub Crawl{' '}
                  <span className="font-normal text-neutral-600 lowercase">
                    (afternoon)
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Let's do some barhopping and experience student's favorite places to take a drink, while engaging in some fun games and quests. The perfect warm up for...
              </p>
            </div>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Club Party {' '}
                  <span className="font-normal text-neutral-600 lowercase">
                    (night)
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
              ...a big Party! How could we claim to be Party Animals if we didn't have another party?!
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Friday, October 13
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Potluck Dinner{' '}
                  <span className="font-normal text-neutral-600 lowercase">
                    (dinner)
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Let’s gather for a nice savory dinner, where everyone brings a meal/dish to share, creating a diverse and communal dining experience.
              </p>
            </div>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Club Party {' '}
                  <span className="font-normal text-neutral-600 lowercase">
                    (night)
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
              ...a big Party! How could we claim to be Party Animals if we didn't have another party?!
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Saturday, October 14
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Beerlympics
                  <span className="font-normal text-neutral-600 lowercase">
                    (noon)
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                The name says it all &ndash; show your team spirit and (drinking) skills! Join forces with another team to compete in four highly entertaining games.
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 mt-6 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
              Sunday, October 15
            </p>
            <div className="px-4 py-3 mb-4 grid grid-flow-row grid-cols-1 sm:p-4 sm:grid-cols-2 sm:gap-4 rounded-xl bg-neutral-100">
              <p className="font-normal text-base md:text-lg">
                <strong className="font-medium text-black">
                  Group time{' '}
                  <span className="font-normal text-neutral-600 lowercase">
                    (all-day)
                  </span>
                </strong>
              </p>
              <p className="text-neutral-600 text-base md:text-lg">
                Reminisce about your incredible orientation experience and make plans for what's next.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-neutral-200 my-2 md:my-8 rounded-[2.25rem] md:rounded-[3rem] overflow-hidden hover-click">
        <Link to="/qa">
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-0 right-0">
              <img
                className="block h-full w-full object-cover"
                src="/images/kickoff.jpg"
              />
            </div>
            <div className="relative bg-gradient-to-t from-[rgba(0,0,0,0.8)] bg-blend-multiply">
              <div className="max-w-4xl px-8 pb-12 pt-48 md:px-12 md:pb-12 md:pt-96">
                <h2 className="mb-4 text-2xl font-medium leading-tight md:mb-6 md:text-4xl md:leading-tight text-white tracking-tight">
                  Have a question?
                </h2>
                <p className="font-normal text-base leading-normal md:text-xl md:leading-normal text-white text-opacity-80">
                  Click here to check out our section about frequently asked questions and their answers. You can most probably find the answer to your question there, or find ways to contact us there.
                </p>
              </div>
            </div>
          </div>
        </Link>
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
