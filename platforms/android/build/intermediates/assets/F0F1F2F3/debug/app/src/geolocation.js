var model = require("../main-view-model");
var permissions = require('nativescript-permissions');
var Toast = require("nativescript-toast");
var constructMessage = require("./constructMessage");

var GeoLocation = {

    geoLocationEnabled: false,

    init: function() {
        if(this.geoLocationEnabled) {
            this.toggleGeoLocation();
        }
        this.geoLocationEnabled = true;
    },

    toggleGeoLocation: function() {
        if(!model.switches.geoLocation) {
            permissions.requestPermission(android.Manifest.permission.ACCESS_FINE_LOCATION, "required for AlertMe Geo Location services").then(function() {
                Toast.makeText("Geo Location services activated").show();
            }).catch(function() {
                Toast.makeText("Geo Location services cannot be used until permission is granted").show();
            });
        }
        else {
            Toast.makeText("Geo Location services deactivated").show();
        }
    },

    getCoordinates: function(location) {
        return model.switches.geoLocation ? "from location: https://www.google.com/maps/?q=" + location.latitude + "," + location.longitude : "";
    }
};

module.exports = GeoLocation;