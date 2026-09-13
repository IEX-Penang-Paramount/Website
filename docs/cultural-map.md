# Cultural Map — Developer Guide

This guide covers the data architecture and component design of the cultural map feature. It is written for developers who need to add, modify, or remove map items (pins and areas).

## Architecture Overview

```
src/culturalMap/
├── data/                         # All map data lives here
│   ├── index.js                  # Lists the top-level items; builds the tree
│   ├── MapObject.js              # MapObject / MapPin / MapArea data classes
│   ├── categories.js             # CATEGORIES — label + colour per category
│   ├── periods.js                # PERIODS — order/label per period, filter rule
│   ├── shrines-map.js            # Example leaf pin
│   └── fishing-area-past-map.js  # Example area (polygon)
├── CulturalMapMain.jsx           # Page orchestrator, state management
├── MapView.jsx                   # Map container, renders items + handles fly-to
├── MapObjectComponent.jsx        # Picks a renderer from the item's type
├── MapPinComponent.jsx           # Leaflet Marker renderer
├── MapAreaComponent.jsx          # Leaflet Polygon renderer
├── LocationPanel.jsx             # Side panel showing item details
├── PeriodFilter.jsx              # Past / present switcher in the page header
└── BackButton.jsx                # "← Back" overlay for navigation
```

The `Component` suffix separates the renderers from the **data classes** of the same name: `MapPin` is a data object, `MapPinComponent` draws it.

### How items render

Every map item flows through a single path:

```
data file → index.js (wrapped in a data class) → CulturalMapMain (filtered by period)
         → MapView → MapObjectComponent → MapPinComponent or MapAreaComponent
```

`MapObjectComponent` reads the item's `type` and selects the renderer:

```js
const RENDERERS = {
  pin: MapPinComponent,    // Leaflet Marker (circle icon)
  area: MapAreaComponent,  // Leaflet Polygon (filled shape)
};

const Renderer = RENDERERS[location.getType()];
```

### Data classes

A data file exports a plain object. `index.js` passes it to `createMapObject()`, which picks a class from the `type` field and returns a **read-only** instance: the fields live in private properties, there are no setters, and the children and coordinates arrays are frozen.

```js
import { createMapObject } from "./MapObject.js";

const shrines = createMapObject(shrinesData);
shrines.getName();     // "The shrines"
shrines.getPeriod();   // "present"
shrines.isLeaf();      // true
```

Read the data through these methods, never as properties (`item.name` is always `undefined`):

| Class | Methods |
|---|---|
| `MapObject` (base) | `getId` · `getType` · `getPeriod` · `getName` · `getNameZh` · `getLat` · `getLng` · `getCategory` · `getShortDescription` · `getAddress` · `getChildren` · `isLeaf` · `getColor` |
| `MapPin` | the above |
| `MapArea` | the above plus `getCoordinates` |

`createMapObject()` throws on an unknown `type`, so a typo fails immediately at load rather than rendering nothing.

### Hierarchy and navigation

Items form a tree. Any item — pin or area — becomes a **super-item** by getting a `children` array, which users can drill into. A parent holds its children's **data objects**, imported directly; the parent's constructor builds them, so each item owns its own subtree.

```js
// src/culturalMap/data/fishing-community-map.js
import fishingUnitPresent from "./fishing-unit-present-map.js";
import shrines from "./shrines-map.js";

const fishingCommunity = {
  id: "fishing-community",
  type: "pin",
  period: "",                 // spans both periods — never filtered out
  name: "Fishing community",
  lat: 5.4265,
  lng: 100.3263,
  shortDescription: "...",
  children: [fishingUnitPresent, shrines],
};

export default fishingCommunity;
```

Navigation uses a stack: clicking "Explore locations" pushes the super-item onto the stack, "← Back" pops it. The map flies to the appropriate zoom level at each transition. Switching period empties the stack, since a group in one period may not exist in another.

Super-items are visually distinct: pins render at 36px (vs 20px for leaf pins), areas render with a heavier stroke. Children can themselves be super-items, allowing arbitrary nesting depth.

