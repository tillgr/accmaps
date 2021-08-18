const INDOOR_LEVEL = '0';
const FILL_OPACITY = 0.9;
const WALL_WEIGHT = 3;

const OSM_TILE_SERVER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const OVERPASS_DATA_URLS = {
    INDOOR: '/overpass/indoor.xml',
    BUILDINGS: '/overpass/buildings.xml'
}

const COLORS = {
    WALL: '#000000',
    WALL_SELECTED: '#068288',
    TOILET: '#dfed64',
    STAIR: '#dddddd',
    ROOM: '#025558',
    ROOM_SELECTED: '#FF6F03',
}

export {
    OSM_TILE_SERVER,
    OVERPASS_DATA_URLS,
    INDOOR_LEVEL,
    FILL_OPACITY,
    WALL_WEIGHT,
    COLORS
};
