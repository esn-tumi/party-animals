// import { Price } from '@tumi/shared/data-types';
import {
  PrismaClient,
  RegistrationMode,
  RegistrationStatus,
  RegistrationType,
} from '../generated/prisma';
import * as stripe from 'stripe';
import { GetGen } from 'nexus/dist/typegenTypeHelpers';
import { DateTime } from 'luxon';
import prisma from '../client';

export class RegistrationService {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  private static stripe: stripe.Stripe = require('stripe')(
    process.env['STRIPE_KEY']
  );

  public static async registerWithCode(
    context: GetGen<'context'>,
    registrationCodeId: string,
    userId: string,
    price: any,
    cancelUrl?: string,
    successUrl?: string
  ): Promise<any> {
    const registrationCode = await prisma.eventRegistrationCode.findUnique({
      where: { id: registrationCodeId },
      include: { targetEvent: true },
    });
    if (
      registrationCode?.targetEvent?.registrationMode ===
      RegistrationMode.STRIPE
    ) {
      const payment = await this.createPayment(
        context,
        [
          {
            amount: price.amount * 100,
            currency: 'EUR',
            quantity: 1,
            name: registrationCode.targetEvent.title,
            tax_rates: ['txr_1KFJcK4EBOHRwndErPETnHSR'],
            description: 'Registration code fee for event',
          },
        ],
        'book',
        cancelUrl ?? '',
        successUrl ?? '',
        userId,
        registrationCode.sepaAllowed
      );
      const registration = await prisma.eventRegistration.create({
        data: {
          event: { connect: { id: registrationCode.targetEvent.id } },
          user: { connect: { id: userId } },
          payment: { connect: { id: payment.id } },
          status: RegistrationStatus.PENDING,
          type: RegistrationType.PARTICIPANT,
          eventRegistrationCode: { connect: { id: registrationCode.id } },
        },
      });
      return prisma.eventRegistrationCode.update({
        where: { id: registrationCodeId },
        data: {
          registrationCreatedId: registration.id,
          paymentId: payment.id,
        },
      });
    } else if (
      registrationCode?.targetEvent?.registrationMode ===
      RegistrationMode.ONLINE
    ) {
      const newRegistration = await prisma.eventRegistration.create({
        data: {
          user: { connect: { id: userId } },
          event: { connect: { id: registrationCode.eventId } },
          status: RegistrationStatus.SUCCESSFUL,
          type: RegistrationType.PARTICIPANT,
        },
      });
      if (registrationCode.registrationToRemoveId) {
        await prisma.eventRegistration.update({
          where: { id: registrationCode.registrationToRemoveId },
          data: {
            status: RegistrationStatus.CANCELLED,
            cancellationReason: `Registration taken over by code`,
          },
        });
      }
      return prisma.eventRegistrationCode.update({
        where: { id: registrationCodeId },
        data: {
          status: RegistrationStatus.SUCCESSFUL,
          registrationCreatedId: newRegistration.id,
        },
      });
    }
  }

