const overpassUrl = 'https://z.overpass-api.de/api/interpreter?data=';
const osmTileServer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const INDOOR_LEVEL = 0;
const FILL_OPACITY = 1;
const WALL_WEIGHT = 3;
const WALL_COLOR = '#000000'
const TOILET_COLOR = '#dfed64';
const ROOM_COLOR = '#0A485B';
const STAIR_COLOR = '#dddddd';

export {
    overpassUrl,
    osmTileServer,
    INDOOR_LEVEL,
    FILL_OPACITY,
    WALL_WEIGHT,
    WALL_COLOR,
    TOILET_COLOR,
    ROOM_COLOR,
    STAIR_COLOR
};
