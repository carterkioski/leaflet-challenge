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
  
    // Create an overlayMaps object to hold the bikeStations layer
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
  
    // Loop through the stations array
    for (var index = 0; index < earthquakes.length; index++) {
      var magnitude = earthquakes[index];
      var location = earthquakes[index].geometry.coordinates
      // For each station, create a marker and bind a popup with the station's name
      var earthquakeMarker = L.marker([location[0], location[1]])
        .bindPopup("<h3>" + 'title' + "<h3><h3>Capacity: " + 'someth' + "</h3>");
      // Add the marker to the bikeMarkers array
      earthquakeMarkers.push(earthquakeMarker);
    }
  
    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(earthquakeMarkers));
  }




url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson'

d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson').then(createMarkers);

/*
{
    "type":"FeatureCollection",
    "metadata":{
        "generated":1618629888000,
        "url":"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson",
        "title":"USGS Magnitude 4.5+ Earthquakes, Past Month",
        "status":200,
        "api":"1.10.3",
        "count":488
    },
    "features":[
        {
            "type":"Feature",
            "properties":{
                "mag":5.3,
                "place":"Mariana Islands region",
                "time":1618622841617,
                "updated":1618626451919,
                "tz":null,
                "url":"https://earthquake.usgs.gov/earthquakes/eventpage/us6000e29p",
                "detail":"https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/us6000e29p.geojson",
                "felt":null,
                "cdi":null,
                "mmi":null,
                "alert":null,
                "status":"reviewed",
                "tsunami":0,
                "sig":432,
                "net":"us",
                "code":"6000e29p",
                "ids":",us6000e29p,",
                "sources":",us,",
                "types":",oaf,origin,phase-data,",
                "nst":null,
                "dmin":6.254,
                "rms":0.82,
                "gap":58,
                "magType":"mb",
                "type":"earthquake",
                "title":"M 5.3 - Mariana Islands region"
            },
            "geometry":{
            "type":"Point",
            "coordinates":[145.9753,21.511,10]
        },
    "id":"us6000e29p"
},

*/
