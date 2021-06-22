import {overpassUrl} from "./constants";
import {loading, loadingEnd, loadingError} from "./_loading_indicator";

export function getOverpassData(map, callback) {
    loading();
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
        if (xhr.readyState === 4) {
            loadingEnd();
            if (xhr.status === 200) {
                callback(xhr.responseXML);
            } else if (xhr.status > 400) {
                loadingError();
            }
        }
    };

    xhr.open('GET', overpassUrl + indoorQuery, true);
    xhr.send();
}
