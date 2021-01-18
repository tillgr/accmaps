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
    //center: new L.LatLng(51.0255439, 13.722259),
    center: new L.LatLng(49.41873, 8.67689),
    zoom: 19
  });


  var query = '(relation(1370729);>>;>;);out;';
  //'way(id:23290301)->.apb;(way(around.apb:1);node(around.apb:1););(._;>;);out;';
  $.get("//overpass-api.de/api/interpreter?data=" + query, function (data) {

    var geoJSON = osmtogeojson(data, {
      polygonFeatures: {
        buildingpart: true
      }
    });

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
    });

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