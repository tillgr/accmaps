import {GeoJSON, Icon, LatLng, Marker} from "leaflet";
import {UserProfile} from "../userProfile";
import {featureAccessibilityProperties} from "../data/featureAccessibilityProperties";
import {Map} from "../map";

const polygonCenter = require('geojson-polygon-center');

let markers = new Array<Marker>();

export function featureAccessibilityIcon(feature: GeoJSON.Feature): void {
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
            iconUrl: 'images/' + iconFileName,
            iconSize: [48, 48]
        })
        const marker = new Marker(featureCenterLatLng, {
            icon: icon
        });
        marker.addTo(Map.get());

        markers.push(marker);
    }
}

export function removeMarkers() {
    for (let i = 0; i < markers.length; i++) {
        Map.get().removeLayer(markers[i]);
    }
    markers = [];
}
