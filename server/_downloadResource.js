const osmtogeojson = require('osmtogeojson');
const fs = require('fs');
const path = require('path');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;


module.exports = function downloadResource(url, dest) {
    if (fs.existsSync(path.resolve(__dirname, dest))) {
        console.log('File already exists: ' + dest);
        return new Promise(resolve => resolve());
    }

    console.log('Downloading ' + url);

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    transformToGeoJSONAndSaveFile(xhr.responseText, dest)
                    return resolve();
                } else if (xhr.status > 400) {
                    return reject('File could not be downloaded! (' + xhr.status + ')');
                }
            }
        };
        xhr.open('GET', url, true);
        xhr.send();
    });
}

function transformToGeoJSONAndSaveFile(responseText, dest) {
    console.log('saving transformed GeoJSON data to ' + dest);
    const osmData = JSON.parse(responseText);
    let transformedData = osmtogeojson(osmData);
    transformedData = JSON.stringify(transformedData);
    fs.writeFileSync(path.resolve(__dirname, dest), transformedData);
}
