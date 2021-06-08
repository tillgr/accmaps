import 'leaflet/src/Leaflet';
import './leafletIndoor'

import {filterGeoJsonData} from "./_filterGeoJsonData";
import {getOSM} from "./_getOSM";

import osmtogeojson from "osmtogeojson";

const INDOOR_ZOOM_LEVEL = 17;
const INDOOR_LEVEL = 0;
const FILL_OPACITY = 1;

let map;

export function createMap() {
    const osmUrl = 'https://a.tile.openstreetmap.de/{z}/{x}/{y}.png ';

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
