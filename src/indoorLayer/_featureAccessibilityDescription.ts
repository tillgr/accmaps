import {LeafletEvent} from "leaflet";
import {featureAccessibilityProperties} from "../data/featureAccessibilityProperties";
import {FeatureAccessibilityPropertiesInterface} from "../interfaces/featureAccessibilityPropertiesInterface";


export function featureAccessibilityDescription(e: LeafletEvent): string {
    const feature = e.sourceTarget.feature;
    let popUpText = feature.properties.ref ?? 'ohne Bezeichnung';

    if (feature.properties.name !== undefined && feature.properties.name.length !== 0) {
        popUpText += ' (' + feature.properties.name + ')';
    }

    featureAccessibilityProperties.forEach((e: FeatureAccessibilityPropertiesInterface) => {
        if (feature.properties[e.name] !== undefined &&
            (e.value === true || feature.properties[e.name] === e.value)) {
            popUpText += ', ' + (e.message ? e.message : feature.properties[e.name]);
        }
    });
    return 'selected map object: ' + popUpText;
}
