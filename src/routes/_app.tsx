import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import SelectLanguage from "~/components/base/select-language";
import For from "~/components/utils/for";
import { cn } from "~/lib/utils";
import type { FileRouteTypes } from "~/routeTree.gen";

export const Route = createFileRoute("/_app")({
  component: Layout,
});

function Layout() {
  const { t } = useTranslation();

  return (
    <>
      <header className="bg-card sticky top-0 z-50 w-full border-b antialiased">
        <nav className="div relative container flex items-center justify-between border-x p-0">
          <div
            className={cn(
              "bg-border absolute -bottom-1 -left-1 hidden size-2 rotate-45",
              "md:block",
            )}
          />
          <div
            className={cn(
              "bg-border absolute -right-1 -bottom-1 hidden size-2 rotate-45",
              "md:block",
            )}
          />
          <div className="container">
            <div className="text-primary flex h-14 items-center border-x border-dashed px-4">
              <a>Acme</a>
            </div>
          </div>
        </nav>
      </header>

      <div className="w-full border-b py-2">
        <h1 className="paragraph text-primary container text-center">
          {t("notification_label")}
        </h1>
      </div>

      <div
        className={cn(
          "relative flex",
          "before:pattern-diagonal before:min-h-auto before:w-full before:[--diagonal-space:5px]",
          "after:pattern-diagonal after:min-h-auto after:w-full after:[--diagonal-angle:-45deg] after:[--diagonal-space:5px]",
        )}>
        <div className="container shrink-0 border-x">
          <div className="bg-card h-auto border-x border-dashed">
            <Outlet />
          </div>
        </div>
      </div>

      <footer
        className={cn(
          "relative h-auto border-t border-dashed",
          "before:pattern-dot before:pointer-events-none before:absolute before:top-0 before:left-0 before:-z-10 before:h-full before:w-full",
        )}>
        <section className="bg-card relative z-10 container border-x">
          <div className="relative grid grid-cols-12 border-x border-dashed">
            <div className="bg-border absolute -top-1 -left-1 size-2 rotate-45" />
            <div className="bg-border absolute -bottom-1 -left-1 size-2 rotate-45" />
            <div className="bg-border absolute -right-1 -bottom-1 size-2 rotate-45" />
            <div className="bg-border absolute -top-1 -right-1 size-2 rotate-45" />

            <div
              className={cn(
                "relative col-span-full border-b border-dashed px-2 py-8",
                "md:col-span-4 md:border-0 md:p-4",
                "before:bg-border before:absolute before:-bottom-1 before:-left-1 before:size-2 before:rotate-45 before:md:hidden",
                "after:bg-border after:absolute after:-right-1 after:-bottom-1 after:size-2 after:rotate-45 after:md:hidden",
              )}>
              <h1 className="heading-1 text-primary text-start">Acme</h1>
            </div>

            <div
              className={cn(
                "relative col-span-full grid grid-cols-12 grid-rows-4",
                "after:bg-border after:absolute after:top-1/2 after:left-1/2 after:size-2 after:-translate-1/2 after:rotate-45 md:col-span-8 after:lg:hidden",
              )}>
              <For
                each={resources.footers}
                children={(contents, key) => (
                  <div
                    key={key}
                    className={cn(
                      "col-span-6 row-span-2 flex flex-col gap-2 border-dashed px-2 py-4",
                      "md:col-span-6 md:row-span-2",
                      "md:border-l md:p-4",
                      "lg:col-span-3 lg:row-span-full",
                      (key === 0 || key === 1) &&
                        "border-b border-dashed lg:border-b-0",
                      key % 2 && "border-l",
                    )}>
                    <For each={contents}>
                      {(content, subKey) =>
                        content.to ? (
                          <Link
                            to={content.to}
                            key={subKey}
                            className="text-primary text-base">
                            {content.label}
                          </Link>
                        ) : (
                          <h1
                            key={subKey}
                            className="heading-4 text-primary mb-4">
                            {content.label}
                          </h1>
                        )
                      }
                    </For>
                  </div>
                )}
              />
            </div>
          </div>
        </section>

        <section className="bg-background border-t">
          <div className="container grid h-full w-full grid-cols-2 grid-rows-2 py-2">
            <div
              className={cn(
                "col-span-2 row-span-1 row-start-2 flex items-center gap-2",
                "md:col-span-1 md:row-span-2",
              )}>
              <h1 className="text-primary my-0 py-2 text-start text-sm font-medium">
                ©&nbsp;{new Date().getFullYear()}&nbsp;Acme, Inc.
              </h1>
              <ul className="text-primary/80 flex gap-2 text-sm font-medium">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Sitemap</li>
              </ul>
            </div>

            <div
              className={cn(
                "col-span-2 row-span-1 row-start-1 flex items-center justify-start text-sm font-medium",
                "md:col-span-1 md:row-span-2 md:justify-end",
              )}>
              {/* <h1 className="text-primary inline-flex items-center justify-center gap-2 [&_>svg]:size-4">
                <Globe />
                English (US)
              </h1> */}
              <SelectLanguage />
            </div>
          </div>
        </section>
      </footer>
    </>
  );
}

const resources = {
  footers: [
    [
      { label: "Solutions" },
      { label: "Lorem Ipsum", to: "/" },
      { label: "Lorem Ipsum", to: "/" },
      { label: "Lorem Ipsum", to: "/" },
      { label: "Lorem Ipsum", to: "/" },
      { label: "Lorem Ipsum", to: "/" },
      { label: "Lorem Ipsum", to: "/" },
    ],
    [
      { label: "Use Case" },
      { label: "Lorem Ipsum", to: "/" },
      { label: "Lorem Ipsum", to: "/" },
      { label: "Lorem Ipsum", to: "/" },
      { label: "Lorem Ipsum", to: "/" },
    ],
    [
      { label: "Resources" },
      { label: "Lorem Ipsum", to: "/" },
      { label: "Lorem Ipsum", to: "/" },
      { label: "Lorem Ipsum", to: "/" },
      { label: "Lorem Ipsum", to: "/" },
    ],
    [
      { label: "Company" },
      { label: "Lorem Ipsum", to: "/" },
      { label: "Lorem Ipsum", to: "/" },
      { label: "Lorem Ipsum", to: "/" },
      { label: "Lorem Ipsum", to: "/" },
    ],
  ] satisfies Array<
    Array<{ label: string } | { label: string; to: FileRouteTypes["to"] }>
  >,
};
