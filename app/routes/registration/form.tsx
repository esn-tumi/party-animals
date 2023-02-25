import { ValidationMessage } from '~/components/ValidationMessage';
import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from '@remix-run/react';
import { ActionFunction, LoaderFunction, redirect } from '@remix-run/node';
import { authenticator } from '~/services/auth.server';
import { createRegistration } from '~/services/registrations.server';
import { useState } from 'react';
import { db } from '~/utils/db.server';

export let loader: LoaderFunction = async ({ request }) => {
  const countries = await fetch(
    'https://restcountries.com/v2/all?fields=name,alpha2Code'
  ).then((res) => res.json());
  const user = await authenticator.isAuthenticated(request);
  const registration = await db.registration.findFirst({
    where: { user: { id: user?.id } },
  });
  if (registration) {
    return redirect('/registration/status');
  }
  return Promise.all([countries, user]);
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    throw new Error('User not authenticated');
  }
  const [errors, registration] = await createRegistration(formData, user);
  if (errors) {
    const values = Object.fromEntries(formData);
    return { errors, values };
  }
  return { registration };
};

export default function RegistrationForm() {
  let [countries, user] = useLoaderData();
  const [esnMember, setEsnMember] = useState(false);
  const transition = useTransition();
  const actionData = useActionData();
  const registrationCloseDate = new Date('2023-03-20');
  const now = new Date();
  const registrationClosed = now > registrationCloseDate;
  if (now > new Date('2023-03-31'))
    return (
      <section className="bg-neutral-200 my-2 md:my-8 rounded-[2.25rem] md:rounded-[3rem] overflow-hidden">
        <div className="max-w-4xl px-8 py-12 md:px-12">
          <p className="mb-1 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
            Application Closed
          </p>
          <h2 className="mb-6 text-4xl font-medium leading-2 md:text-6xl md:leading-none tracking-tight text-black">
            Programme Registration
          </h2>
          <p className="font-normal text-lg leading-normal md:text-xl md:leading-normal text-neutral-600">
            The registration deadline for the spring 2023 orientation programmes
            has passed. You can still take part in the{' '}
            <a
              href="https:/tumi.esn.world/events"
              target="_blank"
              className="text-blue-600 underline hover:text-blue-700"
            >
              TUMi orientation weeks
            </a>
            .
          </p>
        </div>
      </section>
    );
  return (
    <section className="bg-neutral-200 my-2 md:my-8 rounded-[2.25rem] md:rounded-[3rem] overflow-hidden">
      <div className="max-w-4xl px-8 pt-12 md:px-12">
        <p className="mb-1 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
          Fill out the form
        </p>
        <h2 className="mb-6 text-4xl font-medium leading-2 md:text-6xl md:leading-none tracking-tight text-black">
          Programme Registration
        </h2>
        <p className="font-normal text-base leading-normal md:text-xl md:leading-normal text-neutral-600">
          Sign up here to join Party Animals or Culture Creatures. The
          registration includes the programme outlined in the overview. You will
          be assigned to a group which you will stay with for the duration of
          the programme. We believe this is the best way to get to know each
          other and start the semester in Munich.
        </p>
      </div>
      <Form
        method="post"
        className="px-8 py-12 md:px-12 grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        {registrationClosed ? (
          <div className="mb-8">
            <div
              className="bg-neutral-100 p-4 text-black rounded-xl"
              role="alert"
            >
              <p className="font-medium text-red-600 leading-snug">
                The registration deadline has passed.{' '}
                <span className="font-normal text-black">
                  You can still sign up, however, you will be placed on the
                  waitlist. If a spot becomes available, you might have the
                  chance to claim it.
                </span>
              </p>
            </div>
          </div>
        ) : null}
        {actionData?.errors.form ? (
          <div className="md:col-span-2">
            <ValidationMessage
              isSubmitting={transition.state === 'submitting'}
              error={actionData?.errors?.form}
            />
          </div>
        ) : null}
        <h2 className="md:col-span-2 mb-4 text-2xl font-medium leading-tight md:text-4xl md:leading-tight text-black tracking-tight">
          Nice to meet you
        </h2>
        <label className="relative block h-fit" htmlFor="firstName">
          <input
            className="peer w-full font-medium text-black rounded-lg border-2 border-neutral-300 overflow-hidden bg-neutral-100 px-3 pt-6 pb-2 text-base placeholder-transparent focus:ring-1 focus:ring-blue-600"
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First Name"
            required
            defaultValue={actionData?.values?.firstName ?? user.firstName}
          />
          <span className="border-l-2 border-transparent absolute left-3 top-2 text-xs font-medium text-neutral-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs">
            First name
          </span>
          {actionData?.errors.firstName ? (
            <ValidationMessage
              isSubmitting={transition.state === 'submitting'}
              error={actionData?.errors?.firstName}
            />
          ) : null}
        </label>
        <label className="relative block h-fit" htmlFor="lastName">
          <input
            className="peer w-full font-medium text-black rounded-lg border-2 border-neutral-300 overflow-hidden bg-neutral-100 px-3 pt-6 pb-2 text-base placeholder-transparent focus:ring-1 focus:ring-blue-600"
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last Name"
            required
            defaultValue={actionData?.values?.lastName ?? user.lastName}
          />
          <span className="border-l-2 border-transparent absolute left-3 top-2 text-xs font-medium text-neutral-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs">
            Last name
          </span>
          {actionData?.errors.lastName ? (
            <ValidationMessage
              isSubmitting={transition.state === 'submitting'}
              error={actionData?.errors?.lastName}
            />
          ) : null}
        </label>
        <label className="relative block h-fit" htmlFor="callBy">
          <input
            className="peer w-full font-medium text-black rounded-lg border-2 border-neutral-300 overflow-hidden bg-neutral-100 px-3 pt-6 pb-2 text-base placeholder-transparent focus:ring-1 focus:ring-blue-600"
            id="callBy"
            name="callBy"
            type="text"
            placeholder="Call By"
            required
            defaultValue={actionData?.values?.callBy ?? user.firstName}
          />
          <span className="border-l-2 border-transparent absolute left-3 top-2 text-xs font-medium text-neutral-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs">
            Call me by (e.g. nickname)
          </span>
          {actionData?.errors.callBy ? (
            <ValidationMessage
              isSubmitting={transition.state === 'submitting'}
              error={actionData?.errors?.callBy}
            />
          ) : null}
        </label>
        <label className="relative block h-fit" htmlFor="gender">
          <select
            name="gender"
            id="gender"
            placeholder="Gender"
            required
            className="peer w-full font-medium text-black rounded-lg border-2 border-neutral-300 overflow-hidden bg-neutral-100 px-3 pt-6 pb-2 text-base placeholder-transparent focus:ring-1 focus:ring-blue-600"
            defaultValue={actionData?.values?.gender}
          >
            <option value="">Select your gender</option>
            <option value="f">Female</option>
            <option value="m">Male</option>
            <option value="d">Other</option>
            <option value="n">Prefer not to say</option>
          </select>
          <span className="border-l-2 border-transparent absolute left-3 top-2 text-xs font-medium text-neutral-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs">
            Gender
          </span>
          {actionData?.errors.gender ? (
            <ValidationMessage
              isSubmitting={transition.state === 'submitting'}
              error={actionData?.errors?.gender}
            />
          ) : null}
        </label>
        <label className="relative block h-fit" htmlFor="email">
          <input
            className="peer w-full font-medium text-black rounded-lg border-2 border-neutral-300 overflow-hidden bg-neutral-100 px-3 pt-6 pb-2 text-base placeholder-transparent focus:ring-1 focus:ring-blue-600"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
            defaultValue={actionData?.values?.email ?? user.email}
          />
          <span className="border-l-2 border-transparent absolute left-3 top-2 text-xs font-medium text-neutral-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs">
            Email
          </span>
          {actionData?.errors.email ? (
            <ValidationMessage
              isSubmitting={transition.state === 'submitting'}
              error={actionData?.errors?.email}
            />
          ) : null}
        </label>
        <label className="relative block h-fit" htmlFor="phone">
          <input
            className="peer w-full font-medium text-black rounded-lg border-2 border-neutral-300 overflow-hidden bg-neutral-100 px-3 pt-6 pb-2 text-base placeholder-transparent focus:ring-1 focus:ring-blue-600"
            id="phone"
            name="phone"
            type="tel"
            placeholder="Phone"
            required
            defaultValue={actionData?.values?.phone}
          />
          <span className="border-l-2 border-transparent absolute left-3 top-2 text-xs font-medium text-neutral-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs">
            Phone number (WhatsApp)
          </span>
          {actionData?.errors.phone ? (
            <ValidationMessage
              isSubmitting={transition.state === 'submitting'}
              error={actionData?.errors?.phone}
            />
          ) : null}
        </label>
        <label className="relative block h-fit" htmlFor="country">
          <select
            name="country"
            id="country"
            placeholder="Country"
            defaultValue={actionData?.values?.country}
            required
            className="peer w-full font-medium text-black rounded-lg border-2 border-neutral-300 overflow-hidden bg-neutral-100 px-3 pt-6 pb-2 text-base placeholder-transparent focus:ring-1 focus:ring-blue-600"
          >
            <option value="">Select your home country</option>
            {countries.map((country: { alpha2Code: string; name: string }) => (
              <option key={country.alpha2Code} value={country.alpha2Code}>
                {country.name}
              </option>
            ))}
          </select>
          <span className="border-l-2 border-transparent absolute left-3 top-2 text-xs font-medium text-neutral-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs">
            Home country
          </span>
          {actionData?.errors.country ? (
            <ValidationMessage
              isSubmitting={transition.state === 'submitting'}
              error={actionData?.errors?.country}
            />
          ) : null}
        </label>
        <label className="relative block h-fit" htmlFor="university">
          <input
            className="peer w-full font-medium text-black rounded-lg border-2 border-neutral-300 overflow-hidden bg-neutral-100 px-3 pt-6 pb-2 text-base placeholder-transparent focus:ring-1 focus:ring-blue-600"
            id="university"
            name="university"
            type="text"
            required
            defaultValue={actionData?.values?.university}
            placeholder="University"
          />
          <span className="border-l-2 border-transparent absolute left-3 top-2 text-xs font-medium text-neutral-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs">
            Home university
          </span>
          {actionData?.errors.university ? (
            <ValidationMessage
              isSubmitting={transition.state === 'submitting'}
              error={actionData?.errors?.university}
            />
          ) : null}
        </label>
        <label className="relative block h-fit" htmlFor="status">
          <select
            name="status"
            id="status"
            required
            defaultValue={actionData?.values?.status}
            className="peer w-full font-medium text-black rounded-lg border-2 border-neutral-300 overflow-hidden bg-neutral-100 px-3 pt-6 pb-2 text-base placeholder-transparent focus:ring-1 focus:ring-blue-600"
          >
            <option value="">Select your status</option>
            <option value="l">Local student</option>
            <option value="i">International degree student</option>
            <option value="o">Exchange student (started before April)</option>
            <option value="e">Exchange student (starting in April)</option>
          </select>
          <span className="border-l-2 border-transparent absolute left-3 top-2 text-xs font-medium text-neutral-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs">
            Status
          </span>
          {actionData?.errors.status ? (
            <ValidationMessage
              isSubmitting={transition.state === 'submitting'}
              error={actionData?.errors?.status}
            />
          ) : null}
        </label>
        <label className="relative block h-fit" htmlFor="diet">
          <select
            name="diet"
            id="diet"
            required
            defaultValue={actionData?.values?.diet}
            className="peer w-full font-medium text-black rounded-lg border-2 border-neutral-300 overflow-hidden bg-neutral-100 px-3 pt-6 pb-2 text-base placeholder-transparent focus:ring-1 focus:ring-blue-600"
          >
            <option value="none">No restrictions</option>
            <option value="vegetarian">I am vegetarian</option>
            <option value="vegan">I am vegan</option>
          </select>
          <span className="border-l-2 border-transparent absolute left-3 top-2 text-xs font-medium text-neutral-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs">
            Dietary restrictions
          </span>
          {actionData?.errors.diet ? (
            <ValidationMessage
              isSubmitting={transition.state === 'submitting'}
              error={actionData?.errors?.diet}
            />
          ) : null}
        </label>
        <div className="flex items-center">
          <label htmlFor="sectionMember">
            <div className="flex flex-row space-x-2">
              <input
                type="checkbox"
                name="sectionMember"
                id="sectionMember"
                defaultValue={actionData?.values?.sectionMember}
                className="h-6 w-6 rounded-md border border-2 border-gray-300 bg-neutral-100"
                onChange={(event) => setEsnMember(event.target.checked)}
              />
              <span className="font-medium text-black">
                I am a member of an ESN section at home
              </span>
            </div>
            {actionData?.errors.sectionMember ? (
              <ValidationMessage
                isSubmitting={transition.state === 'submitting'}
                error={actionData?.errors?.sectionMember}
              />
            ) : null}
          </label>
        </div>
        <label className="relative block h-fit" htmlFor="esnSection">
          <input
            className="peer w-full font-medium text-black rounded-lg border-2 border-neutral-300 overflow-hidden bg-neutral-100 px-3 pt-6 pb-2 text-base placeholder-transparent focus:ring-1 focus:ring-blue-600 disabled:bg-neutral-200"
            id="esnSection"
            name="esnSection"
            type="text"
            defaultValue={actionData?.values?.esnSection}
            placeholder="ESN Section"
            disabled={!esnMember}
          />
          <span className="border-l-2 border-transparent absolute left-3 top-2 text-xs font-medium text-neutral-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-disabled:text-neutral-400 ">
            My ESN section
          </span>
          {actionData?.errors.esnSection ? (
            <ValidationMessage
              isSubmitting={transition.state === 'submitting'}
              error={actionData?.errors?.esnSection}
            />
          ) : null}
        </label>
        <label className="relative block h-fit" htmlFor="languages">
          <input
            className="peer w-full font-medium text-black rounded-lg border-2 border-neutral-300 overflow-hidden bg-neutral-100 px-3 pt-6 pb-2 text-base placeholder-transparent focus:ring-1 focus:ring-blue-600"
            id="languages"
            name="languages"
            type="text"
            required
            defaultValue={actionData?.values?.languages}
            placeholder="Languages"
          />
          <span className="border-l-2 border-transparent absolute left-3 top-2 text-xs font-medium text-neutral-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs">
            Language skills (incl. level)
          </span>
          {actionData?.errors.languages ? (
            <ValidationMessage
              isSubmitting={transition.state === 'submitting'}
              error={actionData?.errors?.languages}
            />
          ) : null}
        </label>
        <h2 className="mt-8 md:col-span-2 mb-4 text-2xl font-medium leading-tight md:text-4xl md:leading-tight text-black tracking-tight">
          Programme details
        </h2>
        <label className="relative block h-fit" htmlFor="programme">
          <select
            name="programme"
            id="programme"
            required
            defaultValue={actionData?.values?.programme}
            className="peer w-full font-medium text-black rounded-lg border-2 border-neutral-300 overflow-hidden bg-neutral-100 px-3 pt-6 pb-2 text-base placeholder-transparent focus:ring-1 focus:ring-blue-600"
          >
            <option value="">Select your preference</option>
            <option value="pa">Party Animals (€119)</option>
            <option value="cc">Culture Creatures (€89)</option>
            <option value="pa-cc">
              I prefer Party Animals, but am open to join Culture Creatures.
            </option>
            <option value="cc-pa">
              I prefer Culture Creatures, but am open to join Party Animals.
            </option>
          </select>
          <span className="border-l-2 border-transparent absolute left-3 top-2 text-xs font-medium text-neutral-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-disabled:text-neutral-400 ">
            Orientation programme
          </span>
          {actionData?.errors.programme ? (
            <ValidationMessage
              isSubmitting={transition.state === 'submitting'}
              error={actionData?.errors?.programme}
            />
          ) : null}
        </label>
        <label className="relative block h-fit" htmlFor="oldie">
          <select
            name="oldie"
            id="oldie"
            required
            defaultValue={actionData?.values?.oldie}
            className="peer w-full font-medium text-black rounded-lg border-2 border-neutral-300 overflow-hidden bg-neutral-100 px-3 pt-6 pb-2 text-base placeholder-transparent focus:ring-1 focus:ring-blue-600"
          >
            <option value="">Select an option</option>
            <option value="true">Yes, and I need more.</option>
            <option value="false">No, I can't wait to.</option>
          </select>
          <span className="border-l-2 border-transparent absolute left-3 top-2 text-xs font-medium text-neutral-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-disabled:text-neutral-400 ">
            Have you participated before?
          </span>
          {actionData?.errors.oldie ? (
            <ValidationMessage
              isSubmitting={transition.state === 'submitting'}
              error={actionData?.errors?.oldie}
            />
          ) : null}
        </label>
        <label className="relative block" htmlFor="expectations">
          <textarea
            className="peer w-full font-medium text-black rounded-lg border-2 border-neutral-300 overflow-hidden bg-neutral-100 px-3 pt-6 pb-2 text-base placeholder-transparent focus:ring-1 focus:ring-blue-600"
            id="expectations"
            name="expectations"
            rows={4}
            required
            defaultValue={actionData?.values?.expectations}
            placeholder="Expectations"
          />
          <span className="border-l-2 border-transparent absolute left-3 top-2 text-xs font-medium text-neutral-600 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-disabled:text-neutral-400 ">
            My expectations for the programme
          </span>
          {actionData?.errors.expectations ? (
            <ValidationMessage
              isSubmitting={transition.state === 'submitting'}
              error={actionData?.errors?.expectations}
            />
          ) : null}
        </label>
        <label className="relative block" htmlFor="requests">
          <textarea
            className="peer w-full font-medium text-black rounded-lg border-2 border-neutral-300 overflow-hidden bg-neutral-100 px-3 pt-6 pb-2 text-base placeholder-transparent focus:ring-1 focus:ring-blue-600"
            id="requests"
            name="requests"
            rows={4}
            defaultValue={actionData?.values?.requests}
            placeholder="Requests"
          />
          <span className="border-l-2 border-transparent absolute left-3 top-2 text-xs font-medium text-neutral-600 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-disabled:text-neutral-400 ">
            Special requests
          </span>
          {actionData?.errors.requests ? (
            <ValidationMessage
              isSubmitting={transition.state === 'submitting'}
              error={actionData?.errors?.requests}
            />
          ) : null}
        </label>
        <h2 className="mt-8 md:col-span-2 mb-4 text-2xl font-medium leading-tight md:text-4xl md:leading-tight text-black tracking-tight">
          I acknowledge the following
        </h2>
        <label htmlFor="pay">
          <div className="flex flex-row space-x-2">
            <input
              type="checkbox"
              name="pay"
              id="pay"
              required
              defaultValue={actionData?.values?.pay}
              className="h-6 w-6 rounded-md border border-2 border-gray-300 bg-neutral-100"
            />
            <span className="text-black font-medium">
              In understand that once I receive my spot confirmation, I have to
              pay the programme fee (€89 for Culture Creatures or €119 for Party
              Animals) within 24 hours. Otherwise my spot will expire.
            </span>
          </div>

          {actionData?.errors.pay ? (
            <ValidationMessage
              isSubmitting={transition.state === 'submitting'}
              error={actionData?.errors?.pay}
            />
          ) : null}
        </label>
        <label htmlFor="friends">
          <div className="flex flex-row space-x-2">
            <input
              type="checkbox"
              name="friends"
              id="friends"
              required
              defaultValue={actionData?.values?.friends}
              className="h-6 w-6 rounded-md border border-2 border-gray-300 bg-neutral-100"
            />
            <span className="text-black font-medium">
              I understand that I cannot influence which team I will be placed
              in. I am open to meeting people outside of my existing friend
              group.
            </span>
          </div>
          {actionData?.errors.friends ? (
            <ValidationMessage
              isSubmitting={transition.state === 'submitting'}
              error={actionData?.errors?.friends}
            />
          ) : null}
        </label>
        <label htmlFor="refund">
          <div className="flex flex-row space-x-2">
            <input
              type="checkbox"
              name="refund"
              id="refund"
              required
              defaultValue={actionData?.values?.refund}
              className="h-6 w-6 rounded-md border border-2 border-gray-300 bg-neutral-100"
            />
            <span className="text-black font-medium">
              I understand that the participation fee cannot be refunded if my
              spot cannot be replaced. In order to ensure the best experience
              for participants, I cannot resell my participation spot without
              our prior agreement. We will try to accomodate cancellations as
              best as possible.
            </span>
          </div>
          {actionData?.errors.refund ? (
            <ValidationMessage
              isSubmitting={transition.state === 'submitting'}
              error={actionData?.errors?.refund}
            />
          ) : null}
        </label>
        {/* <label htmlFor="vax">
          <div className="flex flex-row space-x-2">
            <input
              type="checkbox"
              name="vax"
              id="vax"
              required
              defaultValue={actionData?.values?.vax}
              className="h-6 w-6 rounded-md border border-2 border-gray-300 bg-neutral-100"
            />
            <span className="text-black font-medium">
              I confirm that I classify as fully vaccinated according to german
              law. You can find out more{' '}
              <a
                className="text-blue-600 underline hover:text-blue-700"
                href="https://www.bmi.bund.de/SharedDocs/faqs/EN/topics/civil-protection/coronavirus/travel-restrictions-border-control/IV-restrictions-applying-to-air-and-sea-travel-outside-of-europe/what-rules-apply-for-fully-vaccinated-people.html"
                target="_blank"
              >
                here
              </a>
            </span>
          </div>
          {actionData?.errors.vax ? (
            <ValidationMessage
              isSubmitting={transition.state === 'submitting'}
              error={actionData?.errors?.vax}
            />
          ) : null}
        </label> */}
        <div className="mt-8 md:col-span-2 flex flex-col space-y-3 w-full md:flex-row md:space-x-4 md:space-y-0">
          <button className="h-fit overflow-hidden inline-block leading-none rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all px-4 py-2 focus:outline-none focus:ring">
            <span className="block font-medium text-lg text-center">
              {transition.state === 'submitting'
                ? 'Getting you started...'
                : 'Begin the journey'}
            </span>
          </button>
        </div>
      </Form>
    </section>
  );
}
