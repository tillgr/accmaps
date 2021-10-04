import {GeoJSON} from "leaflet";
import {COLORS, FILL_OPACITY, WALL_WEIGHT, WALL_WEIGHT_PAVING} from "../data/constants";
import {UserProfile} from "../userProfile";
import {UserGroupEnum} from "../interfaces/userGroupEnum";

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
        weight: highlightTactilePavingLines(feature),
        color: COLORS.WALL,
        fillOpacity: FILL_OPACITY
    };
}

function highlightTactilePavingLines(feature: GeoJSON.Feature<any>) {
    return (UserProfile.get() == UserGroupEnum.blindPeople && feature.geometry.type === "LineString" && feature.properties.tactile_paving === "yes") ? WALL_WEIGHT_PAVING : WALL_WEIGHT
}
