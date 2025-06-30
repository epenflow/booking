import resources, { NAMESPACES } from "~/lib/i18n/resources";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof NAMESPACES;
    resources: typeof resources.en;
  }
}
