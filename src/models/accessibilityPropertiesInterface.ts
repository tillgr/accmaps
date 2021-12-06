import {UserGroupEnum} from "./userGroupEnum";
import {GeoJSON} from "leaflet";

export interface AccessibilityPropertiesInterface {
    accessibilityFunction: ((feature: GeoJSON.Feature<any, any>) => boolean),
    msgTrue: string | ((feature: GeoJSON.Feature<any, any>) => string),
    msgFalse: string | ((feature: GeoJSON.Feature<any, any>) => string) | null,
    userGroups: UserGroupEnum[],
    iconFilename?: string
}
