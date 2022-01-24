import { geoMap } from "../../main";
const buildingSearchInput = <HTMLInputElement>(
  document.getElementById("buildingSearch")
);
const buildingSearchSubmit = <HTMLButtonElement>(
  document.getElementById("buildingSearchSubmit")
);
const clearBuildingSearch = <HTMLButtonElement>(
  document.getElementById("clearBuildingSearch")
);
const indoorSearchSubmit = <HTMLButtonElement>(
  document.getElementById("indoorSearchSubmit")
);
const indoorSearchInput = <HTMLInputElement>(
  document.getElementById("indoorSearchInput")
);
const indoorSearchWrapper = <HTMLDivElement>(
  document.getElementById("indoorSearchWrapper")
);

function render(): void {
  buildingSearchSubmit.addEventListener("click", () => {
    geoMap.runBuildingSearch(buildingSearchInput.value);
  });
  buildingSearchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      geoMap.runBuildingSearch(buildingSearchInput.value);
    }
  });
  clearBuildingSearch.addEventListener("click", () => {
    console.log(buildingSearchInput.value);

    buildingSearchInput.value === ""
      ? showError()
      : () => {
          handleBuildingSearch();
          indoorSearchInput.value = "";
        };
  });

  indoorSearchSubmit.addEventListener("click", () => {
    geoMap.handleIndoorSearch(indoorSearchInput.value);
  });

  indoorSearchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      geoMap.handleIndoorSearch(indoorSearchInput.value);
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

function toggleDisabled(element: HTMLButtonElement | HTMLInputElement): void {
  element.disabled = !element.disabled;
}

function setBuildingSearchInput(query: string): void {
  buildingSearchInput.value = query;
}

export default {
  render,
  handleBuildingSearch,
  setBuildingSearchInput,
};
