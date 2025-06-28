import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import For from "~/components/utils/for";
import queryClient from "~/query-client";

function Example() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      new Promise<Array<{ name: string }>>((resolve) =>
        resolve([{ name: "Test-01" }, { name: "Test-02" }]),
      ),
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <For each={data}>
      {(person) => <h1 key={person.name}>{person.name} </h1>}
    </For>
  );
}

describe("example integration test", () => {
  it("should display the loading state", () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Example />
      </QueryClientProvider>,
    );
    expect(getByText("Loading...")).toBeInTheDocument();
  });

  it("should display the data", async () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Example />
      </QueryClientProvider>,
    );

    await waitFor(() => getByText("Test-01"));
    expect(getByText("Test-01")).toBeInTheDocument();
  });
});
