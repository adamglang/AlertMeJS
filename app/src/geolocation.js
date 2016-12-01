var model = require("../main-view-model");
var geoLocation = require("nativescript-geolocation");
var permissions = require('nativescript-permissions');
var Toast = require("nativescript-toast");

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
    }
};

module.exports = GeoLocation;