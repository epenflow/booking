describe("example e2e test", () => {
  it("should visit the homepage", () => {
    cy.visit("/");
    cy.contains("h1", "Acme");
  });
});
