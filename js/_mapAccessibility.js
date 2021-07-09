import {getMap} from "./_map";

export function mapAccessibility() {
    const map = getMap();

    const leafletShadows = document.getElementsByClassName('leaflet-shadow-pane');

    [].forEach.call(leafletShadows, (shadow) => {
        shadow.setAttribute('aria-hidden', 'true');
    });

    const mapTiles = document.querySelectorAll('.leaflet-tile-container img, .leaflet-shadow-pane img');

    [].forEach.call(mapTiles, (tile) => {
        tile.setAttribute('role', 'presentation');
        tile.setAttribute('aria-hidden', 'true'); // dont read them out
    });

    const leafletMarkers = document.getElementsByClassName('leaflet-clickable');

    [].forEach.call(leafletMarkers, (marker) => {
        marker.setAttribute('role', 'button');
    });

    map.on('popupopen', (popup) => {
        let popUpContent = popup.popup._container.getElementsByClassName('leaflet-popup-content')[0];
        let popUpCloseButton = popup.popup._container.getElementsByClassName('leaflet-popup-close-button')[0];

        popUpContent.setAttribute('tabindex', '-1');
        popUpContent.focus();

        popUpCloseButton.setAttribute('title', 'Close item');
        popUpCloseButton.setAttribute('aria-label', 'Close item');

        //re-add close button to end of popup
        popUpCloseButton.parentNode.removeChild(popUpCloseButton);
        popup.popup._container.append(popUpCloseButton)
    });

    // return focus to the icon we started from before opening the pop up
    map.on('popupclose', (popup) => {
        popup.popup._source._path.focus();
    });

    document.getElementById('map').focus();
    document.getElementsByClassName('leaflet-control-attribution')[0].setAttribute('aria-disabled', 'true');
}
