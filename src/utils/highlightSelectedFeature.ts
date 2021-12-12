import { COLORS } from "../data/constants";

let path: HTMLElement = null; //currentlySelectedFeaturePath
let fill = ""; //currentlySelectedFeatureOriginalFillColor

export function highlightSelectedFeature(currentPath: HTMLElement): void {
  //change
  if (path !== null) {
    path.setAttribute("fill", fill);
  }

  path = currentPath;

  //no fill available
  if (path.getAttribute("fill") === "none") {
    path = null;
    return;
  }

  //store
  fill = path.getAttribute("fill");

  //change
  path.setAttribute("fill", COLORS.ROOM_SELECTED);
}
