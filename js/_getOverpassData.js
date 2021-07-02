import {overpassUrl} from "./constants";
import {loading, loadingEnd, loadingError} from "./_loading_indicator";

const overpassInitialQuery = '(area["name"="Dresden"];)->.a;(nwr[indoor](area.a););(._;>;); out;';

let overpassIndoorData;

function getOverpassData(callback) {
    loading();

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            loadingEnd();
            if (xhr.status === 200) {
                overpassIndoorData = xhr.responseXML
                callback();
            } else if (xhr.status > 400) {
                loadingError();
            }
        }
    };

    xhr.open('GET', overpassUrl + overpassInitialQuery, true);
    xhr.send();
}

export {getOverpassData, overpassIndoorData};
