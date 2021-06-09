import 'leaflet/src/Leaflet';
import './leafletIndoor'

import {filterGeoJsonData} from "./_filterGeoJsonData";
import {getOSM} from "./_getOSM";

import osmtogeojson from "osmtogeojson";

const INDOOR_LEVEL = 0;
const FILL_OPACITY = 1;
const WALL_WEIGHT = 3;
const WALL_COLOR = '#000000'
const TOILET_COLOR = '#dfed64';
const ROOM_COLOR = '#0A485B';
const STAIR_COLOR = '#dddddd';

let map;

export function createMap() {
    const osmUrl = '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    const osmTileLayer = new L.TileLayer(osmUrl, {
        maxZoom: 19,
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
    let geoJSON = osmtogeojson(data, {
        polygonFeatures: {
            'building:part': true
        }
    });

    geoJSON = filterGeoJsonData(geoJSON);

    const indoorLayer = new L.Indoor(geoJSON, {
        onEachFeature: (feature, layer) => {
            let popUpText = feature.properties.ref ?? 'ohne Bezeichnung';
            let cellName = feature.properties.name;
            if (cellName !== undefined && cellName.lenght !== 0) {
                popUpText += '&nbsp;(' + cellName + ')';
            }
            layer.bindPopup(popUpText);
        },
        style: featureStyle
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

function featureStyle(feature) {
    let fill = '#fff';

    if (feature.properties.amenity === 'toilets') {
        fill = TOILET_COLOR;
    } else if (feature.properties.indoor === "room") {
        fill = ROOM_COLOR;
    } else if (feature.properties.stairs) {
        fill = STAIR_COLOR;
    }

    return {
        fillColor: fill,
        weight: WALL_WEIGHT,
        color: WALL_COLOR,
        fillOpacity: FILL_OPACITY
    };
}
