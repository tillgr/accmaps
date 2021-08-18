const fs = require('fs');
const path = require('path');
const https = require('https');
const Parser = require('node-xml-stream');

const OVERPASS_QUERIES = require('./constants').OVERPASS_QUERIES;
const URLS = require('./constants').URLS;

/**
 * Downloads a ressource from a given URL to a given destination
 */
function download(url, dest) {
    console.log('Downloading ' + url + ' to ' + dest);
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

/**
 * Returns a Promise which resolves to true if:
 *  - the given file is older than maxAgeInDays
 *  - the file can't be read
 *  - the file is invalid (= no meta tag found)
 *
 *  Otherwise resolves to false.
 */
function isSavedOverpassDataOlderThan(filePath, maxAgeInDays) {
    const pathString = path.resolve(__dirname, filePath);

    return new Promise((resolve) => {
        if (fs.existsSync(pathString)) {
            try {
                const xml_stream = fs.createReadStream(pathString, 'utf-8');
                const xml_parser = new Parser();

                xml_parser.on('opentag', function (name, attrs) {
                    if (name === 'meta' && attrs.osm_base !== undefined) {
                        const fileDate = new Date(attrs.osm_base)
                        const fileAge = Date.now() - fileDate;
                        const fileAgeDays = Math.floor((((parseInt(fileAge) / 1000) / 60) / 60) / 24);
                        console.log('Saved OverPass data is from ' + fileDate.toString() + ' (' + fileAgeDays + ' days ago):');
                        xml_parser.end();
                        if (fileAgeDays > maxAgeInDays) {
                            resolve(true);
                        } else {
                            console.log(' => No need to re-download from Overpass.');
                            resolve(false);
                        }
                    }
                });

                xml_parser.on('finish', () => {
                    // stream finished, no meta tag found.
                    resolve(true);
                });

                xml_stream.pipe(xml_parser);
            } catch (e) {
                console.log('Error while parsing this file: ' + filePath);
                resolve(true);
            }
        } else {
            console.log('File not found: ' + filePath);
            resolve(true);
        }
    });
}

module.exports = function () {
    console.log("=== Downloading Overpass data ===");

    const indoorFileAge = isSavedOverpassDataOlderThan('../public/overpass/indoor.xml', 5);
    const buildingFileAge = isSavedOverpassDataOlderThan('../public/overpass/buildings.xml', 5);

    const indoorDataDownload = indoorFileAge.then((isTooOld) => {
        if (isTooOld) {
            return download(URLS.OVERPASS_API + OVERPASS_QUERIES.INDOOR, '../public/overpass/indoor.xml');
        }
        return Promise.resolve(true);
    });

    const buildingDataDownload = buildingFileAge.then((isTooOld) => {
        if (isTooOld) {
            return download(URLS.OVERPASS_API + OVERPASS_QUERIES.SIT_BUILDINGS, '../public/overpass/buildings.xml');
        }
        return Promise.resolve(true);
    });

    return Promise.all([indoorDataDownload, buildingDataDownload]);
}

