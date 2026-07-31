# Mathis Aujogue — Blog & Portfolio

Personal blog and portfolio built with [Astro](https://astro.build), based on the [Astro Micro](https://astro-micro.vercel.app/) theme. Content is written in Markdown/MDX and deployed automatically on push to `main`.

**Live site:** https://maujogue.fr

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) to preview locally. The dev server hot-reloads when you edit content or source files.

Other useful commands:

| Command | Description |
|---|---|
| `npm run dev` | Start the local dev server |
| `npm run build` | Type-check and build the static site to `dist/` |
| `npm run preview` | Serve the production build locally |

---

## Adding a blog post

1. Create a new folder under `src/content/blog/` with an `index.md` (or `index.mdx`) file inside it. The folder name becomes the post URL slug.

   ```
   src/content/blog/My new post/index.md
   → https://maujogue.fr/blog/My new post
   ```

2. Add frontmatter at the top of the file:

   ```yaml
   ---
   title: "Post title"
   description: "Short summary shown in listings and SEO"
   date: 2026-07-03
   tags: ["tag-one", "tag-two"]   # optional
   draft: false                   # set to true to hide from the site
   ---
   ```

3. Write your content below the frontmatter in Markdown. Headings (`##`, `###`…) automatically generate a table of contents on the post page.

4. Preview locally with `npm run dev`, then commit and push (see [Deploying](#deploying)).

**Tips:**
- Set `draft: true` to work on a post without publishing it. Drafts are excluded from the blog index, homepage, RSS feed, and search index.
- Tags appear on the post and link to `/tags/<tag>`. They also show up in the tag cloud on the blog page.
- You can use `.mdx` instead of `.md` if you need React/JSX components in a post.

---

## Adding a project

1. Create a folder under `src/content/projects/` with an `index.md` file:

   ```
   src/content/projects/my-project/index.md
   → https://maujogue.fr/projects/my-project
   ```

2. Add frontmatter:

   ```yaml
   ---
   title: "Project name"
   description: "One-line summary"
   date: 2026-07-03
   repoURL: "https://github.com/maujogue/my-project"   # optional
   demoURL: "https://demo.example.com"                # optional
   draft: false
   ---
   ```

3. Write the project write-up in Markdown below the frontmatter.

Projects appear on the homepage (most recent first) and on `/projects`. `repoURL` and `demoURL` render as links on the project page when provided.

---

## Configuring the blog

### Site metadata & social links — `src/consts.ts`

This is the main settings file. Edit it to change:

- **Site identity:** `SITE.TITLE`, `SITE.DESCRIPTION`, `SITE.EMAIL`
- **Homepage limits:** `NUM_POSTS_ON_HOMEPAGE`, `NUM_PROJECTS_ON_HOMEPAGE`
- **Page titles/descriptions:** `HOME`, `BLOG`, `PROJECTS`
- **Social links:** `SOCIALS` array (GitHub, LinkedIn, etc.)

### Site URL — `astro.config.mjs`

Set the canonical URL used for the sitemap, RSS feed, and Open Graph tags:

```js
site: "https://maujogue.fr",
```

### Homepage intro — `src/pages/index.astro`

The "Hey! 🔬" section and "Let's Connect" copy live here. Update the paragraphs to change what visitors read on the landing page.

### Comments — `src/components/Giscus.astro`

Blog posts include a [Giscus](https://giscus.app) comment section. To use your own GitHub repo for comments, install the Giscus app on your repo and replace the `data-repo`, `data-repo-id`, `data-category`, and `data-category-id` attributes in this file.

### Booking link — `src/components/Cal.astro`

The "Let's talk" button on the homepage opens a [Cal.com](https://cal.com) scheduling widget. Update `data-cal-link`, `data-cal-namespace`, and the `Cal("init", …)` call to point to your own event type.

### Content schema — `src/content.config.ts`

Defines the required/optional frontmatter fields for blog posts and projects. Only edit this if you want to add new metadata fields (e.g. `author`, `image`).

---

## Deploying

Deployment is fully automated via GitHub Actions (`.github/workflows/deploy.yml`).

**Workflow:** push to `main` → build → rsync `dist/` to your server over SSH.

### Publishing changes

```bash
git add .
git commit -m "Add post: Why starting is hard"
git push origin main
```

GitHub Actions will build and deploy within a few minutes. You can also trigger a manual deploy from the **Actions** tab → **Deploy Astro to Server** → **Run workflow**.

### Required GitHub secrets

These must be configured in your repo settings (**Settings → Secrets and variables → Actions**):

| Secret | Description |
|---|---|
| `SSH_PRIVATE_KEY` | Private key for SSH access to the deploy server |
| `DEPLOY_HOST` | Server hostname or IP |
| `DEPLOY_USER` | SSH username |
| `DEPLOY_PATH` | Remote directory where `dist/` is synced (e.g. `/var/www/maujogue.fr`) |
| `SSH_PORT` | *(optional)* SSH port, defaults to `22` |
| `NODE_VERSION` | *(optional)* Node.js version, defaults to `20` |

### Manual build (optional)

To build locally and inspect the output before pushing:

```bash
npm run build
npm run preview   # serve dist/ at http://localhost:4321
```

---

## Useful reference

### Project structure

```
src/
├── consts.ts              # Site settings, social links
├── content/
│   ├── blog/              # Blog posts (one folder per post)
│   └── projects/          # Project write-ups
├── pages/
│   ├── index.astro        # Homepage
│   ├── blog/              # Blog listing & post pages
│   └── projects/          # Projects listing & detail pages
└── components/            # Reusable UI (header, footer, etc.)
```

### Features included

- **Search** — powered by [Pagefind](https://pagefind.app), built automatically at `npm run build`. Use the search button in the header.
- **RSS feed** — available at `/rss.xml`
- **Sitemap** — generated automatically for SEO
- **Dark/light mode** — follows system preference, toggle in the footer
- **Reading time** — shown on blog posts and projects
- **Table of contents** — auto-generated from headings on long posts
- **Tags** — filter posts by tag at `/tags/<tag>`

### Writing tips

- Use `>` for blockquotes, ` ``` ` for code blocks (with syntax highlighting), and standard Markdown for everything else.
- Images go in `public/` and are referenced as `/image-name.png` in your Markdown.
- Folder names with spaces work fine (e.g. `Why starting is hard`) but kebab-case (`why-starting-is-hard`) produces cleaner URLs.

### Theme

Built on [Astro Micro](https://astro-micro.vercel.app/), a fork of [Astro Nano](https://astro-nano-demo.vercel.app/). See the [Micro changelog](https://astro-micro.vercel.app/blog/00-micro-changelog) for upstream feature details.
