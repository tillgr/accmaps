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
    center: new L.LatLng(51.0255439, 13.722259),
    zoom: 19
  });

  //ACCESSIBILITY CONFS

  // remove the shadow pane (otherwise each shadow image is read out)
  $('.leaflet-shadow-pane').remove();

  // prevent screen readers from reading out each map tile
  $('.leaflet-tile-container img, .leaflet-shadow-pane img').attr('role', 'presentation').attr('alt', '');


  mymap.on('popupopen', function (popup) {

    // shift focus to the popup when it opens     
    $(popup.popup._container).find('.my-popup-content').attr('tabindex', '-1').focus();

    // move the close button to the end of the popup content so screen readers reach it
    // after the main popup content, not before
    var close = $(popup.popup._container).find('.leaflet-popup-close-button');
    $(popup.popup._container).find('.leaflet-popup-close-button').remove();
    close.attr('title', 'Close item');
    $(popup.popup._container).append(close);

  });

  // return focus to the icon we started from before opening the pop up
  mymap.on('popupclose', function (popup) {
    $(popup.popup._source._icon).focus();
  });

  if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
    $('#mapid').attr('role', 'application');
    $('#mapid').attr('data-tap-disabled', 'true');
  }

  //END ACCESSIBILITY CONFS

  //ADD MARKERS
  /*
  var myIcon = L.icon({
    iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII='
  })*/

  markers = [
    {
      "name": "APB Center",
      "url": "https://en.wikipedia.org/wiki/Canada",
      "lat": 51.0254,
      "lng": 13.7222
    }
  ];

  for (var i = 0; i < markers.length; ++i) {

    //var marker = L.marker([markers[i].lat, markers[i].lng], { icon: myIcon });
    var marker = L.marker([markers[i].lat, markers[i].lng]);
    marker
      .bindPopup('<a href="' + markers[i].url + '" target="_blank">' + markers[i].name + '</a>')
      .addTo(mymap)
      //.openPopup();
    L.DomUtil.addClass(marker._icon, 'leaflet-marker-icon-poi');
  }

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