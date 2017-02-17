// INPUT: BeaconID_1,2,3 RSSI_1,2,3
// OUTPUT: predicted x, y, error
// TODO: match combinition of bids and find closest rssi, output x,y

/*input object array = [
{bid: 1, rssi: -99},
{bid: 2, rssi: -99},
{bid: 3, rssi: 0},
{bid: 4, rssi: 0},
{bid: 5, rssi: -99}
];*/
function findXY(arr) {
  // console.log(String.format('Matching BID:({0},{1},{2})', bid_1, bid_2, bid_3));

console.log("~~~~~~~~~~~~~~~~~~");
console.log("~~~~~~~~~~~~~~~~~~");
console.log("~~~~~~~~~~~~~~~~~~");
console.log("~~~~~~~~~~~~~~~~~~");

  // obj storing x,y with min. error
  var min_err = {
    'x': -1, 'y': -1, 'err': Number.MAX_SAFE_INTEGER
  };
  var row_matched = 0;

  // loop all the data
  for(var i = 0; i < data.length; i++) {
    var row = data[i];
    var sum_err = 0;
    // match the beacon ids
    for(var j = 0; j < arr.length; j++){
      //sum_err += Math.pow(row.beacons[j].rssi - arr[j].rssi, 2);
      sum_err += Math.pow(5 - 3, 2);
    }

    if(sum_err < min_err.err) {
      /*min_err.x = row.x;
      min_err.y = row.y;
      min_err.err = sum_err;*/
      console.log("~~~~~~~~~~~~~~~~~~Sum_err: ------------------------");
    }

    row_matched++;

    console.log("~~~~~~~~~~~~~~~~~~Sum_err: ");
    console.log(sum_err);
    console.log("~~~~~~~~~~~~~~~~~~min_err.err: ");
    console.log(min_err.err);
  }

  min_err.err = Math.sqrt(min_err.err/3); // TODO: Modify the error function
  // console.log(String.format("Total matched: {0}", row_matched));

  console.log("RESULT:", min_err);
  return min_err;
}

// Self-defined String.format
if (!String.format) {
  String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}
