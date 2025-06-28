// Test push: menambah komentar untuk cek workflow
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
  component: Page,
});

function Page() {
  return (
    <main className="flex h-auto flex-col [&_div]:[--diagonal-angle:35deg] [&_div]:[--diagonal-space:15px] [&_div:nth-child(even)]:[--diagonal-background:--alpha(theme(--color-orange-600)_/_50%)] [&_div:nth-child(odd)]:[--diagonal-background:--alpha(theme(--color-indigo-600)_/_50%)]">
      <section className="[&_div]:pattern-diagonal grid h-full min-h-dvh grid-cols-12 border-b border-dashed">
        <div className="col-span-12 border-r border-dashed md:col-span-8" />
        <div className="col-span-12 md:col-span-4" />
      </section>

      <section className="[&_div]:pattern-diagonal grid h-full min-h-dvh grid-cols-12 [&_div]:shadow-xs [&_div]:[--diagonal-space:5px]">
        <div className="col-span-12 border-r border-dashed md:col-span-4" />
        <div className="col-span-12 md:col-span-8" />
      </section>
    </main>
  );
}
