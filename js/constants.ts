const URLS = {
    OVERPASS_API: 'https://z.overpass-api.de/api/interpreter?data=',
    OSM_TILE_SERVER: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
}

const OVERPASS_QUERIES = {
    // get all indoor data from Dresden
    OVERPASS_INDOOR_QUERY: '(area["name"="Dresden"];)->.a;(nwr[indoor](area.a););(._;>;); out;',
    // get all buildings that conform the SIT standard (min_level tag is set)
    OVERPASS_SIT_BUILDINGS_QUERY: '(area["name"="Dresden"];)->.a;(nwr[building][min_level](area.a););(._;>;); out;'
}

const INDOOR_LEVEL = '0';
const FILL_OPACITY = 0.9;
const WALL_WEIGHT = 3;

const COLORS = {
    WALL: '#000000',
    WALL_SELECTED: '#068288',
    TOILET: '#dfed64',
    STAIR: '#dddddd',
    ROOM: '#025558',
    ROOM_SELECTED: '#FF6F03',
}

export {
    URLS,
    OVERPASS_QUERIES,
    INDOOR_LEVEL,
    FILL_OPACITY,
    WALL_WEIGHT,
    COLORS
};
