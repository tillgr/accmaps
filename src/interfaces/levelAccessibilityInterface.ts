import {GeoJSON} from "leaflet";
import {UserGroupEnum} from "./userGroupEnum";

export interface LevelAccessibilityInterface {
    accessibilityFunction: ((feature: GeoJSON.Feature<any, any>) => boolean),
    msgTrue: string,
    msgFalse: string,
    userGroups: UserGroupEnum[]
}
