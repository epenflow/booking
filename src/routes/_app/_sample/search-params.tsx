import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

const searchSchema = z.object({
  page: z.number().default(1),
  filter: z.string().default(""),
  sort: z.enum(["newest", "oldest", "price"]).default("newest"),
});

export const Route = createFileRoute("/_app/_sample/search-params")({
  validateSearch: zodValidator(searchSchema),
  component: RouteComponent,
});

const routerApi = getRouteApi("/_app/_sample/search-params");
function RouteComponent() {
  const r01 = Route.useSearch();
  const r02 = routerApi.useSearch();

  return (
    <main className="min-h-dvh w-full p-4">
      <h1>{JSON.stringify(r01, null, 2)}</h1>
      <h1>{JSON.stringify(r02, null, 2)}</h1>
    </main>
  );
}
