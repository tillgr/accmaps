import {overpassUrl} from "./constants";
import {loading, loadingEnd, loadingError} from "./_loading_indicator";
import {map} from "./_map";

const buildingSearchBox = document.getElementById('buildingSearch');

export function findBuilding() {
    loading();
    const searchTerm = buildingSearchBox.value;

    const overpassQuery = '(area["name"="Dresden"];)->.a;' +
        '(way["name"="' + searchTerm + '"](area.a); way["loc_ref"="' + searchTerm + '"](area.a););' +
        '(._;>;); out;'

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = (data) => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            loadingEnd();
            centerMapToMainEntrance(xhr.responseXML);

            document.querySelectorAll(".modal")[0].M_Modal.close();
        } else {
            loadingError();
        }
    };
    xhr.open('GET', overpassUrl + overpassQuery, true);
    xhr.send();
}

function centerMapToMainEntrance(xmlResponse) {
    const nodes = xmlResponse.getElementsByTagName('node');
    let lat, lon;

    for (let i = 0; i < nodes.length; i++) {
        const tags = nodes[i].getElementsByTagName('tag');
        for (let j = 0; j < tags.length; j++) {
            if (tags[j].hasAttribute('k') && tags[j].getAttribute('k') === 'entrance' && tags[j].getAttribute('v') === 'main') {
                lat = nodes[i].getAttribute('lat');
                lon = nodes[i].getAttribute('lon');

                map.panTo(new L.LatLng(lat, lon));
                return;
            }
        }
    }

}
