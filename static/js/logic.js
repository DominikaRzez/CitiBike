// var newYorkCoords = [40.73, -74.0059];
// var mapZoomLevel = 12;

// Create the createMap function.
function createMap(bikeStations) {


  // Create the tile layer that will be the background of our map.
var lightmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

  // Create a baseMaps object to hold the lightmap layer.

var baseMaps = {
  "Street": lightmap
};
  // Create an overlayMaps object to hold the bikeStations layer.
var overlayMaps = {
  "Bike Stations": bikeStations
};

  // Create the map object with options.
var myMap = L.map("map-id", {
  center: [40.73, -74.0059],
  zoom: 12,
  layers: [lightmap, bikeStations]
});

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);
}

// Create the createMarkers function.
function createMarkers(response) {

  // Pull the "stations" property from response.data.
  var stations = response.data.stations;


  // Initialize an array to hold the bike markers.
  var bikeMarkers = [];

  // Loop through the stations array.
  for (var i = 0; i < stations.length; i++) {
    // For each station, create a marker, and bind a popup with the station's name.
    var BikeMarker = L.marker([stations[i].lat, stations[i].lon])
    .bindPopup("<h1> Name: </h1> <h2>" + stations[i].name + "</h2> <hr> <h1> Capacity: </h1> <h2>" + stations[i].capacity + "</h2>")
    // Add the marker to the bikeMarkers array.
    bikeMarkers.push(BikeMarker)
 
}
  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  createMap(L.layerGroup(bikeMarkers));
}
// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
var url = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json"
d3.json(url).then(createMarkers)