### Top-level items

`index.js` lists the items that appear at the top level of the map — there is no root data file:

```js
const ROOTS = Object.freeze(
  [
    fishingAreaPast,
    fishingAreaPresent,
    // ...
  ].map(createMapObject)
);
```

**Order matters.** Areas come first, largest to smallest, then pins. Leaflet draws later shapes on top, so listing a large area after a small one would cover the small one and make it unclickable.

---

## Data File Reference

All data files live in `src/culturalMap/data/` as flat JS files. Each file exports a single object via `export default`. The file naming convention is `<id>-map.js`.

### Pin (type: "pin")

A pin renders as a circular marker on the map.

Every field a pin can carry:

```js
// src/culturalMap/data/<id>-map.js
const myPin = {
  id: "my-pin",               // Unique ID, matches the filename
  type: "pin",                // Renderer type — "pin" or "area"
  period: "present",          // Which period shows this item (see below)
  name: "My Pin",             // Display name (English)
  nameZh: "中文名",            // Display name (Chinese) — optional
  lat: 5.4264377,             // Latitude
  lng: 100.326478,            // Longitude
  category: "religious",      // Category key (see categories.js) — optional
  shortDescription: "...",    // Description shown in the side panel
  address: "Pengkalan Weld",  // Street address — optional, leaf pins only
};

export default myPin;
```

### Area (type: "area")

An area renders as a filled polygon on the map.

```js
// src/culturalMap/data/fishing-area-past-map.js
const fishingAreaPast = {
  id: "fishing-area-past",
  type: "area",
  period: "past",
  name: "Fishing area in the past",
  lat: 5.4405284,             // Center point — used for fly-to animation
  lng: 100.3289476,
  shortDescription: "...",
  coordinates: [              // Polygon boundary — array of [lat, lng] pairs
    [5.4527113, 100.3169076], // Vertices are connected in order,
    [5.4409627, 100.3165965], // and the polygon auto-closes
    [5.4310939, 100.3224651], // (last point connects back to first)
    // ... the real file carries six
  ],
};

export default fishingAreaPast;
```

An area still needs `lat`/`lng`: that is the point the map flies to when the area is selected. Use the centre of the shape.

---

## Field Reference

| Field | Type | Required | Used by | Description |
|-------|------|----------|---------|-------------|
| `id` | string | Yes | All | Unique identifier, matches filename (`<id>-map.js`) |
| `type` | `"pin"` or `"area"` | Yes | All | Which renderer draws it. An unknown value throws at load |
| `period` | string | Yes | All | Which period shows this item. `""` means it is never filtered out |
| `name` | string | Yes | All | English display name, shown in tooltips and panel |
| `nameZh` | string | No | All | Chinese/alternative name, shown below title in panel |
| `lat` | number | Yes | All | Latitude — pin position or area centre (for fly-to) |
| `lng` | number | Yes | All | Longitude |
| `shortDescription` | string | Yes | All | Description text shown in the side panel |
| `category` | string | No | Pins | Key into `CATEGORIES` (e.g. `"clan-house"`). Sets the badge label and colour in the panel |
| `address` | string | No | Leaf pins | Street address, shown in panel metadata |
| `color` | string | No | All | Custom colour (CSS value). Overrides the category colour |
| `coordinates` | `[[lat,lng],...]` | Areas only | Areas | Polygon boundary vertices. Connected in order, auto-closes |
| `children` | `[data, ...]` | No | Super-items | Child **data objects**, imported from their files. Presence makes this a super-item |

---

## Periods and the filter

The page header carries a bar that switches the map between periods. Choosing one shows only the matching items — on the map, in the manifest, and in the header counts.

**The bar is built from the data.** `index.js` walks the whole tree, collects every distinct `period` value it finds, and makes a button for each, after an "All" button. Nothing is hardcoded to past and present.

Two ways to write the field:

- `period: "<key>"` — the item belongs to that period. A key that no other file uses simply adds a new button, labelled with the key itself.
- `period: ""` — the item belongs to no single period and is **never filtered out**. Use this for a parent that groups both past and present children.

