import {GeoJSON} from "leaflet";
import {LevelAccessibilityInterface} from "../interfaces/levelAccessibilityInterface";
import {UserGroupEnum} from "../interfaces/userGroupEnum";

export const levelAccessibilityProperties: LevelAccessibilityInterface[] = [
    {
        accessibilityFunction: (feature: GeoJSON.Feature<any, any>) =>
            (feature.properties.amenity !== undefined && feature.properties.amenity === 'toilets'
                && feature.properties.wheelchair !== undefined && feature.properties.wheelchair !== 'no'),
        msgTrue: 'there are accessible toilets',
        msgFalse: 'no accessible toilets available',
        userGroups: [UserGroupEnum.wheelchairUsers]
    },
    {
        accessibilityFunction: (feature: GeoJSON.Feature<any, any>) =>
            (feature.properties.tactile_paving !== undefined && feature.properties.tactile_paving === 'yes'),
        msgTrue: 'tactile paving available',
        msgFalse: 'no tactile paving available',
        userGroups: [UserGroupEnum.blindPeople]
    },
];
