import 'leaflet/src/Leaflet';
import './leafletIndoor'

import {filterGeoJsonData} from "./_filterGeoJsonData";
import {getOverpassData} from "./_getOverpassData";
import {mapAccessibility} from "./_mapAccessibility";

import osmtogeojson from "osmtogeojson";

import {
    osmTileServer,
    FILL_OPACITY,
    ROOM_COLOR,
    STAIR_COLOR,
    WALL_COLOR,
    WALL_WEIGHT,
    INDOOR_LEVEL,
    TOILET_COLOR
} from "./constants";

let map;
let indoorLayer, levelControl;

L.Icon.Default.imagePath = '/assets/icons';

export function createMap() {
    const osmTileLayer = new L.TileLayer(osmTileServer, {maxZoom: 19});
    const mapIcon = L.divIcon(); // use Div instead of icon images

    map = new L.Map('map', {
        center: new L.LatLng(51.0255439, 13.722780),
        zoom: 19,
        icon: mapIcon
    });

    osmTileLayer.addTo(map);
    mapAccessibility();

    getOverpassData(map, createIndoorLayer);

    map.on("moveend", function () {
        getOverpassData(map, createIndoorLayer);
    });
}

export {map};


function createIndoorLayer(data) {
    let geoJSON = osmtogeojson(data, {
        polygonFeatures: {
            'building:part': true
        }
    });

    geoJSON = filterGeoJsonData(geoJSON);

    if (indoorLayer !== undefined) {
        map.removeLayer(indoorLayer);
    }

    indoorLayer = new L.Indoor(geoJSON, {
        onEachFeature: (feature, layer) => {
            let popUpText = feature.properties.ref ?? 'ohne Bezeichnung';
            let cellName = feature.properties.name;
            if (cellName !== undefined && cellName.length !== 0) {
                popUpText += '&nbsp;(' + cellName + ')';
            }
            layer.bindPopup(popUpText);
        },
        style: featureStyle
    });

    indoorLayer.setLevel(INDOOR_LEVEL);
    indoorLayer.addTo(map);

    createLevelControl();
}

function createLevelControl() {
    if (levelControl !== undefined) {
        levelControl._container.remove();
    }

    levelControl = new L.Control.Level({
        level: "0",
        levels: indoorLayer.getLevels()
    });

    levelControl.addEventListener("levelchange", indoorLayer.setLevel, indoorLayer);
    levelControl.addTo(map);

    mapAccessibility();
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
