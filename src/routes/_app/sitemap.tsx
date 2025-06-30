import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/sitemap")({
  component: Page,
});

function Page() {
  return (
    <div>
      <p className="paragraph">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
        recusandae reprehenderit nulla ut excepturi accusantium vel sapiente
        deleniti voluptatibus aliquid beatae nisi obcaecati eius reiciendis
        incidunt, aspernatur quos animi! Minima.
      </p>
      <p className="paragraph">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
        recusandae reprehenderit nulla ut excepturi accusantium vel sapiente
        deleniti voluptatibus aliquid beatae nisi obcaecati eius reiciendis
        incidunt, aspernatur quos animi! Minima.
      </p>
    </div>
  );
}
