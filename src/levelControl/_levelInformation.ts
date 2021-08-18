import {GeoJSON} from "leaflet";
import {LevelAccessibilityProperties} from "../interfaces/levelAccessibilityProperties";

const propertiesByLevel: Map<string, LevelAccessibilityProperties> = new Map<string, LevelAccessibilityProperties>();

export const LevelInformation = {
    getForLevel(level: string, featureCollection: GeoJSON.FeatureCollection<any, any>): LevelAccessibilityProperties {
        if (propertiesByLevel.get(level) !== undefined) {
            return propertiesByLevel.get(level);
        }

        propertiesByLevel.set(level, generateFromGeoJSON(featureCollection.features))
        return propertiesByLevel.get(level);
    }
}

function generateFromGeoJSON(geoJSONFeatures: GeoJSON.Feature<any, any>[]) {
    const levelProperties: LevelAccessibilityProperties = {
        accessibleToilets: false,
        accessibleFloors: false
    };

    geoJSONFeatures.forEach((feature: GeoJSON.Feature<any, any>) => {
        if (feature.properties.amenity !== undefined && feature.properties.amenity === 'toilets'
            && feature.properties.wheelchair !== undefined && feature.properties.wheelchair !== 'no') {
            levelProperties.accessibleToilets = true;
        }
    });
    return levelProperties;
}
