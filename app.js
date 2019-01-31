var express = require('express');
var app = express();

// view engine setup
app.set('views', 'views');
app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', function (req, res) {
  // res.send('Hello World');
  res.sendfile('index.html');
});

app.get('/geomap', function (req, res) {
  res.render('geomap', { title: 'Geographic Map', message: 'Geographic Map' })
});

app.get('/scmap', function (req, res) {
  res.render('scmap', { title: 'Scematic Map', message: 'Scematic Map' })
});

app.listen(3000, function(){
  console.log("Listening on port 3000!")
});