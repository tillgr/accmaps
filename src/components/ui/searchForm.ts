import { geoMap } from "../../main";

function render(): void {
  const buildingSearchSubmit = document.getElementById("buildingSearchSubmit");
  const buildingSearchInput = document.getElementById("buildingSearch");

  buildingSearchSubmit.addEventListener("click", () => {
    geoMap.runBuildingSearch(<HTMLInputElement>buildingSearchInput);
  });

  buildingSearchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      geoMap.runBuildingSearch(<HTMLInputElement>buildingSearchInput);
    }
  });
}

export default {
  render,
};
