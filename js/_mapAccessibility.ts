export function mapAccessibility() {
    const leafletShadows = document.getElementsByClassName('leaflet-shadow-pane');

    [].forEach.call(leafletShadows, (shadow: Element) => {
        shadow.setAttribute('aria-hidden', 'true');
    });

    const mapTiles = document.querySelectorAll('.leaflet-tile-container img, .leaflet-shadow-pane img');

    [].forEach.call(mapTiles, (tile: Element) => {
        tile.setAttribute('role', 'presentation');
        tile.setAttribute('aria-hidden', 'true'); // dont read them out
    });

    const leafletMarkers = document.getElementsByClassName('leaflet-clickable');

    [].forEach.call(leafletMarkers, (marker: Element) => {
        marker.setAttribute('role', 'button');
    });

    document.getElementsByClassName('leaflet-control-attribution')[0].setAttribute('aria-disabled', 'true');
}
