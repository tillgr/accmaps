import {GeoJSON} from "leaflet";
import {levelAccessibilityProperties} from "../data/levelAccessibilityProperties";
import {UserProfile} from "../userProfile";

const propertiesByLevel: Map<string, string> = new Map<string, string>();

export const LevelAccessibilityInformation = {
    getForLevel(level: string, featureCollection: GeoJSON.FeatureCollection<any, any>): string {
        if (propertiesByLevel.get(level) !== undefined) {
            return propertiesByLevel.get(level);
        }

        propertiesByLevel.set(level, generateFromGeoJSON(featureCollection.features))
        return propertiesByLevel.get(level);
    },

    reset(){
        propertiesByLevel.clear()
    }
}

function generateFromGeoJSON(geoJSONFeatures: GeoJSON.Feature<any, any>[]) {
    let returnString = "";

    levelAccessibilityProperties.forEach((levelAccessibilityProperty) => {
        if (!levelAccessibilityProperty.userGroups.includes(UserProfile.get())) {
            return; // only show properties for currently selected user profile
        }

        const foundAccessibilityFeature = geoJSONFeatures.some((feature: GeoJSON.Feature<any, any>) => {
            return (levelAccessibilityProperty.accessibilityFunction(feature));
        });

        if (foundAccessibilityFeature) {
            returnString += levelAccessibilityProperty.msgTrue;
        } else {
            returnString += levelAccessibilityProperty.msgFalse;
        }
        returnString += ', ';
    });

    //remove last comma
    return returnString.slice(0, -2);
}
