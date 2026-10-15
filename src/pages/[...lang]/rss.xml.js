import rss from "@astrojs/rss";
import { SITE } from "@consts";
import {
  getLocalizedEntries,
  langParams,
  localizePath,
  useTranslations,
} from "@i18n/utils";

export function getStaticPaths() {
  return langParams();
}

export async function GET(context) {
  const { lang } = context.props;
  const t = useTranslations(lang);

  const items = [
    ...(await getLocalizedEntries("blog", lang)),
    ...(await getLocalizedEntries("projects", lang)),
  ].sort(
    (a, b) => b.entry.data.date.valueOf() - a.entry.data.date.valueOf(),
  );

  return rss({
    title: SITE.TITLE,
    description: t("site.description"),
    site: context.site,
    customData: `<language>${lang}</language>`,
    items: items.map(({ entry, slug }) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.date,
      link: localizePath(`/${entry.collection}/${slug}/`, lang),
    })),
  });
}
