import { GlobeIcon } from "lucide-react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "~/components/ui/select";
import { LANGUAGES } from "~/lib/i18n/resources";
import For from "../utils/for";

export default function SelectLanguage() {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = useCallback(
    (code: string) => {
      i18n.changeLanguage(code);
    },
    [i18n],
  );

  const getLanguageValue = useCallback(() => {
    const languages = Object.entries(LANGUAGES).find(
      ([code]) => code === i18n.language,
    );

    if (languages) {
      const [code, name] = languages;
      return `${name} (${code.toUpperCase()})`;
    }

    return t("Select Language Value");
  }, [t, i18n]);

  return (
    <Select onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[180px]">
        <div className="flex items-center justify-center gap-2">
          <GlobeIcon />
          <span className="text-primary font-medium">{getLanguageValue()}</span>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t("Select Language Label")}</SelectLabel>
          <For each={Object.entries(LANGUAGES)}>
            {([code, name], key) => (
              <SelectItem key={key} value={code}>
                {`${name} (${code.toUpperCase()})`}
              </SelectItem>
            )}
          </For>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
