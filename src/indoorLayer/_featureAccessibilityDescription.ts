import {LeafletEvent} from "leaflet";
import {featureAccessibilityProperties} from "../data/featureAccessibilityProperties";
import {featureDescription} from "../featureDescription";


export function featureAccessibilityDescription(e: LeafletEvent): string {
    const feature = e.sourceTarget.feature;
    let popUpText = feature.properties.ref ?? 'ohne Bezeichnung';

    if (feature.properties.name !== undefined && feature.properties.name.length !== 0) {
        popUpText += ' (' + feature.properties.name + ')';
    }

    popUpText += featureDescription(feature, featureAccessibilityProperties);

    return 'selected map object: ' + popUpText;
}
