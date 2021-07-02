import osmtogeojson from "osmtogeojson";

import {filterGeoJsonData} from "./_filterGeoJsonData";
import {mapAccessibility} from "./_mapAccessibility";

import {FILL_OPACITY, INDOOR_LEVEL, ROOM_COLOR, STAIR_COLOR, TOILET_COLOR, WALL_COLOR, WALL_WEIGHT} from "./constants";

import {map} from "./_map";
import {overpassIndoorData} from "./_getOverpassData";

let indoorLayer, levelControl;


function createIndoorLayer() {
    let geoJSON = osmtogeojson(overpassIndoorData, {});

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

export {createIndoorLayer};
