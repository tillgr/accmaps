import {INDOOR_LEVEL} from "./constants";
import {indoorDataOverpassGeoJSONFiltered} from "./_filterGeoJsonData";
import {IndoorLayer} from "./_indoorLayer";
import {updateDescriptionPopUp} from "./_descriptionPopup";

export class LevelControl {
    constructor() {
        this.currentLevel = INDOOR_LEVEL;
        this.allLevels = new Set();
        this.geoJSONByLevel = [];

        this.getAllLevelsFromGeoJSON();
        this.indoorLayer = new IndoorLayer(this.getCurrentLevelGeoJSON());

        this.createLevelControlButtons();
    }

    getCurrentLevelGeoJSON() {
        if (this.geoJSONByLevel[this.currentLevel] !== undefined) {
            return this.geoJSONByLevel[this.currentLevel];
        }

        this.geoJSONByLevel[this.currentLevel] = indoorDataOverpassGeoJSONFiltered.features.filter((f) =>
            (f.properties.level === this.currentLevel || f.properties.level.includes(this.currentLevel))
        );

        return this.geoJSONByLevel[this.currentLevel];
    }

    changeCurrentLevel(newLevel) {
        this.currentLevel = newLevel;
        this.indoorLayer.updateLayer(this.getCurrentLevelGeoJSON());
        this.updateCurrentLevelDescription()
    }

    getAllLevelsFromGeoJSON() {
        indoorDataOverpassGeoJSONFiltered.features.map((feature) => {
            if (Array.isArray(feature.properties.level)) {
                return;
            }

            let level = feature.properties.level = feature.properties.level.trim();

            if (level.includes(";")) {
                feature.properties.level = level.split(";");
            } else if (level.includes("-")) {
                feature.properties.level = this._getLevelRange(level);
            }

            if (Array.isArray(feature.properties.level)) {
                feature.properties.level.forEach((level) => {
                    this.allLevels.add(level);
                });
            } else {
                this.allLevels.add(feature.properties.level);
            }
        });
    }

    _getLevelRange(level) {
        let i;
        let dashCount = 0;
        const finalArray = [];
        let minLevel = 0;
        let maxLevel = 0;

        let firstDash = -1;
        let secondDash = -1;
        let thirdDash = -1;

        for (i = 0; i < level.length; i++) {
            if (level.charAt(i) === "-") {
                dashCount++;
                if (firstDash === -1) {
                    firstDash = i;
                } else if (secondDash === -1) {
                    secondDash = i;
                } else if (thirdDash === -1) {
                    thirdDash = i;
                }
            }
        }
        if (dashCount === 1 && firstDash !== 0) // [0-5] but not [-5]
        {
            minLevel = parseInt(level.slice(0, firstDash));
            maxLevel = parseInt(level.slice(firstDash + 1, level.length))
        } else if (dashCount === 2) // [-1-5]
        {
            minLevel = parseInt(level.slice(0, secondDash));
            maxLevel = parseInt(level.slice(secondDash + 1, level.length));
        } else if (dashCount === 3) // [-1--5] or [-5--1]
        {
            minLevel = parseInt(level.slice(0, secondDash));
            maxLevel = parseInt(level.slice(thirdDash, level.length));

            if (minLevel > maxLevel) // [-1--5]
            {
                let tempMin = minLevel;
                minLevel = maxLevel;
                maxLevel = tempMin;
            }
        }
        if (level.charAt(0) !== "-" || dashCount > 1) // not [-5]
        {
            for (i = minLevel; i <= maxLevel; i++) {
                finalArray.push(i.toString());
            }
        }
        return finalArray;
    }

    createLevelControlButtons() {
        const levelControl = document.getElementById('levelControl');

        this.allLevels.forEach(level => {
            const changeToLevel = 'change to level ' + level;
            const levelBtn = document.createElement('a');
            levelBtn.className = 'btn';
            levelBtn.innerText = level;
            levelBtn.setAttribute('role', 'button');
            levelBtn.setAttribute('title', changeToLevel);
            levelBtn.setAttribute('aria-label', changeToLevel);

            levelBtn.addEventListener('click', () => {
                this.changeCurrentLevel(level)
            });

            levelControl.appendChild(levelBtn);
        });

        levelControl.classList.add('scale-in');
    }

    updateCurrentLevelDescription() {
        updateDescriptionPopUp('current level: ' + this.currentLevel + ', todo: level information');
    }

}
