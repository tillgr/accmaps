import {FILL_OPACITY, ROOM_COLOR, STAIR_COLOR, TOILET_COLOR, WALL_COLOR, WALL_WEIGHT} from "./constants";

import {map} from "./_map";
import {createLevelControl, getCurrentLevelGeoJSON, getLevelsFromGeoJSON} from "./_levelControl";

let indoorLayerGroup;

function createIndoorLayer() {
    getLevelsFromGeoJSON();
    createLevelControl();
    indoorLayerGroup =  L.layerGroup();
    drawIndoorLayer();
    indoorLayerGroup.addTo(map);
}

function drawIndoorLayer(){
    clearIndoorLayer();
    const layer = L.geoJson(getCurrentLevelGeoJSON(),{
        style: featureStyle
    });
    indoorLayerGroup.addLayer(layer);
}

function clearIndoorLayer(){
    indoorLayerGroup.clearLayers();
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

export {createIndoorLayer, drawIndoorLayer, clearIndoorLayer};
