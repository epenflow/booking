import type { NAMESPACE, resources } from "./lib/i18n";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof NAMESPACE;
    resources: typeof resources.en;
  }
}
