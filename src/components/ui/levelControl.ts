import { INDOOR_LEVEL } from "../../data/constants";
import LevelService from "../../services/levelService";
import { geoMap } from "../../main";
import { lang } from "../../services/languageService";

function handleChange(): void {
  //reCreate

  remove();
  create();
}

function create(): void {
  const levelNames = LevelService.getLevelNames();
  render(levelNames);
}

function remove(): void {
  document.getElementById("levelControl").innerHTML = "";
}

function render(allLevelNames: string[]): void {
  const levelControl = document.getElementById("levelControl");

  allLevelNames.forEach((level: string) => {
    const changeToLevel = lang.changeLevel + level;
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

function focusOnLevel(selectedLevel: string): void {
  const levelControl = document.getElementById("levelControl");
  const list = levelControl.children;
  for (let item of list) {
    if (item.firstChild.textContent === selectedLevel) {
      item.classList.add("active");
    } else item.classList.remove("active");
  }
}

export default {
  handleChange,
  focusOnLevel,
};
