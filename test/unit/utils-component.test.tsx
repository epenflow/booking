import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import For from "~/components/utils/for";
import LazyLoad from "~/components/utils/lazy-load";

describe("utils component", () => {
  describe("<For/>", () => {
    it("render semua 'each' item dalam array", () => {
      const length = 5;

      render(
        <For
          each={Array.from({ length })}
          children={(_, index) => <h1 key={index}>Data: {index}</h1>}
        />,
      );

      const items = screen.getAllByText((content) =>
        content.startsWith("Data: "),
      );
      items.forEach((item, index) => {
        expect(item.textContent).toContain(`Data: ${index}`);
      });
    });

    it("tidak merender apapun saat 'each' adalah undefined", () => {
      const { container } = render(
        <For each={undefined}>{() => <div></div>}</For>,
      );

      expect(container).toBeEmptyDOMElement();
    });

    it("tidak merender apapun saat 'each' adalah null", () => {
      const { container } = render(<For each={null}>{() => <div></div>}</For>);

      expect(container).toBeEmptyDOMElement();
    });

    it("tidak merender apapun saat 'each' adalah array kosong", () => {
      const { container } = render(<For each={[]}>{() => <div></div>}</For>);

      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("<LazyLoad/>", () => {
    it("menampilkan fallback terlebih dahulu, lalu komponen lazy setelah resolved", async () => {
      const loader = () =>
        Promise.resolve({
          default: () => <h1>Lazy Component</h1>,
        });

      render(<LazyLoad loader={loader} fallback={<h1>Loading...</h1>} />);

      expect(screen.getByText("Loading...")).toBeInTheDocument();

      await screen.findByText("Lazy Component");

      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });
});
