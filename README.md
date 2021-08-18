# Accessible Maps mobile interaction

The project Accessible Maps aims to make indoor mobility more accessible for people with disabilities in the
occupational context. This repository focuses on prototyping solutions for accessible mobile indoor map interaction

Used technologies for the prototype:

* Leaflet: https://leafletjs.com/
* OverpassAPI: https://wiki.openstreetmap.org/wiki/Overpass_API

The source files are mainly written in [TypeScript](https://www.typescriptlang.org/).

## Installation

First, ensure to have [Node.js](https://nodejs.org/en/) installed on your system. In order to install dependencies and
to build a webpack-bundled JS file, execute the following steps:

1. Install dependencies: `npm i`
2. Compile Typescript files and build JS bundle: `npm run build`

## Execution
Run `node index.js` or `npm start` in order to start a small webserver. 
Afterwards, the app is accessible via your browser under the displayed url.
