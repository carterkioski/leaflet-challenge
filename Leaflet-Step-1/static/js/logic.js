function createMap(earthquakeMarkers) {
    console.log(earthquakeMarkers)
    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "light-v10",
      accessToken: API_KEY
    });
    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
      "Light Map": lightmap
    };
  
    var overlayMaps = {
      "Earthquakes": earthquakeMarkers
    };
  
    // Create the map object with options
    var map = L.map("mapid", {
      center: [0, 0],
      zoom: 3,
      layers: [lightmap, earthquakeMarkers]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(map);
    
}



function createMarkers(response) {
    var earthquakes = response.features
    var earthquakeMarkers = [];
  
    for (var index = 0; index < earthquakes.length; index++) {
      var location = earthquakes[index].geometry.coordinates
      var magnitude = earthquakes[index].properties.mag
    
      var earthquakeMarker = L.circle([location[0], location[1]], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 1,
        radius: magnitude**7
    }).bindPopup("<h3>Latitude: "+ location[0] + "</h3>"+
                    "<h3>Longitude: "+ location[1] + "</h3>"+
                    "<h3>Depth: "+ location[2] + "</h3>"+
                    "<h3>Magnitude: " + magnitude + "</h3>");
      earthquakeMarkers.push(earthquakeMarker);
    }
      createMap(L.layerGroup(earthquakeMarkers));
  }

d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson').then(createMarkers);
