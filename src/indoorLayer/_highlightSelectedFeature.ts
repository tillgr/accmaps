import {COLORS} from "../services/data/constants";

let currentlySelectedFeaturePath: HTMLElement = null;
let currentlySelectedFeatureOriginalFillColor = '';

export function highlightSelectedFeature(featurePath: HTMLElement): void {
    if (currentlySelectedFeaturePath !== null) {
        currentlySelectedFeaturePath.setAttribute('fill', currentlySelectedFeatureOriginalFillColor);
    }

    currentlySelectedFeaturePath = featurePath;

    if (currentlySelectedFeaturePath.getAttribute('fill') === 'none') {
        currentlySelectedFeaturePath = null;
        return;
    }
    currentlySelectedFeatureOriginalFillColor = currentlySelectedFeaturePath.getAttribute('fill');
    currentlySelectedFeaturePath.setAttribute('fill', COLORS.ROOM_SELECTED);
}
