import {nominantimUrl} from "./constants";

const buildingSearchBox = document.getElementById('buildingSearch');

export function findBuilding(){
    const searchTerm = buildingSearchBox.value;

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = (data) => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(data);
        }
    };
    xhr.open('GET', nominantimUrl + searchTerm, true);
    xhr.setRequestHeader('User-Agent', 'AccessibleMaps TU Dresden');

    xhr.send();
}
