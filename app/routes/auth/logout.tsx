import { LoaderFunction } from "@remix-run/node";
import { authenticator } from '~/services/auth.server';

export let loader: LoaderFunction = ({ request }) => {
  return authenticator.logout(request, {
    redirectTo: `https://auth.esn.world/v2/logout?client_id=BDYrE7BvffqlpP6kFI988qYXK6yamV1m`,
  });
};
