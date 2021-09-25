import {LeafletMouseEvent} from "leaflet";
import {COLORS} from "../data/constants";

let currentlySelectedFeaturePath: HTMLElement = null;
let currentlySelectedFeatureOriginalFillColor = '';

export function highlightSelectedFeature(e: LeafletMouseEvent): void {
    if (e.sourceTarget.dragging !== undefined) {
        // hack: the dragging attribute is only set on markers, but not on features - use this do distinguish them
        return;
    }

    if (currentlySelectedFeaturePath !== null) {
        currentlySelectedFeaturePath.setAttribute('fill', currentlySelectedFeatureOriginalFillColor);
        currentlySelectedFeaturePath.style.filter = '';
    }

    currentlySelectedFeaturePath = <HTMLElement>e.sourceTarget._path;

    if (currentlySelectedFeaturePath.getAttribute('fill') === 'none') {
        currentlySelectedFeaturePath = null;
        return;
    }
    currentlySelectedFeatureOriginalFillColor = currentlySelectedFeaturePath.getAttribute('fill');
    currentlySelectedFeaturePath.setAttribute('fill', COLORS.ROOM_SELECTED);
    currentlySelectedFeaturePath.style.filter = 'drop-shadow(3px 3px 7px rgb(0 0 0 / 0.8))';
}
