import {GeoJSON} from "leaflet";

const propertiesByLevel: any[string] = [];

export const LevelInformation = {
    generateFromGeoJSON(geoJSONFeatures: GeoJSON.Feature<any, any>[]) {

        const levelProperties = {
            'accessibleToilets': false,
            'accessibleFloors': false
            // TODO: add more properties
        };

        geoJSONFeatures.forEach((feature: GeoJSON.Feature<any, any>) => {
            if (feature.properties.amenity !== undefined && feature.properties.amenity === 'toilets'
                && feature.properties.wheelchair !== undefined && feature.properties.wheelchair !== 'no') {
                levelProperties.accessibleToilets = true;
            }
        });

        return levelProperties;
    },

    getPropertiesForLevel(level: string, geoJSONFeatures: any) {
        if (propertiesByLevel[level] !== undefined) {
            return propertiesByLevel[level];
        }

        // save to array and return value
        return propertiesByLevel[level] = this.generateFromGeoJSON(geoJSONFeatures);
    }
}
