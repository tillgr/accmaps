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

    document.getElementById('map').focus();
    document.getElementsByClassName('leaflet-control-attribution')[0].setAttribute('aria-disabled', 'true');
}
