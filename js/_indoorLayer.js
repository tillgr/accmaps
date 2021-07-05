import {mapAccessibility} from "./_mapAccessibility";

import {FILL_OPACITY, ROOM_COLOR, STAIR_COLOR, TOILET_COLOR, WALL_COLOR, WALL_WEIGHT} from "./constants";

import {map} from "./_map";
import {getCurrentLevelGeoJSON} from "./_levelControl";

let indoorLayer;

function createIndoorLayer() {
    if (indoorLayer !== undefined) {
        map.removeLayer(indoorLayer);
    }

    indoorLayer = L.geoJson(getCurrentLevelGeoJSON(), {
        style: featureStyle
    });
    indoorLayer.addTo(map);
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
