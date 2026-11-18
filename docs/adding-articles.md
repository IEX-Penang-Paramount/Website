# Adding New Articles to the Stories Section

This guide walks you through adding a new article to a project's stories section. `<project>` below is the project's folder under `src/projects/` (e.g. `paramount`, `sungai-batu`).

## Overview

Each article consists of up to three parts:

| Part | Location | Required? |
|------|----------|-----------|
| Metadata entry | `src/projects/<project>/data/stories/StoryData.js` | Yes |
| Content component | `src/projects/<project>/data/stories/Content/{articleID}.jsx` | Yes |
| Hero image | `src/projects/<project>/data/stories/Images/{articleID}.jpg` | No |

No routing or configuration changes are needed — everything is wired up automatically.

---

## Step 1 — Register the article metadata

Open `src/projects/<project>/data/stories/StoryData.js` and add a new object to the `stories` array:

```js
{
  articleID: "A4",            // unique ID — used in URLs, filenames, and image matching
  title: "My Article Title",
  abstract: "A short summary of the article.",
  abstractQuote: "A quote displayed on the feature card.",
  author: "Author Name",
  time: "2026-08-19",        // publication date in YYYY-MM-DD format
}
```

### Field reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `articleID` | string | Yes | Unique identifier. Used in the URL (`/<project>/story/A4`), to match hero images, and to load the content component. |
| `title` | string | Yes | Article title displayed on the article page and on feature cards. |
| `abstract` | string | No | Short summary of the article. |
| `abstractQuote` | string | No | Quote shown on the featured card. Falls back to `title` if omitted. |
| `author` | string | Yes | Author or speaker name shown in the article header. |
| `time` | string | Yes | Publication date in `YYYY-MM-DD` format. |

> **Tip:** The `articleID` must exactly match the content filename and hero image filename (without extension).

---

## Step 2 — Create the content component

Create a new file at:

```
src/projects/<project>/data/stories/Content/{articleID}.jsx
```

For example, `src/projects/<project>/data/stories/Content/A4.jsx`:

```jsx
export default function A4() {
  return (
    <>
      <p>
        Write your article content here using standard JSX.
        Each paragraph goes in its own p tag.
      </p>

      <p>
        You can use any HTML/JSX elements — headings, lists,
        blockquotes, etc.
      </p>

      <p>
        If you are unsure about how to convert the article into html format,
         Do it in google doc first and then ask AI tools to convert for you.
      </p>
    </>
  );
}
```

### Requirements

- The file **must** use a default export.
- The function name should match the `articleID` (by convention, not strictly required).
- The component receives no props — it is self-contained.
- The component is lazy-loaded, so it won't affect initial page load performance.

### Adding inline images

To include images within the article body:

1. Place the image file in `src/projects/<project>/data/stories/Images/` using the naming pattern `{articleID}-{label}.{ext}` (e.g., `A4-01.png`).
2. Import and use it in your content component:
3. If you are unsure how to do it, feed this tutorial to AI and ask the tool to deal with it for you. :)

```jsx
import photo from "../Images/A4-01.png";

export default function A4() {
  return (
    <>
      <p>Some introductory text.</p>

      <div style={{ textAlign: "center" }}>
        <img src={photo} alt="Description of the image" height={300} />
      </div>

      <p>More text after the image.</p>
    </>
  );
}
```

---

## Step 3 (optional) — Add a hero image

To display a large banner image at the top of the article page, place an image file in:

```
src/projects/<project>/data/stories/Images/{articleID}.{ext}
```

For example: `src/projects/<project>/data/stories/Images/A4.jpg`

- The filename (without extension) **must** exactly match the `articleID`.
- Supported formats: `.jpg`, `.png`, `.webp`, or any web-compatible image format.
- The image is displayed at full width with a max height of 400px (cropped to cover).
- If no matching image is found, the article page simply shows no hero image.

---

## That's it!

After completing the steps above, your new article will:

- Appear in the recording index on the project's stories page, in the order listed in `StoryData.js`.
- Be accessible at the URL `/<project>/story/{articleID}` (e.g., `/<project>/story/A4`).
- Display with its hero image, title, author, date, and full content.

No changes to routing, configuration, or other components are necessary.

---

## File structure reference

```
src/projects/<project>/data/stories/
├── index.js                      (collects the files below — no edits needed)
├── StoryData.js                  ← article metadata (Step 1)
├── Content/
│   └── A4.jsx                    ← new content component (Step 2)
└── Images/
    └── A4.jpg                    ← new hero image (Step 3)

src/stories/                      (shared page components — no edits needed)
```

## Quick checklist

- [ ] Added metadata entry to `StoryData.js` with a unique `articleID`
- [ ] Created `src/projects/<project>/data/stories/Content/{articleID}.jsx` with a default export
- [ ] (Optional) Added hero image as `src/projects/<project>/data/stories/Images/{articleID}.{ext}`
- [ ] Verified the article loads at `/<project>/story/{articleID}` in the browser
