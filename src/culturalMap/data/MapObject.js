/**
 * Read-only view of one map object's data (a *-map.js file). A parent's
 * `children` holds its children's data objects (import their *-map.js files),
 * and the constructor builds them, so every object carries its own subtree.
 * `context.categories` is the owning map's category table.
 */
export class MapObject {
  #id;
  #type;
  #period;
  #name;
  #nameZh;
  #lat;
  #lng;
  #color;
  #category;
  #shortDescription;
  #address;
  #children;

  constructor(json, context = {}) {
    this.#id = json.id;
    this.#type = json.type;
    this.#period = json.period;
    this.#name = json.name;
    this.#nameZh = json.nameZh;
    this.#lat = json.lat;
    this.#lng = json.lng;
    this.#category = context.categories?.[json.category];
    this.#color = json.color || this.#category?.color;
    this.#shortDescription = json.shortDescription;
    this.#address = json.address;
    this.#children = Object.freeze(
      (json.children || []).map((child) => createMapObject(child, context))
    );
  }

  getId() {
    return this.#id;
  }

  getType() {
    return this.#type;
  }

  getPeriod() {
    return this.#period;
  }

  getName() {
    return this.#name;
  }

  getNameZh() {
    return this.#nameZh;
  }

  getLat() {
    return this.#lat;
  }

  getLng() {
    return this.#lng;
  }

  getCategoryLabel() {
    return this.#category?.label;
  }

  getShortDescription() {
    return this.#shortDescription;
  }

  getAddress() {
    return this.#address;
  }

  getChildren() {
    return this.#children;
  }

  isLeaf() {
    return this.#children.length === 0;
  }

  getColor() {
    return this.#color || this.constructor.DEFAULT_COLOR;
  }
}

export class MapPin extends MapObject {
  static DEFAULT_COLOR = "#3b82f6";
}

export class MapArea extends MapObject {
  static DEFAULT_COLOR = "#3b82f6";

  #coordinates;

  constructor(json, context) {
    super(json, context);
    this.#coordinates = Object.freeze(
      json.coordinates.map((point) => Object.freeze([...point]))
    );
  }

  getCoordinates() {
    return this.#coordinates;
  }
}

const CLASSES_BY_TYPE = {
  pin: MapPin,
  area: MapArea,
};

export function createMapObject(json, context) {
  const MapObjectClass = CLASSES_BY_TYPE[json?.type];
  if (!MapObjectClass) {
    throw new Error(`Map object "${json?.id ?? json}" has unknown type "${json?.type}"`);
  }
  return new MapObjectClass(json, context);
}
