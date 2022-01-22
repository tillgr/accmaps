import { geoMap } from "../../main";

const btn = document.getElementById("centeringButton");

function create(): void {
    btn.addEventListener("click", geoMap.centerMapToBuilding);
}

export default {
    create
};