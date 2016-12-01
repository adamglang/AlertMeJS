describe("constructMessage", function() {
    "use strict";

    var app, constructMessage, model;

    beforeEach(function() {

        model = {
            switches: {
                timestamp: false
            }
        };

        app = require("application");
        constructMessage = require('../src/constructMessage.js');
        model.switches.timestamp = false;

    });

    describe("sendText", function() {
        it("calls to the android SMS service", function() {
            spyOn(sms, "sendTextMessage");
            sendMessages.sendText("PendingIntent","1111111111");
            expect(sms.sendTextMessage).toHaveBeenCalledWith("1111111111", null, "this is a test", "PendingIntent", null);
        });
    });

    describe("toggleTimestamp", function() {
        it("adds a timestamp to the message if toggle is on", function() {
            model.switches.timestamp = true;
            var isDate = function(date) {
                return ( (new Date(date) !== "Invalid Date" && !isNaN(new Date(date)) ));
            };
            expect(isDate(constructMesssage.toggleTimestamp())).toBe(true);
        });
        it("returns an empty string if the toggle is off", function() {
            expect(constructMesssage.toggleTimestamp()).toBe("");
        });
    });

});