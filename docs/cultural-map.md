# Cultural Map — Developer Guide

This guide covers the data architecture and component design of the cultural map feature. It is written for developers who need to add, modify, or remove map items (pins and areas).

## Architecture Overview

```
src/culturalMap/
├── data/                    # All map data lives here
│   ├── _root-map.js         # Entry point — lists top-level item IDs
│   ├── heritage-core-map.js # Example super-pin (has children)
│   ├── khoo-kongsi-map.js   # Example leaf pin (no children)
│   ├── clan-jetties-area-map.js  # Example area (polygon)
│   └── index.js             # Pin registry + helper functions
├── MapObject.jsx            # Factory wrapper — delegates to MapPin or MapArea
├── MapPin.jsx               # Leaflet Marker renderer
├── MapArea.jsx              # Leaflet Polygon renderer
├── MapView.jsx              # Map container, renders items + handles fly-to
├── LocationPanel.jsx        # Side panel showing item details
├── BackButton.jsx           # "← Back" overlay for navigation
└── CulturalMapMain.jsx      # Page orchestrator, state management
```

### How items render

Every map item flows through a single path:

```
data file → index.js registry → CulturalMapMain → MapView → MapObject → MapPin or MapArea
```

`MapObject` uses a factory pattern. It reads the item's `type` field and selects the renderer:

```js
const RENDERERS = {
  pin: MapPin,    // Leaflet Marker (circle icon)
  area: MapArea,  // Leaflet Polygon (filled shape)
};

// Falls back to MapPin for unknown types
const Renderer = RENDERERS[location.type] || RENDERERS.pin;
```

### Hierarchy and navigation

Items form a tree. Any item (pin or area) can have `children`, making it a **super-item** that users can drill into. The hierarchy is defined entirely through ID references — no nesting in the file system.

```
_root
├── heritage-core (super-pin)
│   ├── khoo-kongsi (leaf pin)
│   ├── armenian-street (leaf pin)
│   └── kapitan-keling (leaf pin)
└── waterfront-belt (super-pin)
    ├── cheong-fatt-tze (leaf pin)
    ├── chew-jetty (leaf pin)
    └── clan-jetties-area (leaf area)
```

Navigation uses a stack: clicking "Explore locations" pushes the super-item onto the stack, "← Back" pops it. The map flies to the appropriate zoom level at each transition.

---

## Data File Reference

All data files live in `src/culturalMap/data/` as flat JS files. Each file exports a single object via `export default`. The file naming convention is `<id>-map.js`.

### Pin (type: "pin")

A pin renders as a circular marker on the map.

```js
// src/culturalMap/data/khoo-kongsi-map.js
const khooKongsi = {
  id: "khoo-kongsi",          // Unique ID, used for parent-child references
  type: "pin",                // Renderer type — "pin" or "area"
  name: "Khoo Kongsi",        // Display name (English)
  nameZh: "邱公司",            // Display name (Chinese) — optional
  lat: 5.4142,                // Latitude
  lng: 100.3368,              // Longitude
  category: "clan-house",     // Category key (see CATEGORIES in index.js)
  shortDescription: "...",    // Description shown in the side panel
  address: "18, Cannon Sq",   // Street address — optional, leaf pins only
};

export default khooKongsi;
```

### Area (type: "area")

An area renders as a filled polygon on the map.

```js
// src/culturalMap/data/clan-jetties-area-map.js
const clanJettiesArea = {
  id: "clan-jetties-area",
  type: "area",
  name: "Clan Jetties",
  nameZh: "姓氏桥",
  lat: 5.4045,                // Center point — used for fly-to animation
  lng: 100.3435,
  color: "#b07a3a",           // Fill and stroke color
  shortDescription: "...",
  coordinates: [              // Polygon boundary — array of [lat, lng] pairs
    [5.4065, 100.3410],       // Vertices are connected in order,
    [5.4065, 100.3460],       // and the polygon auto-closes
    [5.4020, 100.3460],       // (last point connects back to first)
    [5.4020, 100.3410],
  ],
};

export default clanJettiesArea;
```

### Super-item (any type with children)

Any item — pin or area — becomes a super-item by adding a `children` array. When a user clicks a super-item, the side panel shows its description with an "Explore locations" button to drill into its children.

```js
// src/culturalMap/data/heritage-core-map.js
const heritageCore = {
  id: "heritage-core",
  type: "pin",
  name: "Heritage Core",
  nameZh: "文化核心区",
  lat: 5.4155,                // Center point for this group
  lng: 100.337,
  color: "var(--color-terracotta)",  // Overrides category color
  shortDescription: "...",
  children: [                 // Array of child item IDs
    "khoo-kongsi",
    "armenian-street",
    "kapitan-keling",
  ],
};

export default heritageCore;
```

