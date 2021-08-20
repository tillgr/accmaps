const URLS = {
    OVERPASS_API: 'https://z.overpass-api.de/api/interpreter?data=',
    OSM_TILE_SERVER: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
}

const OVERPASS_QUERIES = {
    // get all indoor data from Dresden
    INDOOR: '(area["name"="Dresden"];)->.a;(nwr[indoor](area.a););(._;>;); out;',
    // get all buildings that conform the SIT standard (min_level tag is set)
    SIT_BUILDINGS: '(area["name"="Dresden"];)->.a;(nwr[building][min_level](area.a););(._;>;); out;'
};

const RESOURCES_TO_DOWNLOAD = [
    {
        url: URLS.OVERPASS_API + OVERPASS_QUERIES.INDOOR,
        dest: '../public/overpass/indoor.xml'
    },
    {
        url: URLS.OVERPASS_API + OVERPASS_QUERIES.SIT_BUILDINGS,
        dest: '../public/overpass/buildings.xml'
    }
]

module.exports = {URLS, OVERPASS_QUERIES, RESOURCES_TO_DOWNLOAD};
