import type { Resources } from "./helpers";
import de from "./locales/de";
import en from "./locales/en";
import es from "./locales/es";
import fr from "./locales/fr";
import id from "./locales/id";
import ja from "./locales/ja";
import ru from "./locales/ru";
import zh from "./locales/zh";

// prettier-ignore
export default {  en,  fr,  id,  es,  ja,  de,  ru,  zh,} satisfies Resources<typeof en>;
