# Projects — Developer Guide

The site hosts several projects. They share one set of page components; each project supplies its own configuration.

```
/                    main landing — its last slide links to /projects
/projects            routing page — one card per project
/<project>           the project's own landing
/<project>/glossary  /<project>/cultural-map  /<project>/story
```

## Where things live

```
src/
├── glossary/  stories/  culturalMap/   shared section pages
├── landing/                            routing page, and each project's front page
└── projects/
    ├── index.js            PROJECTS — the list of projects
    ├── Project.js          Project class
    ├── Section.js          Section base class (GlossarySection, MapSection, StoriesSection extend it)
    ├── createProject.js    builds a Project from a ui config and its data
    └── <project>/          configuration only — no components
        ├── index.js        createProject(ui, { glossary, map, stories })
        ├── ui.js           UI config: how the project presents itself
        └── data/           data config: the content
            ├── glossary.js         { categories, entries }
            ├── map/index.js        { center, zoom, categories, roots }
            └── stories/            StoryData.js, Content/, Images/
```

A section appears in the nav and on the landing only if its data is passed to `createProject`.

## `ui.js`

| Field | Used for |
|---|---|
| `id` | `data-project` attribute, route key |
| `name` | top bar brand, landing title, browser tab |
| `basePath` | URL prefix, e.g. `/sungai-batu` |
| `kicker`, `summary` | front page eyebrow and lead; the project's card on the routing page |
| `<section>.blurb` | the section's card on the landing |
| `<section>.header` | `PageHeader` props (`lead`, `eyebrow`, `title`, `mark`) overriding the page's defaults |
| `glossary.groupNoun`, `map.groupNoun`, `stories.recorded` | wording of the header figures |
| `pages` | per-page component overrides (see level 3); `landing` is the project's own front page |

## Changing a project's UI

Use the cheapest level that does the job.

1. **Look.** Add `theme.css` to the project folder, import it from the project's `index.js`, and override design tokens:

   ```css
   [data-project="sungai-batu"] {
     --color-terracotta: #2f6f8f;
   }
   ```

   It does not reach `--topbar-h`, or colours set in data (map pins, glossary categories).

2. **Content and behaviour.** Edit `ui.js`.

3. **Structure.** Replace one shared page with a project-specific component. Keep the component in its feature folder, and name it in `ui.js`:

   ```js
   import SungaiBatuMap from "../../culturalMap/SungaiBatuMap.jsx";

   pages: { map: SungaiBatuMap },
   ```

   Keys: `landing`, `glossary`, `glossaryDetail`, `map`, `stories`, `story`. Inside it, `useProject()` and `useSection("map")` give the project's config and data.

## Adding a project

1. Copy `src/projects/sungai-batu/` to `src/projects/<id>/`.
2. Set `id`, `name` and `basePath` in `ui.js`.
3. Give it a front page: copy `src/landing/SungaiBatuLanding.jsx` and name it in `pages.landing`. (Leave `pages.landing` out to use the default `ProjectLanding`.)
4. Add it to `PROJECTS` in `src/projects/index.js`.

Routes, nav tabs and its card on the routing page follow from that.

## Adding content

- Stories: [adding-articles.md](adding-articles.md)
- Map: [cultural-map.md](cultural-map.md)
- Glossary: add entries to `data/glossary.js`; each entry's `type` must match a category's `type`.