  public static async createPayment(
    context: GetGen<'context'>,
    items: Array<stripe.Stripe.Checkout.SessionCreateParams.LineItem>,
    submitType: stripe.Stripe.Checkout.SessionCreateParams.SubmitType,
    cancelUrl: string,
    successUrl: string,
    userId: string,
    allowSepa = false
  ) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        tenants: {
          where: { tenantId: context.tenant.id },
          include: { stripeData: true },
        },
      },
    });
    let customerId;
    // TODO: Check all ?. uses
    if (!user?.tenants[0].stripeData) {
      const customer = await this.stripe.customers.create({
        name: `${user?.firstName} ${user?.lastName}`,
        email: user?.email,
        metadata: { userId: user?.id ?? '', tenantId: context.tenant.id },
      });
      await prisma.stripeUserData.create({
        data: {
          usersOfTenantsTenantId: context.tenant.id,
          usersOfTenantsUserId: userId,
          customerId: customer.id,
        },
      });
      customerId = customer.id;
    } else {
      customerId = user.tenants[0].stripeData.customerId;
    }
    const payment_method_types: stripe.Stripe.Checkout.SessionCreateParams.PaymentMethodType[] =
      [
        'card',
        // 'sofort',
        'giropay',
        'ideal',
        'p24',
        'bancontact',
      ];
    if (allowSepa) {
      payment_method_types.push('sepa_debit');
    }
    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      customer: customerId,
      line_items: items,
      payment_method_types,
      payment_intent_data: {
        description: `Fee for: ${items.map((item) => item.name).join(',')}`,
      },
      submit_type: submitType,
      cancel_url: cancelUrl,
      success_url: successUrl,
      expires_at: Math.round(DateTime.now().plus({ hours: 1 }).toSeconds()),
    });
    const payment = prisma.stripePayment.create({
      data: {
        user: { connect: { id: userId } },
        amount: session.amount_total ?? 0,
        paymentIntent:
          typeof session.payment_intent === 'string'
            ? session.payment_intent
            : session.payment_intent?.id || '',
        checkoutSession: session.id,
        status: 'incomplete',
        events: [
          { type: 'payment_intent.created', name: 'created', date: Date.now() },
        ],
      },
    });
    return payment;
  }

  static async registerOnEvent(
    context: GetGen<'context'>,
    prisma: PrismaClient,
    eventId: string,
    userId: string,
    registrationType: RegistrationType,
    submissions: any,
    // TODO: bring back price
    price?: any,
    cancelUrl?: string,
    successUrl?: string
  ) {
    const event = await prisma.tumiEvent.findUnique({ where: { id: eventId } });
    if (
      event?.registrationMode === RegistrationMode.STRIPE &&
      registrationType === RegistrationType.PARTICIPANT
    ) {
      const payment = await this.createPayment(
        context,
        [
          {
            amount: price.amount * 100,
            quantity: 1,
            currency: 'EUR',
            name: event.title,
            tax_rates: ['txr_1KFJcK4EBOHRwndErPETnHSR'],
            description: 'Registration fee for event',
          },
        ],
        'book',
        cancelUrl ?? '',
        successUrl ?? '',
        userId
      );
      // const submissionArray = [];
      // if (submissions) {
      //   Object.entries(submissions).forEach(([key, value]) => {
      //     submissionArray.push({
      //       submissionItem: { connect: { id: key } },
      //       data: { value },
      //     });
      //   });
      // }
      // await prisma.eventRegistration.create({
      //   data: {
      //     user: { connect: { id: userId } },
      //     event: { connect: { id: eventId } },
      //     status: RegistrationStatus.PENDING,
      //     type: registrationType,
      //     payment: { connect: { id: payment.id } },
      //     submissions: {
      //       create: submissionArray,
      //     },
      //   },
      // });
      return event;
    } else if (
      event?.registrationMode === RegistrationMode.ONLINE ||
      registrationType === RegistrationType.ORGANIZER
    ) {
      const submissionArray: any[] = [];
      if (submissions) {
        Object.entries(submissions).forEach(([key, value]) => {
          submissionArray.push({
            submissionItem: { connect: { id: key } },
            data: { value },
          });
        });
      }
      await prisma.eventRegistration.create({
        data: {
          user: { connect: { id: userId } },
          event: { connect: { id: eventId } },
          status: RegistrationStatus.SUCCESSFUL,
          type: registrationType,
          submissions: {
            create: submissionArray,
          },
        },
      });
      return event;
    } else {
      throw new Error('Registration mode not supported');
    }
  }

  static async cancelRegistration(
    registrationId: string,
    withRefund: boolean,
    isKick: boolean,
    context: GetGen<'context'>
  ) {
    const registration = await context.prisma.eventRegistration.findUnique({
      where: { id: registrationId },
      include: { event: true },
    });
    if (!registration) {
      throw new Error('Registration not found');
    }
    if (registration.event.registrationMode === RegistrationMode.STRIPE) {
      if (withRefund) {
        const payment = await context.prisma.stripePayment.findUnique({
          where: { id: registration.paymentId ?? '' },
        });
        if (!payment) {
          throw new Error('Payment not found');
        }
        await this.stripe.refunds.create({
          payment_intent: payment.paymentIntent,
        });
      }
      await context.prisma.eventRegistration.update({
        where: { id: registrationId },
        data: {
          status: RegistrationStatus.CANCELLED,
          cancellationReason: isKick
            ? 'Cancelled by admin'
            : 'Spot given up by user',
        },
      });
    } else if (
      registration.event.registrationMode === RegistrationMode.ONLINE
    ) {
      await context.prisma.eventRegistration.update({
        where: { id: registrationId },
        data: {
          status: RegistrationStatus.CANCELLED,
          cancellationReason: 'Spot given up by user',
        },
      });
    } else {
      throw new Error('Registration mode not supported');
    }
    return registration.event;
  }
}