Super-items are visually distinct: pins render at 32px (vs 16px for leaf pins), areas render with a heavier stroke. Children can themselves be super-items, allowing arbitrary nesting depth.

### Root file

`_root-map.js` defines which items appear at the top level of the map. It has no visual representation — it only lists children.

```js
const root = {
  id: "_root",
  children: ["heritage-core", "waterfront-belt"],
};

export default root;
```

---

## Field Reference

| Field | Type | Required | Used by | Description |
|-------|------|----------|---------|-------------|
| `id` | string | Yes | All | Unique identifier, matches filename (`<id>-map.js`) |
| `type` | `"pin"` or `"area"` | Yes | All | Determines which renderer (`MapPin` or `MapArea`) is used |
| `name` | string | Yes | All | English display name, shown in tooltips and panel |
| `nameZh` | string | No | All | Chinese/alternative name, shown below title in panel |
| `lat` | number | Yes | All | Latitude — pin position or area center (for fly-to) |
| `lng` | number | Yes | All | Longitude |
| `shortDescription` | string | Yes | All | Description text shown in the side panel |
| `category` | string | No | Pins | Key into `CATEGORIES` (e.g. `"clan-house"`). Determines badge label and color in the panel |
| `address` | string | No | Leaf pins | Street address, shown in panel metadata |
| `color` | string | No | All | Custom color (CSS value). Overrides category color if set. Falls back to `DEFAULT_PIN_COLOR` or `DEFAULT_AREA_COLOR` |
| `coordinates` | `[[lat,lng],...]` | Areas only | Areas | Polygon boundary vertices. Connected in order, auto-closes |
| `children` | `[id, ...]` | No | Super-items | Array of child item IDs. Presence makes this a super-item |

---

## How To: Common Tasks

### Add a new leaf pin

1. Create `src/culturalMap/data/<id>-map.js`:

```js
const myLocation = {
  id: "my-location",
  type: "pin",
  name: "My Location",
  lat: 5.42,
  lng: 100.34,
  category: "mansion",
  shortDescription: "A brief description.",
  address: "123 Example Street",
};

export default myLocation;
```

2. Register it in `src/culturalMap/data/index.js`:

```js
import myLocation from "./my-location-map.js";
// ...
const ALL_PINS = [
  // ... existing items
  myLocation,    // Add here
];
```

3. Add its ID to a parent's `children` array (or to `_root-map.js` if it's top-level):

```js
// In the parent's data file:
children: ["existing-child", "my-location"],
```

### Add a new area

Same steps as above, but use `type: "area"` and include `coordinates` instead of `category`/`address`. See the area data file example above.

### Add a new group (super-item)

Create a data file with a `children` array. The item can be either `type: "pin"` (renders as a large marker) or `type: "area"` (renders as a polygon). Add it to a parent's children or to `_root-map.js`.

### Add a new category

Edit `CATEGORIES` in `src/culturalMap/data/index.js`:

```js
export const CATEGORIES = {
  // ... existing categories
  "new-category": { label: "Display Label", color: "#hexcolor" },
};
```

Then use `category: "new-category"` in any leaf pin data file.

### Change an item's color

Set the `color` field directly on the item's data file. This overrides any category-derived color:

```js
color: "#e63946",           // Hex
color: "var(--color-teal)", // CSS variable
```

### Move an item to a different group

1. Remove its ID from the old parent's `children` array
2. Add its ID to the new parent's `children` array

No changes needed to the item's own data file.

### Remove an item

1. Remove its ID from its parent's `children` array
2. Remove its import and entry from `ALL_PINS` in `index.js`
3. Delete the `<id>-map.js` file
4. If it was a super-item, decide where its children should go (re-parent or also delete)

---

## Color Resolution Order

When determining an item's color, the system checks in this order:

1. `item.color` — explicit color on the data file (highest priority)
2. `CATEGORIES[item.category].color` — derived from category (pins only)
3. `DEFAULT_PIN_COLOR` / `DEFAULT_AREA_COLOR` — fallback constants defined in `index.js`

---

## Adding a New Renderer Type

The factory in `MapObject.jsx` supports extending with new visual types beyond pins and areas. To add one (e.g. `"route"`):

1. Create a renderer component (e.g. `MapRoute.jsx`) that accepts the standard props: `location`, `index`, `isLeaf`, `isSelected`, `onSelect`
2. Register it in `MapObject.jsx`:

```js
import MapRoute from "./MapRoute.jsx";

const RENDERERS = {
  pin: MapPin,
  area: MapArea,
  route: MapRoute,  // New type
};
```

3. Use `type: "route"` in data files. No other component changes needed.
