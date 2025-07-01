import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { NAMESPACE } from "./helpers";
import resources from "./resources";

import de from "./locales/de";
import en from "./locales/en";
import es from "./locales/es";
import fr from "./locales/fr";
import id from "./locales/id";
import ja from "./locales/ja";
import ru from "./locales/ru";
import zh from "./locales/zh";

export * from "./helpers";
export { de, en, es, fr, id, ja, resources, ru, zh };

export default i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  defaultNS: NAMESPACE,
  interpolation: {
    escapeValue: false,
  },
});
