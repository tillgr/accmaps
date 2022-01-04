import { UserFeatureEnum } from "../models/userFeatureEnum";
import { UserFeatureSelection } from "../data/userFeatureSelection";

// get the current selection from localStorage or (if executed for the first time and nothing is set)
// fill "currentSelectedFeatures" with the default values from "data/userFeatureSelection.ts"
let currentSelectedFeatures: Map<UserFeatureEnum, boolean> =
  (localStorage.getItem("selectedFeatureService") != null) ?
    (new Map(JSON.parse(localStorage.selectedFeatureService))) :
    (function () {
      const defaultSelectedFeatures = new Map();
      UserFeatureSelection.forEach((v, k) => {
        defaultSelectedFeatures.set(k, v.isCheckedDefault)
      })
      console.log(defaultSelectedFeatures);
      return defaultSelectedFeatures;
    })();

function getCurrentSelectedFeatures(): Map<UserFeatureEnum, boolean> {
  return currentSelectedFeatures;
}

function set(checkboxState: Map<UserFeatureEnum, boolean>): void {
  currentSelectedFeatures = checkboxState;
  localStorage.selectedFeatureService = JSON.stringify(Array.from(checkboxState.entries()));
}

export default {
  getCurrentSelectedFeatures,
  set,
};
