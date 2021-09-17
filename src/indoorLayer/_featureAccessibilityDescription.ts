import {LeafletEvent} from "leaflet";
import {featureAccessibilityProperties} from "../data/featureAccessibilityProperties";
import {featureDescriptionHelper} from "../helpers/featureDescriptionHelper";


export function featureAccessibilityDescription(e: LeafletEvent): string {
    const feature = e.sourceTarget.feature;
    let popUpText = feature.properties.ref ?? '(no name)';

    if (feature.properties.name !== undefined && feature.properties.name.length !== 0) {
        popUpText += ' (' + feature.properties.name + ')';
    }

    popUpText += featureDescriptionHelper(feature, featureAccessibilityProperties);

    return 'Selected map object: ' + popUpText;
}
