import { getCollection, type CollectionEntry } from "astro:content";
import { DEFAULT_LANG, LANGS, LANG_NAMES, ui, type Lang, type UiKey } from "./ui";

export function isLang(value: unknown): value is Lang {
  return LANGS.includes(value as Lang);
}

/** Language of the page being rendered, from Astro's i18n routing. */
export function getLang(astro: { currentLocale?: string }): Lang {
  return isLang(astro.currentLocale) ? astro.currentLocale : DEFAULT_LANG;
}

export function useTranslations(lang: Lang) {
  return function t(key: UiKey, vars: Record<string, string> = {}) {
    const text: string = ui[lang][key] ?? ui[DEFAULT_LANG][key];
    return text.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? `{${name}}`);
  };
}

export function languageName(lang: Lang, inLang: Lang) {
  return LANG_NAMES[inLang][lang];
}

/** Params for the optional `[...lang]` route segment: none for the default language. */
export function langParams() {
  return LANGS.map((lang) => ({
    params: { lang: lang === DEFAULT_LANG ? undefined : lang },
    props: { lang },
  }));
}

function stripLangPrefix(path: string) {
  const [, first, ...rest] = path.split("/");
  return isLang(first) && first !== DEFAULT_LANG ? `/${rest.join("/")}` : path;
}

/** `/blog/x` → `/en/blog/x` for English, unchanged for the default language. */
export function localizePath(path: string, lang: Lang) {
  const bare = stripLangPrefix(path);
  if (lang === DEFAULT_LANG) return bare;
  return bare === "/" ? `/${lang}/` : `/${lang}${bare}`;
}

type Localized = "blog" | "projects";

/** Folder name of an entry; every language version of a post shares it. */
export function entrySlug(entry: CollectionEntry<Localized>) {
  return entry.id.split("/").slice(1).join("/");
}

export type LocalizedEntry<C extends Localized> = {
  slug: string;
  entry: CollectionEntry<C>;
  /** True when no version exists in the requested language and the original is shown instead. */
  isFallback: boolean;
  /** The hand-written version, when `entry` is an AI translation of it. */
  original?: CollectionEntry<C>;
};

/**
 * One entry per post folder: the version in `lang` when there is one,
 * otherwise the hand-written original.
 */
export async function getLocalizedEntries<C extends Localized>(
  collection: C,
  lang: Lang,
): Promise<LocalizedEntry<C>[]> {
  const entries = (await getCollection(collection)).filter(
    (entry) => !entry.data.draft,
  ) as CollectionEntry<C>[];

  const bySlug = new Map<string, CollectionEntry<C>[]>();
  for (const entry of entries) {
    const slug = entrySlug(entry);
    bySlug.set(slug, [...(bySlug.get(slug) ?? []), entry]);
  }

  return [...bySlug.entries()]
    .map(([slug, versions]) => {
      const original =
        versions.find((v) => !v.data.aiTranslated) ?? versions[0];
      const localized = versions.find((v) => v.data.lang === lang);
      const entry = localized ?? original;
      return {
        slug,
        entry,
        isFallback: !localized,
        original: entry.data.aiTranslated ? original : undefined,
      };
    })
    .sort((a, b) => b.entry.data.date.valueOf() - a.entry.data.date.valueOf());
}
