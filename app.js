var express = require('express');
var app = express();

// engine setup
app.set('views', 'views');
app.set('view engine', 'pug');

app.use(express.static('public'));

// returns the initial page to the web browser
app.get('/', function (req, res) {
  res.sendfile('index.html');
});


// returns the page with the geographic map to the web browser
app.get('/geomap', function (req, res) {
  res.render('geomap', { title: 'Geographic Map', message: 'Geographic Map' })
});

// returns the page with the schematic map to the web browser
app.get('/scmap', function (req, res) {
  res.render('scmap', { title: 'Scematic Map', message: 'Scematic Map' })
});

app.get('/museum.png', function (req, res) {

  res.sendfile('museum.png');

  // var img = fs.readFileSync('./museum.png');
  // res.writeHead(200, {'Content-Type': 'image/png' });
  // res.end(img, 'binary');
});

// port definition
app.listen(3000, function(){
  console.log("Listening on port 3000!")
});