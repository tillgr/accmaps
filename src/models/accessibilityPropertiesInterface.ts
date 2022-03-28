import { UserGroupsEnum } from "./userGroupsEnum";
import { GeoJSON } from "leaflet";
import { UserFeaturesEnum } from "./userFeaturesEnum";

export interface AccessibilityPropertiesInterface {
  hasCorrectProperties: (feature: GeoJSON.Feature<any, any>) => boolean;
  msgTrue: string | ((feature: GeoJSON.Feature<any, any>) => string);
  msgFalse: string | ((feature: GeoJSON.Feature<any, any>) => string) | null;
  userGroups: UserGroupsEnum[];
  iconFilename?: string;
  tags?: UserFeaturesEnum[];
}
