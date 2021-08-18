export function featureScreenAccessibility() {
    const featurePaths = document.getElementsByClassName('leaflet-interactive');
    for (let i = 0; i < featurePaths.length; i++) {
        featurePaths[i].setAttribute('role', 'button');
    }
}
