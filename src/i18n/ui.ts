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
    "nav.search": "Rechercher",
    "nav.language": "Langue",
    "theme.label": "Thème",
    "theme.light": "Clair",
    "theme.dark": "Sombre",
    "theme.system": "Système",
    "home.title": "Accueil",
    "home.description": "Bienvenue sur mon blog et portfolio.",
    "home.intro1": "Voici mon blog et mon portfolio.",
    "home.intro2": "C'est un chantier en cours, alors n'en attendez pas trop !",
    "home.intro3":
      "J'y partage mes réflexions, mes expériences et mes projets, en tant qu'étudiant (à vie), freelance et en tant que personne. ",
    "home.latestPosts": "Derniers articles",
    "home.allPosts": "Voir tous les articles",
    "home.recentProjects": "Projets récents",
    "home.allProjects": "Voir tous les projets",
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
    "nav.search": "Search",
    "nav.language": "Language",
    "theme.label": "Theme",
    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.system": "System",
    "home.title": "Home",
    "home.description": "Welcome to my blog and portfolio.",
    "home.intro1": "This will be my blog and portfolio.",
    "home.intro2": "It's a work in progress, so don't expect anything of it!",
    "home.intro3":
      "Here I want to share my reflexions, experiences and projects as a student and a person.",
    "home.latestPosts": "Latest posts",
    "home.allPosts": "See all posts",
    "home.recentProjects": "Recent projects",
    "home.allProjects": "See all projects",
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
