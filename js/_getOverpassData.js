import {overpassUrl} from "./constants";

export function getOverpassData(map, callback) {
    const loading_indicator = document.getElementById('loading_indicator');
    loading_indicator.style.display = 'block';

    let bounds = map.getBounds();
    const south = bounds.getSouth();
    const west = bounds.getWest();
    const east = bounds.getEast();
    const north = bounds.getNorth();

    let indoorQuery = "[timeout:25];" +
        "(nwr[indoor](" +
        south + "," +
        west + "," +
        north + "," +
        east + "););" +
        "(._;>;);" +
        "out;"

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseXML);
            loading_indicator.style.display = 'none';
        }
    };

    xhr.open('GET', overpassUrl + indoorQuery, true);
    xhr.send();
}
