const fs = require('fs');
const path = require('path');
const https = require('https');
const OVERPASS_QUERIES = require('./constants').OVERPASS_QUERIES;
const URLS = require('./constants').URLS;

function download(url, dest) {
    let file = fs.createWriteStream(path.resolve(__dirname, dest));

    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve(true);
            }).on('error', (err) => {
                console.error(err);
                reject(false);
            })
        }).on('error', (err) => {
            fs.unlink(dest, null);
            console.error(err);
            reject(false);
        });
    });
}

module.exports = function () {
    console.log("=== Downloading Overpass data ===");
    const indoorDataRequest = download(URLS.OVERPASS_API + OVERPASS_QUERIES.INDOOR, '../public/overpass/indoor.xml');
    const buildingDataRequest = download(URLS.OVERPASS_API + OVERPASS_QUERIES.SIT_BUILDINGS, '../public/overpass/buildings.xml');

    return Promise.all([indoorDataRequest, buildingDataRequest]);
}

