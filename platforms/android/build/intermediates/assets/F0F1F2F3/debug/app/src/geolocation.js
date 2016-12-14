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
        this.getCoordinates();
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

    getCoordinates: function() {
        return geoLocation.getCurrentLocation().then(function(location) {
            return " latitude: " + location.latitude + " longitude:" + location.longitude
        });
    },

    returnGeoLocation: function() {
       return model.switches.geoLocation ? this.getCoordinates() : "";
    }

};

module.exports = GeoLocation;