const fs = require('fs');
const path = require('path');
const https = require('https');

/**
 * Downloads a ressource from a given URL to a given destination
 */
module.exports = function (url, dest) {
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
