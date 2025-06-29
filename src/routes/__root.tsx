import type { QueryClient } from "@tanstack/react-query";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { StrictMode, type PropsWithChildren } from "react";

import LazyLoad from "~/components/utils/lazy-load";
import globalsCss from "~/globals.css?url";

type RootRouteContext = {
  queryClient: QueryClient;
};
export const Route = createRootRouteWithContext<RootRouteContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Booking",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: globalsCss,
      },
    ],
  }),

  component: () => (
    <RootLayout>
      {import.meta.env.DEV ? (
        <StrictMode>
          <Outlet />
          <LazyLoad
            buttonPosition="bottom-right"
            loader={() =>
              import("@tanstack/react-query-devtools").then(
                ({ ReactQueryDevtools }) => ({ default: ReactQueryDevtools }),
              )
            }
          />
          <LazyLoad
            position="bottom-left"
            loader={() =>
              import("@tanstack/react-router-devtools").then(
                ({ TanStackRouterDevtools }) => ({
                  default: TanStackRouterDevtools,
                }),
              )
            }
          />
        </StrictMode>
      ) : (
        <Outlet />
      )}
    </RootLayout>
  ),
  notFoundComponent: () => (
    <main className="min-h-dvh w-full">
      <p>Not Found</p>
    </main>
  ),
});

function RootLayout({ children }: PropsWithChildren) {
  console.log("<RootLayout/> is SSR : ", import.meta.env.SSR);

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
