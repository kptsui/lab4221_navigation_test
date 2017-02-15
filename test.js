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
      var arr = data[i];

      console.log("test point: ");
      console.log(arr);

      updateMarker(arr);

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
