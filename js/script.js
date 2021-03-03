cleanjson = function (data) {
  let geojson = osmtogeojson(data, {
    polygonFeatures: {
      buildingpart: true
    }
  });

  geojson.features.map(feature => {
    try {
      let level = feature.properties.tags.level;
      level.trim();

      if (level.includes(";")) {
        feature.properties.tags.level = level.split(";");
      }
      else if (level.includes("-")) {
        /**
         * @author Nikolai Shiriaev
         */
        var i;
        var dashCount = 0;
        var finalArray = [];
        var minLevel = 0;
        var maxLevel = 0;

        firstDash = -1;
        secondDash = -1;
        thirdDash = -1;

        for (i = 0; i < level.length; i++) {
          if (level.charAt(i) == "-") {
            dashCount++;

            if (firstDash == -1) {
              firstDash = i;
            }
            else if (secondDash == -1) {
              secondDash == i;
            }
            else if (thirdDash == -1) {
              thirdDash = i;
            }
          }
        }
        if (dashCount == 1 && firstDash != 0) // [0-5] but not [-5]
        {
          minLevel = parseInt(level.slice(0, firstDash).trim());
          maxLevel = parseInt(level.slice(firstDash + 1, level.length).trim())
        }
        else if (dashCount == 2) // [-1-5] 
        {
          minLevel = parseInt(level.slice(0, secondDash).trim());
          maxLevel = parseInt(level.slice(secondDash + 1, level.length).trim());
        }
        else if (dashCount == 3) // [-1--5] or [-5--1]
        {
          minLevel = parseInt(level.slice(0, secondDash).trim());
          maxLevel = parseInt(level.slice(thirdDash, level.length).trim());

          if (minLevel > maxLevel); // [-1--5]
          {
            var tempMin = minLevel;
            minLevel = maxLevel;
            maxLevel = tempMin;
          }
        }


        if (level.charAt(0) != "-" || dashCount > 1) // not [-5]
        {
          for (i = minLevel; i <= maxLevel; i++) {
            finalArray.push(i);
          }
        }
        feature.properties.tags.level = finalArray;
      }
    } catch {
      // some features don't contain a level tag
    }
  })

  return {
    "type": "FeatureCollection",
    "features": geojson.features
  };
}

function getOSM(map, callback) {
  let bounds = map.getBounds();
  let indoorQuery = "[timeout:25];" +
    "(nwr[indoor](" +
    bounds.getSouth() + "," +
    bounds.getWest() + "," +
    bounds.getNorth() + "," +
    bounds.getEast() + ");" +
    "nwr[building](" +
    bounds.getSouth() + "," +
    bounds.getWest() + "," +
    bounds.getNorth() + "," +
    bounds.getEast() + "););" +
    "(._;>;);" +
    "out;"
  console.log(indoorQuery);
  $.get("http://overpass-api.de/api/interpreter?data=" + indoorQuery, callback);
};

const INDOOR_ZOOM_LEVEL = 17;
const INDOOR_LEVEL = 0;
const WALL_WEIGHT = 3;
const FILL_OPACITY = 1;

document.addEventListener('DOMContentLoaded', function () {

  var sidenav = document.querySelectorAll('.sidenav');
  var modal = document.querySelectorAll('.modal');
  var fab = document.querySelectorAll('.fixed-action-btn');
  M.FloatingActionButton.init(fab);
  M.Sidenav.init(sidenav);
  M.Modal.init(modal);


  //var mymap = L.map('mapid').setView([51.0255439,13.722259], 55);
  /*var mymap = L.map('mapid').setView([49.41873, 8.67689], 55);
var mymap = new L.Map('mapid', {
   layers: [osm],
   center: new L.LatLng(49.41873, 8.67689),
   zoom: 19
 });


 var osm = new L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
   maxZoom: 18,
   id: 'mapbox/streets-v11',
   tileSize: 512,
   zoomOffset: -1,
   accessToken: 'pk.eyJ1IjoianVsaWFuc3RyaWVnbCIsImEiOiJja2syZzdka2oxMHZiMnF0Z3ZpZ2c2emM4In0.E2_MY7Q3VjZV5m3FgcNkfg'
 }).addTo(mymap);*/

  var osmUrl = '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    osm = new L.TileLayer(osmUrl, {
      maxZoom: 19,
      attribution: "Map data &copy; OpenStreetMap contributors"
    });

  var mymap = new L.Map('mapid', {
    layers: [osm],
    //center: new L.LatLng(49.41873, 8.67689),
    center: new L.LatLng(51.0255439, 13.722259),
    zoom: 19
  });


  var tagFilter = function (feature) {

    let fill = 'white';
    let wallColor = '#000';
    let opacity = FILL_OPACITY;
    let wall_weight = -INDOOR_ZOOM_LEVEL + 1 + mymap.getZoom();

    if (feature.properties.tags.amenity === 'toilets') {
      fill = '#dfed64';
    }
    else if (feature.properties.tags.indoor === "room") {
      fill = '#0A485B';
    }

    if (feature.properties.tags.stairs) {

        wallColor = '#000';
      
    }

    return {
      fillColor: fill,
      weight: wall_weight,
      color: wallColor,
      fillOpacity: opacity
    };
  }


  //var query = '[out:json][timeout:25];(relation(1370729);>>;>;);out;';
  //var query = '[out:json][timeout:25];way(id:23290301)->.apb;(way(around.apb:1);node(around.apb:1););(._;>;);out;'; 
  //$.get("//overpass-api.de/api/interpreter?data=" + query, function (data) {
  getOSM(mymap, function (data) {

    var geoJSON = osmtogeojson(data, {
      polygonFeatures: {
        buildingpart: true
      }
    });

    var geoJSON = cleanjson(data);

    // remove old layer and levels before adding a new one
    if (mymap.hasLayer(indoorLayer)) {
      mymap.removeLayer(indoorLayer);
    }

    var indoorLayer = new L.Indoor(geoJSON, {
      getLevel: function (feature) {
        return feature.properties.tags.level
      },


      onEachFeature: function (feature, layer) {
        layer.bindPopup(JSON.stringify(feature.properties, null, 10));
      },

      style: tagFilter,

      filter: (feature, layer) => {
        // here you can filter out features, that should not be drawn
        return true;
      }
    });
    /*
        var indoorLayer = new L.Indoor(geoJSON, {
          getLevel: function (feature) {
            if (feature.properties.relations.length === 0)
              return null;
    
            return feature.properties.relations[0].reltags.level;
          },
          onEachFeature: function (feature, layer) {
            layer.bindPopup(JSON.stringify(feature.properties, null, 4));
          },
          style: function (feature) {
            var fill = 'white';
    
            if (feature.properties.tags.buildingpart === 'corridor') {
              fill = '#169EC6';
            } else if (feature.properties.tags.buildingpart === 'verticalpassage') {
              fill = '#0A485B';
            }
    
            return {
              fillColor: fill,
              weight: 1,
              color: '#666',
              fillOpacity: 1
            };
          }
        });*/

    indoorLayer.setLevel("0");

    indoorLayer.addTo(mymap);


    var levelControl = new L.Control.Level({
      level: "0",
      levels: indoorLayer.getLevels()
    });

    // Connect the level control to the indoor layer
    levelControl.addEventListener("levelchange", indoorLayer.setLevel, indoorLayer);

    levelControl.addTo(mymap);
  });


});