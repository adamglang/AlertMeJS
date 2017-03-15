describe("timestamp", function() {
    "use strict";

    var app, timestamp, model, Toast;

    beforeEach(function() {
        model = require("../main-view-model");
        app = require("application");
        timestamp = require('../src/timestamp.js');
        Toast = require("nativescript-toast");
        timestamp.timestmapEnabled = true;
        Toast.makeText.show = function(){};
    });

    afterEach(function() {
        model.switches.timestamp = false;
        timestamp.timestampEnabled = false;
    });

    describe("returnTimestamp", function() {
        it("adds a timestamp to the message if toggle is on", function() {
            model.switches.timestamp = true;
            var isDate = function(date) {
                return ( (new Date(date) !== "Invalid Date" && !isNaN(new Date(date)) ));
            };
            expect(isDate(timestamp.returnTimestamp())).toBe(true);
        });
        it("returns an empty string if the toggle is off", function() {
            expect(timestamp.returnTimestamp()).toBe("");
        });
    });

    /*guess you can't test for toast messages... http://stackoverflow.com/questions/2405080/how-to-test-for-the-appearance-of-a-toast-message*/

});