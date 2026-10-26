import type { Lang } from "@i18n/ui";

type Localized = Record<Lang, string>;

export type NowItem = {
  label: Localized;
  text: Localized;
  /** Path (without language prefix) the text links to. */
  href?: string;
};

// The "Now" block on the home page. Update every month or two:
// change `month`, then edit the items. `en` is an AI translation of `fr`.
export const NOW: { month: string; items: NowItem[] } = {
  month: "2026-10",
  items: [
    {
      label: { fr: "Ce que j'écris", en: "What I'm writing" },
      text: {
        fr: "une série sur les hackathons et leur rôle de développement personnel",
        en: "a series on hackathons and their role in personal growth",
      },
      href: "/tags/hackathon",
    },
    {
      label: {
        fr: "Ce que je construis / où j'apprends",
        en: "What I'm building / learning",
      },
      text: {
        fr: "les system-1 models, ou comment supprimer les tâches laborieuses et répétitives à bas coût.",
        en: "system-1 models, or how to get rid of tedious, repetitive tasks at low cost.",
      },
    },
    {
      label: { fr: "Ce que je bricole à côté", en: "What I'm tinkering with" },
      text: {
        fr: "un homelab, pour quitter Google avec mes données. Un SaaS (le futur Vinted du Lego), entre autres.",
        en: "a homelab, to leave Google with my data. A SaaS (the future Vinted for Lego), among other things.",
      },
    },
  ],
};
