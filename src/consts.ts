import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "Mathis Aujogue",
  DESCRIPTION: "Blog and portfolio of Mathis Aujogue",
  EMAIL: "hey@maujogue.fr",
  NUM_POSTS_ON_HOMEPAGE: 5,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Welcome to my blog and portfolio.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my projects with links to repositories and live demos.",
};

export const SOCIALS: Socials = [
  {
    NAME: "GitHub",
    HREF: "https://github.com/maujogue",
  },
  {
    NAME: "Linkedin",
    HREF: "https://www.linkedin.com/in/mathis-aujogue/",
  },
];
