var fs = require('fs');
const { Pool, Client } = require('pg')
const connectionString = 'postgres://postgres:postgres@127.0.0.1/gsdbomm'

const pool = new Pool({
  connectionString: connectionString,
})

// get all relation names from the db
//pool.query('SELECT table_name FROM information_schema.tables  WHERE table_schema=\'public\' AND table_type=\'BASE TABLE\'', (err, res) => {
//console.log(err, res)
//pool.end()
//})

// print all attribute names
// pool.query('SELECT * FROM information_schema.columns WHERE table_name   = \'osm_transport_points\'', (err, res) => {
//   for (var i = 0; i < res.rows.length; i++) {
//     console.log(res.rows[i].column_name)
// }
//   pool.end()
// })

var geometry, name;
var nameOfJSONFile = "points.json";
var data = [];

pool.query('SELECT name, ST_AsGeoJSON(geometry) as geometry FROM osm_transport_points', (err, res) => {
  // console.log(err, res)
  for (var i = 0; i < res.rows.length; i++) {
    name = res.rows[i].name;
    geometry = JSON.parse(res.rows[i].geometry)
    data.push({name: name, coordinates: geometry.coordinates})
    // console.log(geometry.coordinates)
  }
  pool.end()
  fs.writeFile(nameOfJSONFile, JSON.stringify(data), function (err) {
    if (err) {
      console.error("error writing grib2 file: " + err);
    } else { }
  });
})

//const client = new Client({
//  connectionString: connectionString,
//})
//client.connect()

//client.query('SELECT NOW()', (err, res) => {
//  console.log(err, res)
//  client.end()
//})
