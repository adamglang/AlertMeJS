describe("geoLocation", function() {
    "use strict";

    let app, geolocation, geoLocation, permissions, model, android;

    beforeEach(() => {

        app = require("application");
        geolocation = require("nativescript-geolocation");
        geoLocation = require('../src/geolocation.js');
        permissions = {
            requestPermission: () =>{}
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

    describe("toggleGeoLocation", () => {
        
    });

});