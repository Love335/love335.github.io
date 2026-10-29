# Portfolio

Portfolio built with Next.js (App Router, static export), React, TypeScript and Tailwind CSS v4. Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export in out/
npm run lint
```

## How the site is organised

```
app/
  layout.tsx                 fonts, navbar, wire provider
  globals.css                Tailwind setup: maps theme tokens to utilities
  styles/themes.css          one colour palette per project (data-theme)
  lib/projects.ts            every project: route, navbar tab, theme, CRT text
  lib/collaborators.ts       people who appear on project pages
  components/
    navbar.tsx, crt.tsx, corkboard-gallery.tsx, wire-context.tsx   home page
    project/                 building blocks for project pages
  <project>/page.tsx         one folder per project
```

### Colours

Every page uses the same semantic colour utilities: `bg-background`, `text-primary`, `text-muted`,
`bg-surface`, `border-border`, `bg-panel`, and so on. Which actual colours those resolve to is decided
by the `data-theme` attribute on the page root, which `ProjectPage` sets from its `theme` prop.

- `app/styles/themes.css` defines each theme as a block of CSS variables. Every theme sets the same
  tokens (`--background`, `--primary`, `--panel-border`, …); the block at the top documents what each
  one is for. The default, with no `data-theme`, is the Beatnik palette, which also skins the navbar
  and home page.
- `app/globals.css` maps those variables to Tailwind utilities inside `@theme inline`.

To add a theme, add a `[data-theme="name"]` block to `themes.css`, add the name to `ThemeName` in
`app/lib/projects.ts`, and set `theme="name"` on the page's `ProjectPage`.

### Projects

`app/lib/projects.ts` is the single list of projects. The navbar renders its tabs from it, the
home-page CRT reads the text it types out from it, and pressing `[y]` on the CRT navigates to the
project's `href`. To add a project, add an entry there and a `page.tsx` in a folder named after
its slug.

### Project pages

Pages are composed from the components in `app/components/project/`:

- `ProjectPage` sets the theme and the page container.
- `ProjectHero` is the title, tagline, collaborators, blurb and lead media.
- `FeatureGrid` and `Feature` are the two-column masonry of screenshots with descriptions.
- `TechSection` is the "Tech & Tools Used" table.
- `MediaFrame`, `Video` and `Screenshot` frame the media.

### Responsive layout

Layout is mobile-first with Tailwind's `sm` / `md` / `lg` breakpoints. The CRT monitor on the home
page is sized in container-query units so it scales with the viewport; the wire can be dragged with
a mouse or a finger, and `[y]` can be clicked or tapped. While idle, `[y]` pulls the wire to a random
tab by itself.
