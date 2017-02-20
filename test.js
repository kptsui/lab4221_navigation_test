
var error = 0;

$(document).ready(function(){

  testPoints(test_data, 0);

  //closestBeaconAsPoint(test_data);
});

/*
Testing
*/

// i = start position in data array
function testPoints(data, i){
  var t = setTimeout(function(){
    if(i < data.length){
      var arr = data[i].beacons;

      console.log("test point: ");
      console.log(arr);

      updateMarker(arr);

      testPoints(data, i + 1);
    }
  }, 400);
}

function closestBeaconAsPoint(test_data_object){
  var min_rssi = Number.MAX_SAFE_INTEGER;
  var closestBeacon;
  for(var i = 0; i < test_data_object.beacons.length; i++){
    var beacon = test_data_object.beacons[i];
    if(beacon.rssi < min_rssi){
      min_rssi = beacon.rssi;
      closestBeacon = beacon;
    }
  }
  var result = {
    "x": 0,
    "y": 0
  };
  for(var i = 0; i < deployed_beacons.length; i++){
    if(closestBeacon.bid == deployed_beacons[i].bid){
      result.x = deployed_beacons[i].x;
      result.y = deployed_beacons[i].y;
      break;
    }
  }

	// remove previous marker
  console.log("remove previous marker");
  if(marker != null){
    map.removeLayer(marker);
  }

	// re-print the marker
	marker = L.marker([result.y, result.x], {icon: markerIcon});
  marker.addTo(map).bindPopup('You are around here!'); // y, x in pixel
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
