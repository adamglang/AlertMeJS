describe("sendMessage", function() {
    "use strict";

    let app, utils, context, contacts, sms, sendMessages, message, model;

    beforeEach(function() {

        app = require("application");
        utils = require("utils/utils");
        context = utils.ad.getApplicationContext();
        sms = android.telephony.SmsManager.getDefault();
        sendMessages = require("../src/sendMessages");
        model = require("../main-view-model");
        message = require("../src/constructMessage");
        message.init = () => "test";

        model.contacts = [
            {contactName: "John Smith", contactPhone: "1111111111"},
            {contactName: "Jane Smith", contactPhone: "2222222222"},
            {contactName: "John Doe", contactPhone: "3333333333"},
            {contactName: "Jane Doe", contactPhone: "(444) 444-4444"}
        ];

        sendMessages.pendingIntent = (id) => {
            let intent = new android.content.Intent(id);
            return android.app.PendingIntent.getBroadcast(context, 0, intent, 0);
        }

    });

    afterEach(function() {
        model.switches.geoLocation = false;
    });

    describe("sendAll", function() {
        it("fires the SMS send service", () => {
            spyOn(sendMessages, "sendText");
            sendMessages.pendingIntent = () => "pendingIntent";
            sendMessages.init();
            expect(sendMessages.sendText).toHaveBeenCalledWith("pendingIntent","test","1111111111");
        });
    });

    describe("sendWithGeolocation", () => {
        it("sends to all preset parties with geotag when geotags are active", () => {
            spyOn(sendMessages, "sendWithGeolocation");
            model.switches.geoLocation = true;
            sendMessages.init();
            expect(sendMessages.sendWithGeolocation).toHaveBeenCalled();
        });
        it("sends to all preset parties without geotag if geolocation is off", () => {
            spyOn(sendMessages, "sendWithGeolocation");
            spyOn(sendMessages, "sendAll");
            sendMessages.init();
            expect(sendMessages.sendWithGeolocation).not.toHaveBeenCalled();
            expect(sendMessages.sendAll).toHaveBeenCalled();

        });
    });

    describe("sendText", () => {
        it("calls to the android SMS service", () => {
            message = "this is a test";
            spyOn(sms, "sendTextMessage");
            sendMessages.sendText("PendingIntent", message, "1111111111");
            expect(sms.sendTextMessage).toHaveBeenCalledWith("1111111111", null, "this is a test", "PendingIntent", null);
        });
    });

    describe("returnPhoneArray", () => {
        it("Creates an new array of phone numbers from the contacts array", () => {
            expect(sendMessages.returnPhoneArray(model.contacts)).toEqual(["1111111111","2222222222","3333333333","4444444444"]);
        });
    });

    describe("extractPhoneNumber", () => {
        it("extracts a phone number from the contacts object", () => {
            expect(sendMessages.extractPhoneNumber(model.contacts[0])).toBe("1111111111");
        });
    });

    
    describe("pendingIntent", () => {
        it("is a js object", () => {
            expect(typeof sendMessages.pendingIntent("someRandomString")).toBe("object");
        });
        it("is a pending Intent object", () => {
        expect(sendMessages.pendingIntent("someRandomString").toString().indexOf("PendingIntent") > -1).toBe(true);
        });
        it("is bound to the application context", () => {
            expect(sendMessages.pendingIntent("someRandomString").toString().indexOf("BinderProxy") > -1).toBe(true);
        });
    });

    describe("makeRandomId", () => {
        it("is a string", () => {
            expect(typeof sendMessages.makeRandomId()).toBe("string");
        });
        it("is alphanumeric", () => {
            let id = sendMessages.makeRandomId();
            expect(id.replace(/\W/g, '')).toEqual(id);
        });
        it("is 5 chars", () => {
            expect(sendMessages.makeRandomId().length).toBe(5);
        });
    });

});