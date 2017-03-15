const model = require("../main-view-model"),
    permissions = require('nativescript-permissions'),
    Toast = require("nativescript-toast"),
    constructMessage = require("./constructMessage");

let GeoLocation = {

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

    getCoordinates: (location) => model.switches.geoLocation ? "from location: https://www.google.com/maps/?q=" + location.latitude + "," + location.longitude : ""
};

module.exports = GeoLocation;