import { geoMap } from "../../main";
const buildingSearchInput = document.getElementById("buildingSearch");
const buildingSearchSubmit = document.getElementById("buildingSearchSubmit");
const clearBuildingSearch = document.getElementById("clearBuildingSearch");
const indoorSearchSubmit = document.getElementById("indoorSearchSubmit");
const indoorSearchInput = document.getElementById("indoorSearchInput");
const indoorSearchWrapper = document.getElementById("indoorSearchWrapper");

function render(): void {
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
  clearBuildingSearch.addEventListener("click", () => {
    // @ts-ignore
    buildingSearchInput.value = "";
    // @ts-ignore
    indoorSearchInput.value = "";

    handleBuildingSearch(); //TODO fix toggle
  });

  indoorSearchSubmit.addEventListener("click", () => {
    geoMap.handleIndoorSearch(<HTMLInputElement>indoorSearchInput);
  });

  indoorSearchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      geoMap.handleIndoorSearch(<HTMLInputElement>indoorSearchInput);
    }
  });

  //TODO render components here

  toggleDisabled(indoorSearchInput);
  toggleDisabled(indoorSearchSubmit);
}

function showError() {
  console.log("error!");
}

function handleBuildingSearch(): void {
  toggleDisabled(buildingSearchInput);
  toggleDisabled(buildingSearchSubmit);

  toggleDisabled(indoorSearchInput);
  toggleDisabled(indoorSearchSubmit);
}

function toggleDisabled(element: HTMLElement): void {
  // @ts-ignore
  element.disabled = !element.disabled;
}

function setBuildingSearchInput(query: string): void {
  // @ts-ignore
  buildingSearchInput.value = query;
}

export default {
  render,
  handleBuildingSearch,
  setBuildingSearchInput,
};
