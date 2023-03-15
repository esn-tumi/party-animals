import { Registration, User } from '~/generated/prisma';
import v8n from 'v8n';
import { db } from '~/utils/db.server';

function validateRegistration(data: FormData): { [key: string]: string } {
  const errors: { [key: string]: string } = {};
  if (!v8n().string().minLength(2).maxLength(50).test(data.get('firstName'))) {
    errors.firstName = 'First name must be at least 2 characters long';
  }
  if (!v8n().string().minLength(2).maxLength(50).test(data.get('lastName'))) {
    errors.lastName = 'Last name must be at least 2 characters long';
  }
  if (
    !v8n()
      .optional(v8n().string().minLength(2).maxLength(50))
      .test(data.get('callBy'))
  ) {
    errors.callBy = 'Nickname must be at least 2 characters long';
  }
  if (
    !v8n()
      .string()
      .length(1)
      .pattern(/f|m|d|n/)
      .test(data.get('gender'))
  ) {
    errors.gender = 'Select a value from the dropdown';
  }
  if (
    !v8n()
      .string()
      .includes('@')
      .minLength(3)
      .maxLength(50)
      .test(data.get('email'))
  ) {
    errors.email = 'Enter a valid email address';
  }
  if (
    !v8n()
      .string()
      .minLength(3)
      .maxLength(50)
      .pattern(/[+][0-9]+/)
      .test(data.get('phone'))
  ) {
    errors.phone = 'Enter a valid number in the format +1234567890';
  }
  if (!v8n().string().length(2).test(data.get('country'))) {
    errors.country = 'Select a country from the dropdown';
  }
  if (!v8n().string().minLength(3).maxLength(50).test(data.get('university'))) {
    errors.university = 'Enter a valid university name';
  }
  if (
    !v8n()
      .string()
      .length(1)
      .pattern(/l|i|o|e/)
      .test(data.get('status'))
  ) {
    errors.status = 'Select a status from the list';
  }
  if (!v8n().string().test(data.get('diet'))) {
    errors.diet = 'Select a diet preference from the list';
  }
  if (!v8n().string().test(data.get('programme'))) {
    errors.programme = 'Select a preference from the list';
  }
  if (
    !v8n()
      .string()
      .pattern(/true|false/)
      .test(data.get('oldie'))
  ) {
    errors.oldie = 'Please indicate if you took part before';
  }
  if (
    !v8n().string().minLength(10).maxLength(300).test(data.get('expectations'))
  ) {
    errors.expectations = 'Please type 10 to 300 characters';
  }
  if (!v8n().not.null().test(data.get('pay'))) {
    errors.pay = 'Please accept this statement';
  }
  if (!v8n().not.null().test(data.get('friends'))) {
    errors.friends = 'Please accept this statement';
  }
  if (!v8n().not.null().test(data.get('refund'))) {
    errors.refund = 'Please accept this statement';
  }
  return errors;
}

export async function createRegistration(
  data: FormData,
  user: User
): Promise<[{ [key: string]: string }, Registration | null]> {
  const errors = validateRegistration(data);
  if (Object.keys(errors).length > 0) {
    return [errors, null];
  }
  const values = Object.fromEntries(data);
  await db.user.update({
    where: { id: user.id },
    data: {
      firstName: values.firstName.toString(),
      lastName: values.lastName.toString(),
      email: values.email.toString(),
    },
  });
  const existingRegistration = await db.registration.findFirst({
    where: { user: { id: user.id } },
  });
  if (existingRegistration) {
    return [
      {
        form: 'It seems like you have already submitted a registration. Please reach out to us if you think this is an error.',
      },
      null,
    ];
  }
  const registration = await db.registration.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },
      callBy: values.callBy.toString(),
      gender: values.gender.toString(),
      phone: values.phone.toString(),
      country: values.country.toString(),
      university: values.university.toString(),
      status: values.status.toString(),
      diet: values.diet.toString(),
      esnSection: values.esnSection?.toString() ?? null,
      languages: values.languages?.toString() ?? null,
      programme: values.programme.toString(),
      oldie: values.oldie.toString() === 'true',
      expectations: values.expectations.toString(),
      requests: values.requests?.toString() ?? null,
    },
  });
  return [{}, registration];
}
