const INDOOR_LEVEL = "0";
const FILL_OPACITY = 0.9;
const WALL_WEIGHT = 1;
const WALL_WEIGHT_PAVING = 3;

const OSM_TILE_SERVER = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const NOMINATIM_SERVER = "https://open.mapquestapi.com/nominatim/v1/search.php";
const MAPQUEST_API_KEY = "qjp4XJGBDGe98cl7QOPOgExZhNWX1lEx";

const OVERPASS_DATA_URLS = {
  INDOOR: "/overpass/indoor.json",
  BUILDINGS: "/overpass/buildings.json",
};

const MARKERS_IMG_DIR = "/images/";

const MAP_START_LAT = 51.0255439;
const MAP_START_LNG = 13.72278;

const DEFAULT_BUILDING_SEARCH_STRING = "APB";
const OSM_ATTRIBUTION =
  'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export {
  NOMINATIM_SERVER,
  MAPQUEST_API_KEY,
  OSM_TILE_SERVER,
  OVERPASS_DATA_URLS,
  MARKERS_IMG_DIR,
  MAP_START_LAT,
  MAP_START_LNG,
  DEFAULT_BUILDING_SEARCH_STRING,
  INDOOR_LEVEL,
  OSM_ATTRIBUTION,
  FILL_OPACITY,
  WALL_WEIGHT,
  WALL_WEIGHT_PAVING,
};
