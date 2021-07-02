import 'leaflet/src/layer/vector/Polygon';

export function filterGeoJsonData(geoJSON) {
    geoJSON.features = geoJSON.features.filter(filterFeatures);
    geoJSON.features.map(generateLevelDescriptors);

    return geoJSON;
}

function filterFeatures(feature) {
    return !(feature.properties === undefined || feature.properties.level === undefined);
}

function generateLevelDescriptors(feature) {
    let level = feature.properties.level;

    if (level.includes(";")) {
        feature.properties.level = level.split(";");
    } else if (level.includes("-")) {
        feature.properties.level = cleanUpLevelNames(level);
    }

    return feature;
}

function cleanUpLevelNames(level) {
    let dashCount = 0;
    let finalArray = [];
    let minLevel = 0;
    let maxLevel = 0;

    let firstDash = -1;
    let secondDash = -1;
    let thirdDash = -1;

    for (let i = 0; i < level.length; i++) {
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

        if (minLevel > maxLevel)  // [-1--5]
        {
            minLevel = [maxLevel, maxLevel = minLevel][0]
        }
    }

    if (level.charAt(0) !== "-" || dashCount > 1) // not [-5]
    {
        for (let i = minLevel; i <= maxLevel; i++) {
            finalArray.push(i);
        }
    }

    return finalArray;
}
