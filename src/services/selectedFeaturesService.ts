import { UserFeatureEnum } from "../models/userFeatureEnum";
import { UserFeatureSelection } from "../data/userFeatureSelection";

function getCurrentFeatures(): Map<UserFeatureEnum, boolean> {
  const currentlySelectedFeatures: Map<UserFeatureEnum, boolean> =
    localStorage.getItem("currentlySelectedFeatures")
      ? new Map(JSON.parse(localStorage.currentlySelectedFeatures))
      : (() => {
          const defaultSelectedFeatures = new Map();
          UserFeatureSelection.forEach((v, k) => {
            defaultSelectedFeatures.set(k, v.isCheckedDefault);
          });
          //console.log(defaultSelectedFeatures);
          return defaultSelectedFeatures;
        })();

  return currentlySelectedFeatures;
}

function setCurrentFeatures(
  checkboxState: Map<UserFeatureEnum, boolean>
): void {
  //currentlySelectedFeatures = checkboxState;
  localStorage.currentlySelectedFeatures = JSON.stringify(
    Array.from(checkboxState.entries())
  );
}

export default {
  getCurrentFeatures,
  setCurrentFeatures,
};
