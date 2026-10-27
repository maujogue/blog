import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import pagefind from "astro-pagefind";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://maujogue.fr",
  i18n: {
    locales: ["fr", "en"],
    defaultLocale: "fr",
    routing: { prefixDefaultLocale: false },
  },
  // Old post slugs, kept so links shared before a rename keep working.
  redirects: {
    "/blog/7-hackathons-4-victoires": "/blog/hackathon1",
    "/en/blog/7-hackathons-4-victoires": "/en/blog/hackathon1",
    "/blog/le-produit-avant-le-code": "/blog/hackathon2",
    "/en/blog/le-produit-avant-le-code": "/en/blog/hackathon2",
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: "fr", locales: { fr: "fr-FR", en: "en-US" } },
    }),
    mdx(),
    pagefind(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },
});
