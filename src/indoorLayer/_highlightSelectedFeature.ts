import {LeafletMouseEvent} from "leaflet";
import {COLORS} from "../data/constants";

let currentlySelectedFeaturePath: HTMLElement = null;
let currentlySelectedFeatureOriginalFillColor = '';

export function highlightSelectedFeature(e: LeafletMouseEvent): void {
    if (currentlySelectedFeaturePath !== null) {
        currentlySelectedFeaturePath.setAttribute('fill', currentlySelectedFeatureOriginalFillColor);
    }

    currentlySelectedFeaturePath = <HTMLElement>e.sourceTarget._path;

    if (currentlySelectedFeaturePath.getAttribute('fill') === 'none') {
        currentlySelectedFeaturePath = null;
        return;
    }
    currentlySelectedFeatureOriginalFillColor = currentlySelectedFeaturePath.getAttribute('fill');
    currentlySelectedFeaturePath.setAttribute('fill', COLORS.ROOM_SELECTED);
}
