import { createRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";

import queryClient from "~/query-client";
import { routeTree } from "~/routeTree.gen";

export default function router() {
  return routerWithQueryClient(
    createRouter({
      routeTree,
      context: {
        queryClient: queryClient,
      },
      scrollRestoration: true,
      defaultPreload: "intent",
      defaultPreloadStaleTime: 0,
    }),
    queryClient,
  );
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof router>;
  }
}
