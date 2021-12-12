import { INDOOR_LEVEL } from "../../data/constants";
import { getLevelNames } from "../../services/levelService";
import { geoMap } from "../../main";

export function handleChange(): void {
  //reCreate

  remove();
  create();
}

//TODO call in map comoponent
function create(): void {
  const levelNames = getLevelNames();
  render(levelNames);
}

function remove(): void {
  document.getElementById("levelControl").innerHTML = "";

  if (geoMap.indoorLayer) {
    geoMap.removeIndoorLayerFromMap();
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
      geoMap.handleLevelChange(level);

      for (let i = 0; i < levelControl.children.length; i++) {
        levelControl.children[i].classList.remove("active");
      }
      (<HTMLElement>e.target).parentElement.classList.add("active");
    });

    levelControl.appendChild(levelBtn);
  });

  levelControl.classList.add("scale-in");
}

//TODO create export default object
