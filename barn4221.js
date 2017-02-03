var map = null;
var marker = null;

$(document).ready(function(){
    // init marker icon
    marker = L.icon({
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
	//L.marker([371, 178], {icon: marker}).addTo(map).bindPopup('You are around here!'); // y, x in pixel
	/*var driver = L.latLng([ 378, 178 ]); // y, x
	marker = L.marker(driver);
	marker.addTo(map).bindPopup('driver');*/

	// center the view according to the marker
	// map.setView( [210, 110], 1);

  testPoints(test_data_1);
});

/*
Current location point update
*/
function updateMarker(bid1, bid2, bid3, rssi1, rssi2, rssi3){
    // require to include pointMatching.js
    var result = findXY(bid1, bid2, bid3, rssi1, rssi2, rssi3);

	// remove previous marker
	map.removeLayer(marker);

	// re-print the marker
	L.marker([result.y, result.x], {icon: marker}).addTo(map).bindPopup('You are around here!'); // y, x in pixel

	// center the view according to the marker
	// map.setView( [y, x], 1);
}


/*
Testing
*/
function testPoints(data){
  for (var i = 0; i < data.length; i++) {
    var point = data[i];
    console.log("test point: ");
    console.log(point);

    updateMarker(point.bid_1, point.bid_2, point.bid_3,
    point.rssi_1,
    point.rssi_2,
    point.rssi_3);

    console.log("random int: " + getRandomInt(0, 10));
  }
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
