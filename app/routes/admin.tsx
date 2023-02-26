import { LoaderFunction, redirect } from '@remix-run/node';
import { NavLink } from '@remix-run/react';
import { authenticator } from '~/services/auth.server';
import { Role } from '~/generated/prisma';
import { Link, Outlet } from '@remix-run/react';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    return redirect('/auth/login');
  }
  if (user.role !== Role.ADMIN) {
    throw new Error('You are not authorized to access this page');
  }
  return null;
};

export default function AdminFrame() {
  return (
    <>
      <nav className="px-2 overflow-x-scroll mt-2 md:mt-4 w-full md:w-fit md:mx-auto h-fit">
        <ul className="mx-auto w-fit flex flex-row items-center text-sm font-medium text-neutral-600">
          <li className="shrink-0">
            <NavLink
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 hover:text-black transition-all ${
                  isActive ? 'text-black bg-neutral-200' : ''
                }`
              }
              to="registrations"
            >
              Registrations
            </NavLink>
          </li>
          <li className="shrink-0">
            <NavLink
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 hover:text-black transition-all ${
                  isActive ? 'text-black bg-neutral-200' : ''
                }`
              }
              to="groups"
            >
              Groups
            </NavLink>
          </li>
          <li className="shrink-0">
            <NavLink
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 hover:text-black transition-all ${
                  isActive ? 'text-black bg-neutral-200' : ''
                }`
              }
              to="assignments"
            >
              Assignments
            </NavLink>
          </li>
          <li className="shrink-0">
            <NavLink
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 hover:text-black transition-all ${
                  isActive ? 'text-black bg-neutral-200' : ''
                }`
              }
              to="genetic"
            >
              Genetics
            </NavLink>
          </li>
          <li className="shrink-0">
            <NavLink
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 hover:text-black transition-all ${
                  isActive ? 'text-black bg-neutral-200' : ''
                }`
              }
              to="status-board"
            >
              Status Board
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
