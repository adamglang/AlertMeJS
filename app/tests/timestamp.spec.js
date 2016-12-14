describe("timestamp", function() {
    "use strict";

    var app, timestamp, model;

    beforeEach(function() {
        model = require("../main-view-model");
        app = require("application");
        timestamp = require('../src/timestamp.js');
    });

    afterEach(function() {
        model.switches.timestamp = false;
    });

    describe("returnTimestamp", function() {
        it("adds a timestamp to the message if toggle is on", function() {
            model.switches.timestamp = true;
            var isDate = function(date) {
                return ( (new Date(date) !== "Invalid Date" && !isNaN(new Date(date)) ));
            };
            console.log("!!!!!!!" + timestamp.returnTimestamp());
            expect(isDate(timestamp.returnTimestamp())).toBe(true);
        });
        it("returns an empty string if the toggle is off", function() {
            expect(timestamp.returnTimestamp()).toBe("");
        });
    });

});