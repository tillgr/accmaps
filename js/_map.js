import 'leaflet/src/Leaflet';
import './leafletIndoor'

import {cleanJSON} from "./_cleanJSON";
import {getOSM} from "./_getOSM";

const INDOOR_ZOOM_LEVEL = 17;
const INDOOR_LEVEL = 0;
const FILL_OPACITY = 1;

let map;

export function createMap() {
    const osmUrl = 'https://a.tile.openstreetmap.de/{z}/{x}/{y}.png ';

    const osmTileLayer = new L.TileLayer(osmUrl, {
        maxZoom: 19,
        attribution: "Map data &copy; OpenStreetMap contributors"
    });

    map = new L.Map('map', {
        center: new L.LatLng(51.0255439, 13.722259),
        zoom: 19
    });

    L.Icon.Default.imagePath = '/assets/icon';

    osmTileLayer.addTo(map);

    getOSM(map, createIndoorLayer);
}


function createIndoorLayer(data) {
    let geoJSON = cleanJSON(data);
    console.log('create indoor layer');

    const indoorLayer = new L.Indoor(geoJSON, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(JSON.stringify(feature.properties, null, 10));
        },
        style: tagFilter
    });

    indoorLayer.setLevel(INDOOR_LEVEL);
    indoorLayer.addTo(map);

    createLevelControl(indoorLayer);
}

function createLevelControl(indoorLayer) {
    const levelControl = new L.Control.Level({
        level: "0",
        levels: indoorLayer.getLevels()
    });

    levelControl.addEventListener("levelchange", indoorLayer.setLevel, indoorLayer);

    levelControl.addTo(map);
}

function tagFilter(feature) {
    let fill = 'white';
    let wallColor = '#000';
    const opacity = FILL_OPACITY;
    const wall_weight = -INDOOR_ZOOM_LEVEL + 1 + map.getZoom();

    if (feature.properties.tags !== undefined) {
        if (feature.properties.tags.amenity === 'toilets') {
            fill = '#dfed64';
        } else if (feature.properties.tags.indoor === "room") {
            fill = '#0A485B';
        }
        if (feature.properties.tags.stairs) {
            wallColor = '#000';
        }
    }

    return {
        fillColor: fill,
        weight: wall_weight,
        color: wallColor,
        fillOpacity: opacity
    };
}
