// prettier-ignore
export const LANGUAGES_CODE = ["en","fr","id","es","ja","de","ru","zh",] as const;
export const NAMESPACE = ["ns1", "speech"] as const;
export const LANGUAGES: Record<(typeof LANGUAGES_CODE)[number], string> = {
  en: "English",
  fr: "French",
  id: "Indonesian",
  es: "Spanish",
  ja: "Japanese",
  de: "German",
  ru: "Russian",
  zh: "Chinese",
} as const;

export type DeepStringRecord<T> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? DeepStringRecord<T[K]>
    : string;
};
export type Namespace = Partial<Record<(typeof NAMESPACE)[number], unknown>>;

export type Resources<T> = {
  [Lang in (typeof LANGUAGES_CODE)[number]]: Required<{
    [Ns in keyof T]: DeepStringRecord<T[Ns]>;
  }>;
};