`src/culturalMap/data/periods.js` is optional polish, not a registry:

```js
export const PERIODS = {
  past: { label: "Past" },
  present: { label: "Present" },
};
```

Listing a period there fixes where it sits in the bar and lets it display a label different from its key. A period absent from this list still works — it is placed after the listed ones and shows its key (the buttons uppercase their text, so `"future"` reads as FUTURE).

---

## How To: Common Tasks

### Add a new leaf pin

1. Create `src/culturalMap/data/<id>-map.js`:

```js
const myLocation = {
  id: "my-location",
  type: "pin",
  period: "present",
  name: "My Location",
  lat: 5.42,
  lng: 100.34,
  category: "mansion",
  shortDescription: "A brief description.",
};

export default myLocation;
```

2. Either import it into a parent's `children` array, or — for a top-level item — import it in `src/culturalMap/data/index.js` and add it to `ROOTS`:

```js
import myLocation from "./my-location-map.js";
// ...
const ROOTS = Object.freeze(
  [
    // ... existing items
    myLocation,
  ].map(createMapObject)
);
```

### Add a new area

Same steps, with `type: "area"` and a `coordinates` array. Place it among the other areas in `ROOTS`, in size order — largest first — so it does not cover a smaller area.

### Add a new group (super-item)

Create a data file with a `children` array holding imported child data objects (see "Hierarchy and navigation"). Give it `period: ""` if it spans more than one period. Then list the group in `ROOTS` in place of its children.

### Add a new period

Put `period: "<key>"` in a data file. A button appears on its own. Add a matching entry to `periods.js` only to control its position in the bar or give it a nicer label.

### Add a new category

Edit `CATEGORIES` in `src/culturalMap/data/categories.js`:

```js
export const CATEGORIES = {
  // ... existing categories
  "new-category": { label: "Display Label", color: "#hexcolor" },
};
```

Then use `category: "new-category"` in any leaf pin data file.

### Change an item's colour

Set the `color` field on the item's data file. This overrides any category colour:

```js
color: "#e63946",           // Hex
color: "var(--color-teal)", // CSS variable
```

### Move an item to a different group

Move the import and the entry from the old parent's `children` array to the new one's. No change to the item's own data file.

### Remove an item

1. Remove it from its parent's `children` array, or from `ROOTS` in `index.js`
2. Remove the now-unused import
3. Delete the `<id>-map.js` file
4. If it was a super-item, decide where its children should go (re-parent or also delete)

---

## Colour Resolution Order

`getColor()` checks in this order:

1. `color` — explicit colour on the data file (highest priority)
2. `CATEGORIES[category].color` — derived from the category
3. `MapPin.DEFAULT_COLOR` / `MapArea.DEFAULT_COLOR` — static fallbacks on the classes in `MapObject.js`

---

## Adding a New Renderer Type

To add a visual type beyond pins and areas (e.g. `"route"`):

1. Add a data class in `src/culturalMap/data/MapObject.js` for any fields the type needs, and register it in the factory:

```js
export class MapRoute extends MapObject {
  static DEFAULT_COLOR = "#3b82f6";
  // ... plus whatever getters the type needs
}

const CLASSES_BY_TYPE = { pin: MapPin, area: MapArea, route: MapRoute };
```

2. Create `MapRouteComponent.jsx` accepting the standard props: `location`, `index`, `isLeaf`, `isSelected`, `onSelect`
3. Register it in `MapObjectComponent.jsx`:

```js
const RENDERERS = {
  pin: MapPinComponent,
  area: MapAreaComponent,
  route: MapRouteComponent,  // New type
};
```

4. Use `type: "route"` in data files. No other component changes needed.

---

## Known leftovers

`heritage-core-map.js` and `waterfront-belt-map.js` are from an earlier data model: their `children` hold **ID strings**, and they carry no `period`. Nothing imports them, and `createMapObject` throws on a string child, so do not copy them as a template — use the group example above. They can be deleted once real parent nodes exist.
