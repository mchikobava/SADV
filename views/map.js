// var spbmap = L.map('mapspb').setView([54.7104, 20.4522], 13);
var spbmap = L.map('mapspb').setView([59.939, 30.314], 13);
var nameOfJSONFile = "points.json";
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiaHl1cHJpIiwiYSI6ImNqcjN0a3JrczB6czIzeHJwaGt5d2R4eDgifQ.WPlJ3g-F4576vC7L4RZptQ'
}).addTo(spbmap);

var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};

// load GeoJSON from an external file
// $.getJSON("points.geojson", function (data) {
//     // add GeoJSON layer to the map once the file is loaded
//     L.geoJson(data).addTo(map);
// });
var newColor = "";

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    // console.log(layer.style)
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
}

var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#008000",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

L.geoJSON(myLines, {
    style: function (feature) {
        switch (feature.properties.colour) {
            case 'red': return { color: "#FF0000" };
            case 'blue': return { color: "#0000FF" };
            case 'purple': return { color: "#800080" };
            case 'green': return { color: "#008000" };
            case 'orange': return { color: "#FFA500" };
        }
    },
    // onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {     
        switch (feature.properties.tags.colour) {
            case 'red': newColor = "#FF0000"; break;
            case 'blue': newColor = "#0000FF"; break;
            case 'purple': newColor = "#800080"; break;
            case 'green': newColor = "#008000"; break;
            case 'orange': newColor = "#FFA500"; break;
        }
        var geojsonMarkerOptions = {
            radius: 8,
            fillColor: newColor,
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
}).addTo(spbmap);
