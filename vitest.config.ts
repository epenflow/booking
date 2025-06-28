import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

const TEST_CONFIGS = {
  environment: "jsdom",
  setupFiles: ["./vitest.setup.ts"],
  root: "./",
  alias: {
    "~": path.resolve(__dirname, "./src"),
  },
};

export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      {
        test: {
          ...TEST_CONFIGS,
          name: "unit",
          include: ["test/unit/**/*.{test,spec}.{ts,tsx}"],
        },
      },
      {
        test: {
          ...TEST_CONFIGS,
          name: "integration",
          include: ["test/integration/**/*.{test,spec}.{ts,tsx}"],
        },
      },
    ],
  },
});
