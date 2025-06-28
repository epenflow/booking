import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "test/e2e/**/*.{test,spec}.{ts,tsx}",
    supportFile: false,
  },
});
