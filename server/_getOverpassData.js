const isSavedOverpassDataStillValid = require("./_isSavedOverpassDataStillValid");
const downloadResource = require("./_downloadResource");
const {RESOURCES_TO_DOWNLOAD} = require("./constants");

module.exports = function () {
    console.log("=== Downloading Overpass data ===");

    const downloadPromises = [];

    RESOURCES_TO_DOWNLOAD.forEach(resource => {
        const downloadPromise = isSavedOverpassDataStillValid(resource.dest).then((isTooOld) => {
            if (isTooOld) {
                return downloadResource(resource.url, resource.dest);
            }
            return Promise.resolve(true);
        });
        downloadPromises.push(downloadPromise);
    });

    return Promise.all(downloadPromises);
}

