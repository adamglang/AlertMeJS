describe("sendMessage", function() {
    "use strict";

    var app, utils, context, contacts, sms, sendMessages, message, model;

    beforeEach(function() {

        app = require("application");
        utils = require("utils/utils");
        context = utils.ad.getApplicationContext();
        sms = android.telephony.SmsManager.getDefault();
        sendMessages = require("../src/sendMessages");
        model = require("../main-view-model");
        message = require("../src/constructMessage");
        message.init = function(){return "test"}

        model.contacts = [
            {contactName: "John Smith", contactPhone: "1111111111"},
            {contactName: "Jane Smith", contactPhone: "2222222222"},
            {contactName: "John Doe", contactPhone: "3333333333"},
            {contactName: "Jane Doe", contactPhone: "(444) 444-4444"}
        ];

        sendMessages.pendingIntent = function(id) {
            var intent = new android.content.Intent(id);
            return android.app.PendingIntent.getBroadcast(context, 0, intent, 0);
        }

    });

    afterEach(function() {
        model.switches.geoLocation = false;
    });

    describe("sendAll", function() {
        it("fires the SMS send service", function() {
            spyOn(sendMessages, "sendText");
            sendMessages.pendingIntent = function() {return "pendingIntent"};
            sendMessages.init();
            expect(sendMessages.sendText).toHaveBeenCalledWith("pendingIntent","test","1111111111");
        });
    });

    describe("sendWithGeolocation", function() {
        it("sends to all preset parties with geotag when geotags are active", function() {
            spyOn(sendMessages, "sendWithGeolocation");
            model.switches.geoLocation = true;
            sendMessages.init();
            expect(sendMessages.sendWithGeolocation).toHaveBeenCalled();
        });
        it("sends to all preset parties without geotag if geolocation is off", function() {
            spyOn(sendMessages, "sendWithGeolocation");
            spyOn(sendMessages, "sendAll");
            sendMessages.init();
            expect(sendMessages.sendWithGeolocation).not.toHaveBeenCalled();
            expect(sendMessages.sendAll).toHaveBeenCalled();

        });
    });

    describe("sendText", function() {
        it("calls to the android SMS service", function() {
            message = "this is a test";
            spyOn(sms, "sendTextMessage");
            sendMessages.sendText("PendingIntent", message, "1111111111");
            expect(sms.sendTextMessage).toHaveBeenCalledWith("1111111111", null, "this is a test", "PendingIntent", null);
        });
    });

    describe("returnPhoneArray", function() {
        it("Creates an new array of phone numbers from the contacts array", function() {
            expect(sendMessages.returnPhoneArray(model.contacts)).toEqual(["1111111111","2222222222","3333333333","4444444444"]);
        });
    });

    describe("extractPhoneNumber", function() {
        it("extracts a phone number from the contacts object", function() {
            expect(sendMessages.extractPhoneNumber(model.contacts[0])).toBe("1111111111");
        });
    });

    
    describe("pendingIntent", function() {
        it("is a js object", function () {
            expect(typeof sendMessages.pendingIntent("someRandomString")).toBe("object");
        });
        it("is a pending Intent object", function() {
        expect(sendMessages.pendingIntent("someRandomString").toString().indexOf("PendingIntent") > -1).toBe(true);
        });
        it("is bound to the application context", function() {
            expect(sendMessages.pendingIntent("someRandomString").toString().indexOf("BinderProxy") > -1).toBe(true);
        });
    });

    describe("makeRandomId", function() {
        it("is a string", function() {
            expect(typeof sendMessages.makeRandomId()).toBe("string");
        });
        it("is alphanumeric", function() {
            var id = sendMessages.makeRandomId();
            expect(id.replace(/\W/g, '')).toEqual(id);
        });
        it("is 5 chars", function() {
            expect(sendMessages.makeRandomId().length).toBe(5);
        });
    });

});