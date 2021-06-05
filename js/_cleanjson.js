import osmtogeojson from "osmtogeojson";

module.exports = function (data) {
    let geojson = osmtogeojson(data, {
        polygonFeatures: {
            buildingpart: true
        }
    });

    geojson.features.map(feature => {
        try {
            let level = feature.properties.tags.level;
            level.trim();

            if (level.includes(";")) {
                feature.properties.tags.level = level.split(";");
            } else if (level.includes("-")) {
                /**
                 * @author Nikolai Shiriaev
                 */
                var i;
                var dashCount = 0;
                var finalArray = [];
                var minLevel = 0;
                var maxLevel = 0;

                let firstDash = -1;
                let secondDash = -1;
                let thirdDash = -1;

                for (i = 0; i < level.length; i++) {
                    if (level.charAt(i) == "-") {
                        dashCount++;

                        if (firstDash == -1) {
                            firstDash = i;
                        } else if (secondDash == -1) {
                            secondDash == i;
                        } else if (thirdDash == -1) {
                            thirdDash = i;
                        }
                    }
                }
                if (dashCount == 1 && firstDash != 0) // [0-5] but not [-5]
                {
                    minLevel = parseInt(level.slice(0, firstDash).trim());
                    maxLevel = parseInt(level.slice(firstDash + 1, level.length).trim())
                } else if (dashCount == 2) // [-1-5]
                {
                    minLevel = parseInt(level.slice(0, secondDash).trim());
                    maxLevel = parseInt(level.slice(secondDash + 1, level.length).trim());
                } else if (dashCount == 3) // [-1--5] or [-5--1]
                {
                    minLevel = parseInt(level.slice(0, secondDash).trim());
                    maxLevel = parseInt(level.slice(thirdDash, level.length).trim());

                    if (minLevel > maxLevel) ; // [-1--5]
                    {
                        var tempMin = minLevel;
                        minLevel = maxLevel;
                        maxLevel = tempMin;
                    }
                }


                if (level.charAt(0) !== "-" || dashCount > 1) // not [-5]
                {
                    for (i = minLevel; i <= maxLevel; i++) {
                        finalArray.push(i);
                    }
                }
                feature.properties.tags.level = finalArray;
            }
        } catch {
            // some features don't contain a level tag
        }
    })

    return {
        "type": "FeatureCollection",
        "features": geojson.features
    }
}
