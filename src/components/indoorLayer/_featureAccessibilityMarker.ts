import {GeoJSON, Icon, LatLng, Marker} from "leaflet";
import {UserProfile} from "../../services/userService";
import {featureAccessibilityProperties} from "../../services/data/featureAccessibilityProperties";
import {MARKERS_IMG_DIR} from "../../services/data/constants";

const polygonCenter = require('geojson-polygon-center');

function featureAccessibilityMarker(feature: GeoJSON.Feature): Marker {
    let iconFileName = '';

    const isFeatureAccessible = featureAccessibilityProperties.some((property) => {
        if (property.userGroups.includes(UserProfile.get()) && property.accessibilityFunction(feature) && property.iconFilename !== undefined) {
            iconFileName = property.iconFilename;
            return true;
        }
        return false;
    })

    if (isFeatureAccessible) {
        const featureCenter = polygonCenter(feature);
        const featureCenterLatLng = new LatLng(featureCenter.coordinates[1], featureCenter.coordinates[0])

        const icon = new Icon({
            iconUrl: MARKERS_IMG_DIR + iconFileName,
            iconSize: [48, 48]
        });

        return new Marker(featureCenterLatLng, {
            icon: icon
        });
    }
    return null;
}


export {featureAccessibilityMarker};
