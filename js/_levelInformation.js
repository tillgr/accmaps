const propertiesByLevel = [];

export class LevelInformation {
    static generateFromGeoJSON(geoJSONFeatures) {

        const levelProperties = {
            'accessibleToilets': false,
            'accessibleFloors': false
            // TODO: add more properties
        };

        geoJSONFeatures.forEach((feature) => {
            if (feature.properties.amenity !== undefined && feature.properties.amenity === 'toilets'
                && feature.properties.wheelchair !== undefined && feature.properties.wheelchair !== 'no') {
                levelProperties.accessibleToilets = true;
            }
        });

        return levelProperties;
    }

    static getPropertiesForLevel(level, geoJSONFeatures) {
        if (propertiesByLevel[level] !== undefined) {
            return propertiesByLevel[level];
        }

        // save to array and return value
        return propertiesByLevel[level] = this.generateFromGeoJSON(geoJSONFeatures);
    }
}
