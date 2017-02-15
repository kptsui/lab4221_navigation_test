var map = null;
var markerIcon = null;
var marker = null;

const BEACON_SIZE = 6; // must be integer >= 1
const window_size = 3; // must be integer >= 1
var windows = []; // windows = [ [{}, {}], [{}, {}], [{}, {}] ];

$(document).ready(function(){
    // init marker icon
    markerIcon = L.icon({
        iconUrl: 'img/location_indicator.png',
        // no need shadow
        //shadowUrl: 'leaf-shadow.png',

        iconSize:     [48, 48], // size of the icon
        //shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [24, 24] // point of the icon which will correspond to marker's location
    });

	// init the map
	map = L.map('mapid', {
		crs: L.CRS.Simple
	});

	var bounds = [[0,0], [401,312]]; // [height, width]
	// add image to map
	var image = L.imageOverlay('img/4221FloorPlan.png', bounds).addTo(map);
	map.fitBounds(bounds);

	// set marker
	//marker = L.marker([371, 178], {icon: markerIcon});
  //marker.addTo(map).bindPopup('You are around here!'); // y, x in pixel

	/*var driver = L.latLng([ 378, 178 ]); // y, x
	marker = L.marker(driver);
	marker.addTo(map).bindPopup('driver');*/

	// center the view according to the marker
	// map.setView( [210, 110], 1);
});

/*
Current location point update
input object array = [
{bid: 1, rssi: -99},
{bid: 2, rssi: -99},
{bid: 3, rssi: 0},
{bid: 4, rssi: 0},
{bid: 5, rssi: -99}
];
*/
function updateMarker(arr){
  if(!arr.isArray()){
    return;
  }

  window.push(arr);

  if(window.length > window_size){
    window.shift();
  }

  var avg_window_data = average_window_data(); // arr [{bid: 1, rssi: 0}, {}]

  // require to include pointMatching.js
  var result = findXY(avg_window_data);

	// remove previous marker
  console.log("remove previous marker");
  if(marker != null){
    map.removeLayer(marker);
  }

	// re-print the marker
	marker = L.marker([result.y, result.x], {icon: markerIcon});
  marker.addTo(map).bindPopup('You are around here!'); // y, x in pixel

	// center the view according to the marker
	// map.setView( [y, x], 1);
}

/*
return average data array = [
{bid: 1, rssi: -99},
{bid: 2, rssi: -99},
{bid: 3, rssi: 0},
{bid: 4, rssi: 0},
{bid: 5, rssi: -99}
];
*/
function average_window_data(){
  var avg = [];

  for(var i = 1; i <= BEACON_SIZE; i++){ // i = Beacon major id
    avg.push({
      "bid": i,
      "rssi": 0
    });
    for(var j = 0; j < window.length; j++){
      avg[i].rssi += window[j][i].rssi;
    }
    avg[i].rssi /= window.length;
  }

  return avg;
}
