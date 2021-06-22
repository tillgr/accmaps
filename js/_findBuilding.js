import {overpassUrl} from "./constants";
import {loading} from "./_loading_indicator";

const buildingSearchBox = document.getElementById('buildingSearch');

export function _findBuilding(){
    loading();
    const searchTerm = buildingSearchBox.value;

    const overpassQuery = '[timeout:60]; area["name"="Dresden"];node["name"~"'+searchTerm+'"](area);\n' +
        '(._;>;); out;'

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = (data) => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(data);
        }
    };
    xhr.open('GET', overpassUrl + overpassQuery, true);
    xhr.send();
}
