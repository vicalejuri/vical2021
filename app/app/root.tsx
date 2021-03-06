import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  useMatches,
  Scripts,
  ScrollRestoration,
} from "remix";
import { MetaFunction } from "remix";

import pkg from "../package.json";

export const meta: MetaFunction = () => {
  return {
    title: `${pkg.name}`,
    version: pkg.version,
  };
};

export default function App() {
  const matches = useMatches();

  // If at least one route wants to hydrate, this will return true
  const includeScripts = matches.some((match) => match.handle?.hydrate);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />

        {/* include the scripts, or not! */}
        {includeScripts ? <Scripts /> : null}

        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
