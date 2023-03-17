import { ActionFunction, LoaderFunction, redirect } from '@remix-run/node';
import { authenticator } from '~/services/auth.server';
import { Group, GroupType, Role } from '~/generated/prisma';
import { db } from '~/utils/db.server';
import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from '@remix-run/react';
import { ValidationMessage } from '~/components/ValidationMessage';
import countries from '~/utils/countries.json';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    return redirect('/auth/login');
  }
  if (user.role !== Role.ADMIN) {
    throw new Error('You are not authorized to view this page');
  }
  // const countries = fetch(
  //   'https://restcountries.com/v2/all?fields=name,alpha2Code,flags'
  // ).then((res) => res.json());
  const registrations = db.registration.findMany({
    include: { user: true },
    orderBy: { createdAt: 'asc' },
  });
  const groups = db.group.findMany({
    orderBy: { name: 'asc' },
  });
  return Promise.all([groups, registrations, countries]);
};

export const action: ActionFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    return redirect('/auth/login');
  }
  if (user.role !== Role.ADMIN) {
    throw new Error(
      `Only Admins are allowed to change this! You are ${user.role}`
    );
  }
  const data = await request.formData();
  const name = data.get('name');
  const groupType = data.get('groupType') as GroupType;
  const errors: { [key: string]: string } = {};
  if (typeof name !== 'string' || name.length < 3) {
    errors.firstName = 'The name must be at least 3 characters long';
    const values = Object.fromEntries(data);
    return { errors, values };
  } else if (!Object.values(GroupType).includes(groupType)) {
    errors.groupType = 'Please select a valid group type';
    const values = Object.fromEntries(data);
    return { errors, values };
  } else {
    const group = await db.group.create({ data: { name, groupType } });
    return { group };
  }
};

export default function AdminGroups() {
  const [groups, registrations, countries] =
    useLoaderData<[Group[], any, any]>();
  const transition = useTransition();
  const actionData = useActionData();
  return (
    <main className="px-2 md:px-8">
      {groups.length !== 0 && (
        <section className="text-white bg-black min-w-fit rounded-md md:rounded-lg overflow-hidden p-8 md:p-12 m-auto my-2 md:my-8">
          <h1 className="mb-4 md:mb-6 text-2xl font-medium leading-2 md:text-4xl md:leading-none tracking-tight">
            Groups
          </h1>
          <div className="flex flex-wrap gap-4 w-full">
            {groups.map((group) => (
              <div
                className="shrink-0 bg-blue-200 px-4 py-2 rounded-full"
                key={group.id}
              >
                <span className="text-black font-medium">
                  {group.name} ({group.groupType})
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
      <section className="bg-neutral-200 p-8 md:p-12 text-black my-2 md:my-8 rounded-[2.25rem] md:rounded-[3rem]">
        <Form method="post">
          <h2 className="mb-4 md:mb-6 text-2xl font-medium leading-2 md:text-4xl md:leading-none tracking-tight">
            Create Group
          </h2>
          <div className="flex flex-col gap-2 md:flex-row md:gap-4 w-full items-center">
            <label className="relative block w-full h-fit" htmlFor="lastName">
              <input
                className="peer w-full font-medium text-black rounded-lg border-2 border-neutral-300 overflow-hidden bg-neutral-100 px-3 pt-6 pb-2 text-base placeholder-transparent focus:ring-1 focus:ring-blue-600"
                id="name"
                name="name"
                type="text"
                placeholder="Group name"
                required
                defaultValue={actionData?.values?.name}
              />
              <span className="border-l-2 border-transparent absolute left-3 top-2 text-xs font-medium text-neutral-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs">
                Group name
              </span>
              {actionData?.errors?.name ? (
                <ValidationMessage
                  isSubmitting={transition.state === 'submitting'}
                  error={actionData?.errors?.name}
                />
              ) : null}
            </label>
            <label className="relative block w-full h-fit" htmlFor="groupType">
              <select
                name="groupType"
                id="groupType"
                required
                defaultValue={actionData?.values?.groupType}
                className="peer w-full font-medium text-black rounded-lg border-2 border-neutral-300 overflow-hidden bg-neutral-100 px-3 pt-6 pb-2 text-base placeholder-transparent focus:ring-1 focus:ring-blue-600"
              >
                <option value="">Select a type</option>
                <option value={GroupType.PA}>Party Animals</option>
                <option value={GroupType.CC}>Culture Creatures</option>
              </select>
              <span className="border-l-2 border-transparent absolute left-3 top-2 text-xs font-medium text-neutral-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-disabled:text-neutral-400 ">
                Group type
              </span>
              {actionData?.errors?.groupType ? (
                <ValidationMessage
                  isSubmitting={transition.state === 'submitting'}
                  error={actionData?.errors?.groupType}
                />
              ) : null}
            </label>
            <button className="w-full md:w-fit shrink-0 h-fit overflow-hidden inline-block leading-none rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all px-4 py-2 focus:outline-none focus:ring">
              <span className="block font-medium text-lg text-center">
                Create Group
              </span>
            </button>
          </div>
          {/*<label
            className="relative block rounded-lg border-2 border-gray-200 p-3"
            htmlFor="lastName"
          >
            <input
              className="peer w-full border-none bg-transparent px-0 pt-3.5 pb-0 text-sm placeholder-transparent focus:ring-0"
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              required
              defaultValue={actionData?.values?.lastName}
            />
            <span className="absolute left-3 -translate-y-1/3 text-xs font-medium text-gray-200 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:-translate-y-1/3 peer-focus:text-xs">
              Last name
            </span>
            {actionData?.errors.lastName ? (
              <ValidationMessage
                isSubmitting={transition.state === 'submitting'}
                error={actionData?.errors?.lastName}
              />
            ) : null}
          </label>*/}
        </Form>
      </section>
    </main>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <div className="w-full max-w-7xl m-auto px-2 md:px-8">
      <div className="bg-red-200 my-2 md:my-8 rounded-[2.25rem] md:rounded-[3rem] overflow-hidden">
        <div className="max-w-4xl px-8 py-12 md:p-12">
          <h1 className="text-red-600 mb-6 text-4xl font-medium leading-2 md:text-6xl md:leading-none tracking-tight">
            Error
          </h1>

          <p className="mb-6 font-normal text-base leading-normal md:text-xl md:leading-normal text-neutral-600">
            Oops! We had a problem. You can try refreshing the page or contact
            us at{' '}
            <a
              href="mailto:party.animals@esn-tumi.de"
              className="underline text-blue-600 transition-all hover:text-blue-700"
            >
              party.animals@esn-tumi.de
            </a>
            . Please send the following error message along with your request:
          </p>

          <pre className="select-all blackspace-pre-wrap text-sm text-black">
            {error.message}
          </pre>
        </div>
      </div>
    </div>
  );
}
