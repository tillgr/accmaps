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
const clearIndoorSearch = <HTMLButtonElement>(
  document.getElementById("clearIndoorSearch")
);

const state: {
  currentSearchState: string;
  buildingSearchQuery: string;
  indoorSearchQuery: string;
} = {
  currentSearchState: "indoor",
  buildingSearchQuery: "",
  indoorSearchQuery: "",
};

function render(): void {
  buildingSearchSubmit.addEventListener("click", () => {
    state.buildingSearchQuery = buildingSearchInput.value;
    toggleSearchState();

    geoMap.runBuildingSearch(buildingSearchInput.value);
  });
  buildingSearchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      state.buildingSearchQuery = buildingSearchInput.value;
      toggleSearchState();

      geoMap.runBuildingSearch(buildingSearchInput.value);
    }
  });
  clearBuildingSearch.addEventListener("click", () => {
    if (buildingSearchInput.value !== "") {
      buildingSearchInput.value = "";
      state.buildingSearchQuery = buildingSearchInput.value;

      indoorSearchInput.value = "";
      state.indoorSearchQuery = indoorSearchInput.value;

      state.currentSearchState = "building";
      toggleSearchState();

      console.log(state);
    } else showError();
  });

  indoorSearchSubmit.addEventListener("click", () => {
    state.indoorSearchQuery = indoorSearchInput.value;

    geoMap.handleIndoorSearch(indoorSearchInput.value);
  });

  indoorSearchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      state.indoorSearchQuery = indoorSearchInput.value;
      toggleSearchState();

      geoMap.handleIndoorSearch(indoorSearchInput.value);
    }
  });

  clearIndoorSearch.addEventListener("click", () => {
    if (indoorSearchInput.value !== "") {
      indoorSearchInput.value = "";
      state.indoorSearchQuery = indoorSearchInput.value;

      console.log(state);
    } else showError();
  });
}

function toggleSearchState() {
  console.log("before", state);

  state.currentSearchState === "indoor"
    ? (state.currentSearchState = "building")
    : (state.currentSearchState = "indoor");

  console.log("after", state);
  handleChange();
}

function handleChange() {
  const isIndoor = state.currentSearchState === "indoor";
  const isBuilding = state.currentSearchState === "building";

  setDisabled(buildingSearchInput, isBuilding);
  setDisabled(buildingSearchSubmit, isBuilding);
  setDisabled(indoorSearchInput, isIndoor);
  setDisabled(indoorSearchSubmit, isIndoor);
}

function showError() {
  console.log("error!");
}

function setDisabled(
  element: HTMLButtonElement | HTMLInputElement,
  value: boolean
): void {
  element.disabled = value;
}

function setBuildingSearchInput(query: string): void {
  buildingSearchInput.value = query;
  state.buildingSearchQuery = query;
}

export default {
  render,
  setBuildingSearchInput,
};
