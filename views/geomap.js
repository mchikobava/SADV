// define the coordinates for the city to show and the zoom level
var spbmap = L.map('mapspb').setView([59.939, 30.314], 13);

// app the map to the web site
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiaHl1cHJpIiwiYSI6ImNqcjN0a3JrczB6czIzeHJwaGt5d2R4eDgifQ.WPlJ3g-F4576vC7L4RZptQ'
}).addTo(spbmap);

// auxilliarry function to add popups to the stations
function onEachFeature(feature, layer) {
    console.log(feature.properties)
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
    style: function (feature) {
        // color line accordingly to their color
        switch (feature.properties.colour) {
            case 'red': return { color: "#FF0000" };
            case 'blue': return { color: "#0000FF" };
            case 'purple': return { color: "#800080" };
            case 'green': return { color: "#008000" };
            case 'orange': return { color: "#FFA500" };
        }
    },
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        // color points accordingly to their color
        var newColor = "";
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
        // add points to the map
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
}).addTo(spbmap);
