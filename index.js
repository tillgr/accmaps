const express = require('express');
const path = require('path');
const getOverpassData = require("./server/_getOverpassData");

const app = express();
const port = 3000;

getOverpassData().then(() =>{
    console.log('...done.');
    app.listen(port, () => {
        console.log(`Server running at at http://localhost:${port}`)
    })
    app.use(express.static(path.join(__dirname, 'public')));
})
