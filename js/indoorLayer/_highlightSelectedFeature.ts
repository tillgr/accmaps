import {LeafletEvent} from "leaflet";
import {COLORS} from "../data/constants";

let currentlySelectedFeaturePath: HTMLElement = null;

export function highlightSelectedFeature(e: LeafletEvent) {
    if (currentlySelectedFeaturePath !== null) {
        currentlySelectedFeaturePath.setAttribute('fill', COLORS.ROOM);
        currentlySelectedFeaturePath.style.filter = '';
    }

    currentlySelectedFeaturePath = <HTMLElement>e.sourceTarget._path;

    if (currentlySelectedFeaturePath.getAttribute('fill') === 'none') {
        currentlySelectedFeaturePath = null;
        return;
    }
    currentlySelectedFeaturePath.setAttribute('fill', COLORS.ROOM_SELECTED);
    currentlySelectedFeaturePath.style.filter = 'drop-shadow(3px 3px 7px rgb(0 0 0 / 0.8))';
}
