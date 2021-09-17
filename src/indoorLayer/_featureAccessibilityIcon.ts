import * as L from "leaflet";
import {GeoJSON, LatLng} from "leaflet";
import {UserProfile} from "../userProfile";
import {featureAccessibilityProperties} from "../data/featureAccessibilityProperties";
import {UserGroups} from "../data/userGroups";

export function featureAccessibilityIcon(feature: GeoJSON.Feature<any, any>, latLng: LatLng) {
    const isFeatureAccessible = featureAccessibilityProperties.some((property) => {
        return property.userGroups.includes(UserProfile.get()) && property.accessibilityFunction(feature);
    })

    if (isFeatureAccessible) {
        const iconDiv = L.divIcon({
            html: '<i class="material-icons" aria-disabled="true">' + UserGroups.get(UserProfile.get()).icon + '</i>'
        });
        return L.marker(latLng, {icon: iconDiv, bubblingMouseEvents: true});
    }

    return null;
}
