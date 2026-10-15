import type { Lang } from "./ui";

// Tags are written in frontmatter as these keys, in every language version of
// a post, and are used as-is in tag URLs. Only the label shown is translated.
// A post using a tag missing from this list fails the build.
export const TAGS = {
  hackathon: { fr: "hackathon", en: "hackathon" },
  letsgo: { fr: "c'est parti", en: "let's go" },
} satisfies Record<string, Record<Lang, string>>;

export type Tag = keyof typeof TAGS;

export const TAG_KEYS = Object.keys(TAGS) as [Tag, ...Tag[]];

export function tagLabel(tag: Tag, lang: Lang) {
  return TAGS[tag][lang];
}
