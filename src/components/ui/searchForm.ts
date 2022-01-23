import { geoMap } from "../../main";

function render(): void {
  const buildingSearchSubmit = document.getElementById("buildingSearchSubmit");
  const buildingSearchInput = document.getElementById("buildingSearch");

  buildingSearchSubmit.addEventListener("click", () => {
    // @ts-ignore
    geoMap.runBuildingSearch(buildingSearchInput.value);
  });

  buildingSearchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // @ts-ignore
      geoMap.runBuildingSearch(buildingSearchInput.value);
    }
  });
}

export default {
  render,
};
