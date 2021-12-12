import { INDOOR_LEVEL } from "../../services/data/constants";
import {
  getCurrentLevelDescription,
  getLevelNames,
  LevelService,
} from "../../services/levelService";
import { AccessibilityService } from "../../services/accessibilityService";
import { IndoorLayer } from "../indoorLayer";
import { DescriptionArea } from "./descriptionArea";

let indoorLayer: IndoorLayer;
let currentLevel = INDOOR_LEVEL;

export function reCreate(): void {
  AccessibilityService.reset();
  remove();
  create();
}

//TODO call in map comoponent
function create(): void {
  indoorLayer = new IndoorLayer(LevelService.getCurrentLevelGeoJSON());
  const levelNames = getLevelNames();
  render(levelNames);
}
//TODO call in map comoponent
function remove(): void {
  document.getElementById("levelControl").innerHTML = "";

  if (indoorLayer) {
    indoorLayer.removeIndoorLayerFromMap();
  }
}

export function render(allLevelNames: string[]): void {
  const levelControl = document.getElementById("levelControl");

  allLevelNames.forEach((level: string) => {
    const changeToLevel = "change to level " + level;
    const levelBtn = document.createElement("li");
    levelBtn.className = "page-item";
    levelBtn.innerHTML = '<a class="page-link" href="#">' + level + "</a>";
    levelBtn.setAttribute("role", "button");
    levelBtn.setAttribute("title", changeToLevel);
    levelBtn.setAttribute("aria-label", changeToLevel);

    if (level == INDOOR_LEVEL) {
      levelBtn.classList.add("active");
    }

    levelBtn.addEventListener("click", (e: MouseEvent) => {
      handleLevelChange(level);

      for (let i = 0; i < levelControl.children.length; i++) {
        levelControl.children[i].classList.remove("active");
      }
      (<HTMLElement>e.target).parentElement.classList.add("active");
    });

    levelControl.appendChild(levelBtn);
  });

  levelControl.classList.add("scale-in");
}

//TODO call in map comoponent
function handleLevelChange(newLevel: string): void {
  currentLevel = newLevel;
  indoorLayer.updateLayer(LevelService.getCurrentLevelGeoJSON());

  const message = getCurrentLevelDescription();
  DescriptionArea.update(message);
}

export function getCurrentLevel(): string {
  return currentLevel;
}
