export const LANGS = ["fr", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "fr";

export const LANG_LABELS: Record<Lang, string> = {
  fr: "Français",
  en: "English",
};

// Name of each language, written in each UI language: LANG_NAMES[ui][lang]
export const LANG_NAMES: Record<Lang, Record<Lang, string>> = {
  fr: { fr: "français", en: "anglais" },
  en: { fr: "French", en: "English" },
};

export const DATE_LOCALES: Record<Lang, string> = {
  fr: "fr-FR",
  en: "en-US",
};

export const ui = {
  fr: {
    "site.description": "Blog et portfolio de Mathis Aujogue",
    "nav.blog": "blog",
    "nav.projects": "projets",
    "nav.timeline": "timeline",
    "nav.search": "Rechercher",
    "nav.language": "Langue",
    "theme.label": "Thème",
    "theme.light": "Clair",
    "theme.dark": "Sombre",
    "theme.system": "Système",
    "home.title": "Accueil",
    "home.description": "Bienvenue sur mon blog et portfolio.",
    "home.intro1": "Amoureux de tech utile et sensée. Curieux débordant.",
    "home.intro2":
      "Je joue avec la genAI pour tirer l'utile du buzzword, bientôt backpacker en Asie.",
    "home.intro3":
      "Fier alumni 42, où on apprend à apprendre plutôt qu'à trouver une case.",
    "home.intro4":
      "Des notes d'humeur, des réflexions. Sur ce métier qui n'arrête pas de changer. Sur comment utiliser la tech pour faire un peu de bien dans ce bas monde.",
    "home.timelineLink": "Mon parcours, en timeline",
    "home.now": "Now — {month}",
    "home.latestPosts": "Derniers articles",
    "home.allPosts": "Voir tous les articles",
    "home.connect": "Contacts",
    "home.connectText":
      "Pour discuter de quelque chose ou juste dire bonjour, vous pouvez me trouver en ligne ou m'envoyer un e-mail :)",
    "blog.title": "Blog",
    "blog.description":
      "Une collection d'articles sur des sujets qui me passionnent.",
    "blog.back": "Retour au blog",
    "projects.title": "Projets",
    "projects.description":
      "Mes projets, avec les liens vers les dépôts et les démos.",
    "projects.back": "Retour aux projets",
    "timeline.title": "Timeline",
    "timeline.description":
      "Mon parcours, de 2003 à aujourd'hui, et ce que j'en retiens.",
    "timeline.win": "Hackathon gagné",
    "tags.title": "Tags",
    "tags.all": "Tous les tags",
    "tags.postsTagged": "Articles avec le tag",
    "tags.pageTitle": "Tag",
    "post.readingTime": "min de lecture",
    "post.toc": "Sommaire",
    "post.aiTranslated": "Traduit par IA",
    "post.aiTranslatedNote":
      "Cet article a été écrit en {source} par Mathis, puis traduit par une IA.",
    "post.readOriginal": "Lire la version originale",
    "post.onlyIn": "Cet article n'est disponible qu'en {source}.",
    "footer.backToTop": "Haut de page",
    "search.close": "pour fermer, ou cliquez n'importe où",
    "search.press": "Appuyez sur",
  },
  en: {
    "site.description": "Blog and portfolio of Mathis Aujogue",
    "nav.blog": "blog",
    "nav.projects": "projects",
    "nav.timeline": "timeline",
    "nav.search": "Search",
    "nav.language": "Language",
    "theme.label": "Theme",
    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.system": "System",
    "home.title": "Home",
    "home.description": "Welcome to my blog and portfolio.",
    "home.intro1": "In love with useful, sensible tech. Overflowing with curiosity.",
    "home.intro2":
      "I play with genAI to get the useful part out of the buzzword, soon backpacking across Asia.",
    "home.intro3":
      "Proud 42 alumnus, where you learn how to learn rather than how to fit in a box.",
    "home.intro4":
      "Mood notes, reflections. On a job that never stops changing. On how to use tech to do a little good in this world.",
    "home.timelineLink": "My path, as a timeline",
    "home.now": "Now — {month}",
    "home.latestPosts": "Latest posts",
    "home.allPosts": "See all posts",
    "home.connect": "Let's Connect",
    "home.connectText":
      "If you want to get in touch with me about something or just to say hi, reach out on social media or send me an email.",
    "blog.title": "Blog",
    "blog.description":
      "A collection of articles on topics I am passionate about.",
    "blog.back": "Back to blog",
    "projects.title": "Projects",
    "projects.description":
      "A collection of my projects with links to repositories and live demos.",
    "projects.back": "Back to projects",
    "timeline.title": "Timeline",
    "timeline.description":
      "My path, from 2003 to today, and what I took away from it.",
    "timeline.win": "Hackathon won",
    "tags.title": "Tags",
    "tags.all": "All tags",
    "tags.postsTagged": "Posts tagged with",
    "tags.pageTitle": "Tag",
    "post.readingTime": "min read",
    "post.toc": "Table of Contents",
    "post.aiTranslated": "AI-translated",
    "post.aiTranslatedNote":
      "This post was written in {source} by Mathis, then translated by AI.",
    "post.readOriginal": "Read the original",
    "post.onlyIn": "This post is only available in {source}.",
    "footer.backToTop": "Back to top",
    "search.close": "or click anywhere to close",
    "search.press": "Press",
  },
} as const;

export type UiKey = keyof (typeof ui)["fr"];
