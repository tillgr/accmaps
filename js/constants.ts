const OVERPASS_API_URL = 'https://z.overpass-api.de/api/interpreter?data=';
const OSM_TILE_SERVER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

// get all indoor data from Dresden
const OVERPASS_INDOOR_QUERY = '(area["name"="Dresden"];)->.a;(nwr[indoor](area.a););(._;>;); out;';

// get all buildings that conform the SIT standard (min_level tag is set)
const OVERPASS_SIT_BUILDINGS_QUERY = '(area["name"="Dresden"];)->.a;(nwr[building][min_level](area.a););(._;>;); out;'

const INDOOR_LEVEL = '0';
const FILL_OPACITY = 1;
const WALL_WEIGHT = 3;
const WALL_COLOR = '#000000'
const TOILET_COLOR = '#dfed64';
const ROOM_COLOR = '#0A485B';
const STAIR_COLOR = '#dddddd';

export {
    OVERPASS_API_URL,
    OSM_TILE_SERVER,
    OVERPASS_SIT_BUILDINGS_QUERY,
    OVERPASS_INDOOR_QUERY,
    INDOOR_LEVEL,
    FILL_OPACITY,
    WALL_WEIGHT,
    WALL_COLOR,
    TOILET_COLOR,
    ROOM_COLOR,
    STAIR_COLOR
};
