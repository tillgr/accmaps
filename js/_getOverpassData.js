import {overpassUrl} from "./constants";

export function getOverpassData(map, callback) {
    const loading_indicator = document.getElementById('loading_indicator');
    loading_indicator.style.display = 'block';

    let bounds = map.getBounds();
    let indoorQuery = "[timeout:25];" +
        "(nwr[indoor](" +
        bounds.getSouth() + "," +
        bounds.getWest() + "," +
        bounds.getNorth() + "," +
        bounds.getEast() + ");" +
        "nwr[building](" +
        bounds.getSouth() + "," +
        bounds.getWest() + "," +
        bounds.getNorth() + "," +
        bounds.getEast() + "););" +
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
