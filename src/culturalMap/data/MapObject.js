import { CATEGORIES } from "./categories.js";

/**
 * Read-only view of one map object's data (a *-map.js file). A parent's
 * `children` holds its children's data objects (import their *-map.js files),
 * and the constructor builds them, so every object carries its own subtree.
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

  constructor(json) {
    this.#id = json.id;
    this.#type = json.type;
    this.#period = json.period;
    this.#name = json.name;
    this.#nameZh = json.nameZh;
    this.#lat = json.lat;
    this.#lng = json.lng;
    this.#color = json.color;
    this.#category = json.category;
    this.#shortDescription = json.shortDescription;
    this.#address = json.address;
    this.#children = Object.freeze((json.children || []).map(createMapObject));
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

  getCategory() {
    return this.#category;
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
    return (
      this.#color ||
      CATEGORIES[this.#category]?.color ||
      this.constructor.DEFAULT_COLOR
    );
  }
}

export class MapPin extends MapObject {
  static DEFAULT_COLOR = "#3b82f6";
}

export class MapArea extends MapObject {
  static DEFAULT_COLOR = "#3b82f6";

  #coordinates;

  constructor(json) {
    super(json);
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

export function createMapObject(json) {
  const MapObjectClass = CLASSES_BY_TYPE[json?.type];
  if (!MapObjectClass) {
    throw new Error(`Map object "${json?.id ?? json}" has unknown type "${json?.type}"`);
  }
  return new MapObjectClass(json);
}
