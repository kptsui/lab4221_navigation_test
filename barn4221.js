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
	L.marker([371, 178], {icon: marker}).addTo(map).bindPopup('You are around here!'); // y, x in pixel
	/*var driver = L.latLng([ 378, 178 ]); // y, x
	marker = L.marker(driver);
	marker.addTo(map).bindPopup('driver');*/
	
	// center the view according to the marker
	// map.setView( [210, 110], 1);
});

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