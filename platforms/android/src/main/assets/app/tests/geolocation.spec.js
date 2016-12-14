describe("geoLocation", function() {
    "use strict";

    var app, geolocation, geoLocation, permissions, model, android;

    beforeEach(function() {

        app = require("application");
        geolocation = require("nativescript-geolocation");
        geoLocation = require('../src/geolocation.js');
        permissions = {
            requestPermission: function(){}
        };

        model = {
            switches: {
                geoLocation: false
            }
        };

        android = {
            Manifest: {
                permission: {
                    ACCESS_FINE_LOCATION: true
                }
            }
        }


    });

    describe("toggleGeoLocation", function() {
        
    });

});