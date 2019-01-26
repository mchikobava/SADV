var filepath = '/views/pointsFromOSM.js';
var osm2geojson = require('osm2geojson')(filepath, { failEvents: true });
 
osm2geojson.on('fail', function(failure) {
  console.log(failure.message);
  // way!8914650!3 | location of at least one of the nodes in this way not set
});
 
osm2geojson.pipe(aWritableStream);