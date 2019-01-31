// define the coordinates for the city to show and the zoom level
var spbmap = L.map('mapspb').setView([59.939, 30.314], 13);
// var spbmap = L.map('map', {
// crs: L.CRS.Simple
// });

// app the map to the web site
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiaHl1cHJpIiwiYSI6ImNqcjN0a3JrczB6czIzeHJwaGt5d2R4eDgifQ.WPlJ3g-F4576vC7L4RZptQ',
}).addTo(spbmap);

spbmap.dragging.disable();

var blueLine = [];
var redLine = [];
var purpleLine = [];
var greenLine = [];
var orangeLine = [];

var redPolyline;
var bluePolyline;
var purplePolyline;
var greenPolyline;
var orangePolyline;

var polylines;

// auxilliarry function to add popups to the stations
function onEachFeature(feature, layer) {
    // console.log(feature.properties)
    // check whether it is a point
    if (feature.properties.tags != undefined) {
        if (feature.properties && feature.properties.tags.name) {
            // ashow the station name on click
            layer.bindPopup(feature.properties.tags.name);
        }
    }

}

// add lines to the map
L.geoJSON(myLines, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        // color points accordingly to their color
        var newColor = "";
        switch (feature.properties.tags.colour) {
            case 'red':
                newColor = "#FF0000";
                break;
            case 'blue':
                newColor = "#0000FF";
                break;
            case 'purple':
                newColor = "#800080";
                break;
            case 'green':
                newColor = "#008000";
                break;
            case 'orange':
                newColor = "#FFA500"
                break;
        }
        var geojsonMarkerOptions = {
            radius: 8,
            fillColor: newColor,
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };
        // add movable points to the map
        var circle = L.circleMarker(latlng, geojsonMarkerOptions).on({
            mousedown: function () {
                spbmap.on('mousemove', function (e) {
                    var index;
                    switch (circle.options.fillColor) {
                        case '#FF0000':
                            index = redLine.indexOf(circle.getLatLng());
                            redLine[index] = e.latlng;
                            break;
                        case '#0000FF':
                            index = blueLine.indexOf(circle.getLatLng());
                            blueLine[index] = e.latlng;
                            break;
                        case '#800080':
                            index = purpleLine.indexOf(circle.getLatLng());
                            purpleLine[index] = e.latlng;
                            break;
                        case '#008000':
                            index = greenLine.indexOf(circle.getLatLng());
                            greenLine[index] = e.latlng;
                            break;
                        case '#FFA500':
                            index = orangeLine.indexOf(circle.getLatLng());
                            orangeLine[index] = e.latlng;
                            break;
                    }
                    circle.setLatLng(e.latlng);
                });
            }
        });
        spbmap.on('mouseup', function (e) {
            spbmap.removeEventListener('mousemove');
        });
        switch (feature.properties.tags.colour) {
            case 'red':
                // newColor = "#FF0000";
                redLine.push(circle.getLatLng());
                break;
            case 'blue':
                // newColor = "#0000FF";
                blueLine.push(circle.getLatLng());
                break;
            case 'purple':
                // newColor = "#800080";
                purpleLine.push(circle.getLatLng());
                break;
            case 'green':
                // newColor = "#008000";
                greenLine.push(circle.getLatLng());
                break;
            case 'orange':
                // newColor = "#FFA500";
                orangeLine.push(circle.getLatLng());
                break;
        }
        return circle;
    }
}).addTo(spbmap);

function sortLngLatRed(a, b) {
    return b.distanceTo([60.0503169, 30.4426694]) - a.distanceTo([60.0503169, 30.4426694])
}
function sortLngLatBlue(a, b) {
    return b.distanceTo([60.0669104, 30.3340207]) - a.distanceTo([60.0669104, 30.3340207])
}
function sortLngLatPurple(a, b) {
    return b.distanceTo([60.0094283, 30.2575166]) - a.distanceTo([60.0094283, 30.2575166])
}
function sortLngLatGreen(a, b) {
    return b.distanceTo([59.9873791, 30.2022463]) - a.distanceTo([59.9873791, 30.2022463])
}
function sortLngLatOrange(a, b) {
    return b.distanceTo([59.9260656, 30.3179991]) - a.distanceTo([59.9260656, 30.3179991])
}

function redraw() {

    if (polylines != undefined) {
        clearPolylines();
    }

    redPolyline = L.polyline(redLine.sort(sortLngLatRed), { color: 'red' }).addTo(spbmap);
    bluePolyline = L.polyline(blueLine.sort(sortLngLatBlue), { color: 'blue' }).addTo(spbmap);
    purplePolyline = L.polyline(purpleLine.sort(sortLngLatPurple), { color: '#800080' }).addTo(spbmap);
    greenPolyline = L.polyline(greenLine.sort(sortLngLatGreen), { color: 'green' }).addTo(spbmap);
    orangePolyline = L.polyline(orangeLine.sort(sortLngLatOrange), { color: 'orange' }).addTo(spbmap);

    var polylineArray = [redPolyline, bluePolyline, purplePolyline, greenPolyline, orangePolyline];
    polylines = L.layerGroup(polylineArray);
    polylines.addTo(spbmap);
}

// clear polylines   
function clearPolylines() {
    spbmap.removeLayer(polylines);
}

