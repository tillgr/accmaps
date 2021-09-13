const downloadResource = require("./_downloadResource");
const {RESOURCES_TO_DOWNLOAD} = require("./constants");

module.exports = function getOverpassData() {
    console.log("=== Downloading Overpass data ===");

    const downloadPromises = [];

    RESOURCES_TO_DOWNLOAD.forEach(resource => {
        downloadPromises.push(downloadResource(resource.url, resource.dest));
    });

    return Promise.all(downloadPromises);
}
