import pluginJsLint from "@eslint/js";
import pluginNext from "@next/eslint-plugin-next";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginTurbo from "eslint-plugin-turbo";
import globals from "globals";
import pluginTsLint from "typescript-eslint";

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  pluginJsLint.configs.recommended,
  ...pluginTsLint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
      },
    },
  },
  {
    plugins: {
      turbo: pluginTurbo,
      "react-hooks": pluginReactHooks,
      "@next/next": pluginNext,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
      "react/react-in-jsx-scope": "off",
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },
  {
    ignores: ["dist", ".next"],
  },
];
