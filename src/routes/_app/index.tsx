// Test push: menambah komentar untuk cek workflow
import { createFileRoute, Link } from "@tanstack/react-router";
import { cn } from "~/lib/utils";

export const Route = createFileRoute("/_app/")({
  component: Page,
});

function Page() {
  return (
    <main
      className={cn(
        "flex h-auto flex-col",
        "[&_div]:pattern-diagonal [&_div]:[--diagonal-angle:35deg] [&_div]:[--diagonal-space:15px] [&_div:nth-child(even)]:[--diagonal-background:--alpha(theme(--color-orange-600)_/_50%)] [&_div:nth-child(odd)]:[--diagonal-background:--alpha(theme(--color-indigo-600)_/_50%)]",
      )}>
      <section className={cn("min-h-[50dvh] p-2", "md:p-4")}>
        <h1 className="heading-4 text-primary text-start">Sample : </h1>
        <section className="flex flex-col gap-2">
          <Link to="/query">Suspense useQuery</Link>
          <Link to="/search-params">Search Params</Link>
        </section>
      </section>

      <section className="grid h-full min-h-dvh grid-cols-12 border-b border-dashed">
        <div
          className={cn("col-span-12 border-r border-dashed", "md:col-span-8")}
        />
        <div className={cn("col-span-12", "md:col-span-4")} />
      </section>

      <section className="grid h-full min-h-dvh grid-cols-12 border-b border-dashed">
        <div
          className={cn("col-span-12 border-r border-dashed", "md:col-span-4")}
        />
        <div className={cn("col-span-12", "md:col-span-8")} />
      </section>
    </main>
  );
}
