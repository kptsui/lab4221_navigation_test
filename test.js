var test_data = test_data_most_frequent_in_average;
var error = 0;

$(document).ready(function(){

  testPoints(test_data, 0);

});

/*
Testing
*/

// i = start position in data array
function testPoints(data, i){
  var t = setTimeout(function(){
    if(i < data.length){
      var point = data[i];
      /*
      point.rssi_1 = point.rssi_1 + getRandomInt(0 - error, error);
      point.rssi_2 = point.rssi_2 + getRandomInt(0 - error, error);
      point.rssi_3 = point.rssi_3 + getRandomInt(0 - error, error);
      */
      /* Use fixed noise offset on RSSI in debug mode, so that error(mismatch) can be replicated */
      point.rssi_1 = point.rssi_1 + error;
      point.rssi_2 = point.rssi_2 + error;
      point.rssi_3 = point.rssi_3 + error;
      console.log("test point: ");
      console.log(point);

      updateMarker(point.bid_1, point.bid_2, point.bid_3,
      point.rssi_1, point.rssi_2, point.rssi_3);

      testPoints(data, i + 1);
    }
  }, 500);
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
