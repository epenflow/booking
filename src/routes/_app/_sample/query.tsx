import { faker } from "@faker-js/faker";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import For from "~/components/utils/for";
import { cn } from "~/lib/utils";

type Person = {
  name: string;
  number: string;
  address: string;
  avatar: string;
};
const personsQueryOptions = queryOptions({
  queryKey: ["posts"],
  queryFn: () => {
    const persons: Array<Person> = [];

    for (let index = 0; index < 5; index++) {
      const person: Person = {
        name: faker.person.fullName(),
        address: faker.location.streetAddress(),
        number: faker.phone.number({ style: "national" }),
        avatar: faker.image.avatar(),
      };
      persons.push(person);
    }

    return new Promise<Person[]>((resolve) => resolve(persons));
  },
});

export const Route = createFileRoute("/_app/_sample/query")({
  component: Page,
  loader({ context }) {
    context.queryClient.ensureQueryData(personsQueryOptions);
  },
});

function Page() {
  const { data: persons } = useSuspenseQuery(personsQueryOptions);

  return (
    <main className={cn("min-h-dvh w-full p-2", "md:p-4")}>
      <For each={persons}>
        {(person, key) => (
          <div
            key={key}
            className={cn(
              "bg-card flex h-auto w-full max-w-md justify-between gap-4 p-4",
              "shadow-[0px_0px_0px_1px_var(--border)]",
            )}>
            <div className="text-primary line-clamp-1 space-y-2 text-sm">
              <h1 className="heading-4">{person.name}</h1>
              <h1>{person.address}</h1>
              <h1>{person.number}</h1>
            </div>
            <div
              style={{ "--avatar": `url("${person.avatar}")` } as CSSProperties}
              className="size-32 rounded-full border [background-image:var(--avatar)] bg-cover bg-center bg-no-repeat md:size-48"
            />
          </div>
        )}
      </For>
    </main>
  );
}
