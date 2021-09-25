import {GeoJSON} from "leaflet";
import {COLORS, FILL_OPACITY, WALL_WEIGHT} from "../data/constants";

export function featureStyle(feature: GeoJSON.Feature<any>): any {
    let fill = '#fff';

    if (feature.properties.amenity === 'toilets') {
        fill = COLORS.TOILET;
    } else if (feature.properties.stairs || (feature.properties.highway && (feature.properties.highway == 'elevator' || feature.properties.highway == 'escalator'))) {
        fill = COLORS.STAIR;
    } else if (feature.properties.indoor === 'room') {
        fill = COLORS.ROOM;
    }

    return {
        fillColor: fill,
        weight: WALL_WEIGHT,
        color: COLORS.WALL,
        fillOpacity: FILL_OPACITY
    };
}
