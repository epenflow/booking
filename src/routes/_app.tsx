import { createFileRoute, Outlet } from "@tanstack/react-router";
import For from "~/components/utils/for";
import { cn } from "~/lib/utils";

export const Route = createFileRoute("/_app")({
  component: Layout,
});

function Layout() {
  return (
    <>
      <header className="bg-card sticky top-0 z-50 w-full border-b antialiased">
        <nav className="div relative container flex items-center justify-between border-x p-0">
          <div className="bg-border absolute -bottom-1 -left-1 hidden size-2 rotate-45 md:block" />
          <div className="bg-border absolute -right-1 -bottom-1 hidden size-2 rotate-45 md:block" />
          <div className="container">
            <div className="flex h-14 items-center border-x border-dashed px-4">
              <a>Acme</a>
            </div>
          </div>
        </nav>
      </header>

      <div className="w-full border-b py-2">
        <h1 className="text-paragraph container text-center">
          Notifications🚀
        </h1>
      </div>

      <div className="before:pattern-diagonal after:pattern-diagonal relative flex before:min-h-auto before:w-full before:[--diagonal-space:5px] after:min-h-auto after:w-full after:[--diagonal-angle:-45deg] after:[--diagonal-space:5px]">
        <div className="container shrink-0 border-x">
          <div className="bg-card h-auto border-x border-dashed">
            <Outlet />
          </div>
        </div>
      </div>

      <footer className="before:pattern-dot relative h-auto border-t border-dashed before:absolute before:top-0 before:left-0 before:h-full before:w-full">
        <div className="bg-card relative z-10 container border-x">
          <div className="relative grid grid-cols-12 border-x border-dashed">
            <div className="bg-border absolute -top-1 -left-1 size-2 rotate-45" />
            <div className="bg-border absolute -bottom-1 -left-1 size-2 rotate-45" />
            <div className="bg-border absolute -right-1 -bottom-1 size-2 rotate-45" />
            <div className="bg-border absolute -top-1 -right-1 size-2 rotate-45" />

            <div className="before:bg-border after:bg-border relative col-span-full border-b border-dashed px-2 py-8 before:absolute before:-bottom-1 before:-left-1 before:size-2 before:rotate-45 after:absolute after:-right-1 after:-bottom-1 after:size-2 after:rotate-45 md:col-span-4 md:border-0 md:p-8 before:md:hidden after:md:hidden">
              <h1 className="text-heading-1 text-start">Acme</h1>
            </div>

            <div className="after:bg-border relative col-span-full grid grid-cols-12 grid-rows-4 after:absolute after:top-1/2 after:left-1/2 after:size-2 after:-translate-1/2 after:rotate-45 md:col-span-8 after:lg:hidden">
              <For
                each={resources.footers}
                children={(contents, key) => (
                  <div
                    key={key}
                    className={cn(
                      "col-span-6 row-span-2 space-y-2 border-dashed px-2 py-4 md:col-span-6 md:row-span-2 lg:col-span-3 lg:row-span-full",
                      "md:border-l md:p-4",
                      (key === 0 || key === 1) &&
                        "border-b border-dashed lg:border-b-0",
                      key % 2 && "border-l",
                    )}>
                    <For each={contents}>
                      {(content, subKey) => (
                        <div key={subKey}>
                          <h1
                            className={cn(
                              content.href
                                ? "text-paragraph"
                                : "text-heading-4 mb-2 md:mb-4",
                            )}>
                            {content.label}
                          </h1>
                        </div>
                      )}
                    </For>
                  </div>
                )}
              />
            </div>
          </div>
        </div>

        <div className="bg-background relative flex h-full w-full items-center justify-center border-t">
          <h1 className="text-paragraph my-0 py-2 text-center">
            Acme.Inc©{new Date().getFullYear()}
          </h1>
        </div>
      </footer>
    </>
  );
}

const resources = {
  footers: [
    [
      { label: "Solutions" },
      { label: "Lorem Ipsum", href: "#" },
      { label: "Lorem Ipsum", href: "#" },
      { label: "Lorem Ipsum", href: "#" },
      { label: "Lorem Ipsum", href: "#" },
      { label: "Lorem Ipsum", href: "#" },
      { label: "Lorem Ipsum", href: "#" },
    ],
    [
      { label: "Use Case" },
      { label: "Lorem Ipsum", href: "#" },
      { label: "Lorem Ipsum", href: "#" },
      { label: "Lorem Ipsum", href: "#" },
      { label: "Lorem Ipsum", href: "#" },
    ],
    [
      { label: "Resources" },
      { label: "Lorem Ipsum", href: "#" },
      { label: "Lorem Ipsum", href: "#" },
      { label: "Lorem Ipsum", href: "#" },
      { label: "Lorem Ipsum", href: "#" },
    ],
    [
      { label: "Company" },
      { label: "Lorem Ipsum", href: "#" },
      { label: "Lorem Ipsum", href: "#" },
      { label: "Lorem Ipsum", href: "#" },
      { label: "Lorem Ipsum", href: "#" },
    ],
  ] satisfies Array<Array<{ label: string } | { label: string; href: string }>>,
};
