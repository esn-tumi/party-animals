import { ActionFunction, LoaderFunction, redirect } from '@remix-run/node';
import { db } from '~/utils/db.server';
import {
  Group,
  GroupType,
  PaymentStatus,
  Registration,
  Status,
  User,
} from '~/generated/prisma';
import { authenticator } from '~/services/auth.server';
import { getDomainUrl, getStripeSession } from '~/utils/stripe.server';
import { Form, useLoaderData } from '@remix-run/react';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) return redirect('/registration');
  const registration = await db.registration.findFirst({
    where: {
      user: {
        id: user.id,
      },
    },
  });
  if (!registration) return redirect('/registration/form');
  if (registration.registrationStatus !== Status.ACCEPTED)
    return redirect('/registration/status');
  if (registration.paymentStatus !== PaymentStatus.PENDING)
    return redirect('/registration/status/accepted');
  return registration;
};

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const registrationId = data.get('registration');
  if (typeof registrationId !== 'string') {
    console.error('Invalid registration id: not string');
    throw new Error('Invalid registration id');
  }
  const registration = await db.registration.findUnique({
    where: {
      id: registrationId,
    },
    include: { user: true, group: true },
  });
  if (!registration) {
    console.error('Invalid registration id: not found');
    throw new Error('Invalid registration id');
  }
  if (registration.paymentStatus === PaymentStatus.SUCCESS) {
    console.error('Registration already paid');
    throw new Error('Registration already paid');
  }
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    console.error('Not authenticated');
    throw new Error('Not authenticated');
  }
  if (user.id !== registration.userId) {
    console.error('User does not match registration');
    throw new Error('User does not match registration');
  }
  if (!registration.group) {
    console.error('No group found');
    throw new Error('No group found');
  }
  const priceId = (
    registration.group.groupType === GroupType.PA
      ? process.env.PA_PRICE_ID
      : process.env.CC_PRICE_ID
  ) as string;
  const stripeRedirectUrl = await getStripeSession(
    priceId,
    getDomainUrl(request),
    `Party Animals payment for ${user.email}`,
    {
      registrationId,
      userId: user.id,
      userEmail: user.email,
      userName: `${user.firstName} ${user.lastName}`,
    }
  );
  if (!stripeRedirectUrl) {
    console.error('Failed to get stripe session');
    throw new Error('Could not get stripe session');
  }
  return redirect(stripeRedirectUrl);
};

export default function () {
  const registration = useLoaderData<
    Registration & { user: User; group: Group }
  >();
  return (
    <div>
      <p className="font-medium text-base leading-normal md:text-xl md:leading-normal text-red-600 mb-4">
        → You have not paid the participation fee.
      </p>
      <Form method="post">
        <input
          type="hidden"
          defaultValue={registration.id}
          name="registration"
        />
        <div className="flex flex-col md:flex-row">
          <button className="shrink-0 h-fit overflow-hidden inline-block leading-none rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all px-4 py-2 focus:outline-none focus:ring">
            <span className="block font-medium text-lg text-center">
              Start payment
            </span>
          </button>
        </div>
      </Form>
    </div>
  );
}
