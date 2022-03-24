import { geoMap } from "../../main";

const btn = document.getElementById("centeringButton");

function create(): void {
  btn.addEventListener("click", geoMap.centerMapToBuilding);

  const container = document.querySelector(".leaflet-top.leaflet-right");

  container.append(btn);
}

export default {
  create,
};
