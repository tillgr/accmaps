const downloadResource = require("./_downloadResource");
const {RESOURCES_TO_DOWNLOAD} = require("./constants");

if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./tmp/localStorage');
}

module.exports = function getOverpassData() {
    console.log("=== Downloading Overpass data ===");

    const downloadPromises = [];

    RESOURCES_TO_DOWNLOAD.forEach(resource => {
        let needToDownload = true;
        const localStorageKey = resource.dest + '-downloadDate'
        const lastDownloadDate = localStorage.getItem(localStorageKey);

        if (lastDownloadDate !== null) {
            const fileAge = Date.now() - parseInt(lastDownloadDate);
            const fileAgeInDays = Math.floor((((fileAge / 1000) / 60) / 60) / 24);

            needToDownload = (fileAgeInDays >= 5);
        }

        if (needToDownload) {
            downloadPromises.push(downloadResource(resource.url, resource.dest).then(() => {
                localStorage.setItem(localStorageKey, Date.now().toString());
            }));
        }

    });

    return Promise.all(downloadPromises);
}
