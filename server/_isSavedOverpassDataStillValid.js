const fs = require('fs');
const path = require('path');
const Parser = require('node-xml-stream');

const MAX_AGE_IN_DAYS = 5;

/**
 * Returns a Promise which resolves to true if:
 *  - the given file is older than maxAgeInDays
 *  - the file can't be read
 *  - the file is invalid (= no meta tag found)
 *
 *  Otherwise resolves to false.
 */
module.exports = function (filePath) {
    const pathString = path.resolve(__dirname, filePath);

    return new Promise((resolve) => {
        if (fs.existsSync(pathString)) {
            try {
                const xml_stream = fs.createReadStream(pathString, 'utf-8');
                const xml_parser = new Parser();

                let metaTagFound = false;

                xml_parser.on('opentag', (name, attrs) => {
                    if (name === 'meta' && attrs.osm_base !== undefined) {
                        const fileDate = new Date(attrs.osm_base)
                        const fileAge = Date.now() - fileDate;
                        const fileAgeDays = Math.floor((((parseInt(fileAge) / 1000) / 60) / 60) / 24);
                        console.log('Saved OverPass data is from ' + fileDate.toString() + ' (' + fileAgeDays + ' days ago):');
                        xml_parser.end();
                        xml_stream.close();

                        metaTagFound = true;

                        if (fileAgeDays > MAX_AGE_IN_DAYS) {
                            console.log(' => Need to re-download file.');
                            resolve(true);
                        } else {
                            console.log(' => No need to re-download from Overpass.');
                            resolve(false);
                        }
                    }
                });

                xml_parser.on('finish', () => {
                    if (!metaTagFound) {
                        console.log(' => File seems to be invalid (missing meta tag)');
                        // stream finished, no meta tag found.
                        resolve(true);
                    }
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
