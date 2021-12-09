import { INDOOR_LEVEL } from "../../services/data/constants";
import { LevelService } from "../../services/levelService";

export const levelControl = {};

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
      LevelService.changeCurrentLevel(level);

      for (let i = 0; i < levelControl.children.length; i++) {
        levelControl.children[i].classList.remove("active");
      }
      (<HTMLElement>e.target).parentElement.classList.add("active");
    });

    levelControl.appendChild(levelBtn);
  });

  levelControl.classList.add("scale-in");
}
