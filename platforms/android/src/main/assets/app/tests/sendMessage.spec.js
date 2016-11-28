describe("sendMessage", function() {
    "use strict";

    var app, utils, context, contacts, sms, sendMessages;

    beforeEach(function() {

        app = require("application");
        utils = require("utils/utils");
        context = utils.ad.getApplicationContext();
        sms = android.telephony.SmsManager.getDefault();
        sendMessages = require('../src/sendMessages.js');

        contacts = [
            {contactName: "John Smith", contactPhone: "1111111111"},
            {contactName: "Jane Smith", contactPhone: "2222222222"},
            {contactName: "John Doe", contactPhone: "3333333333"},
            {contactName: "Jane Doe", contactPhone: "4444444444"}
        ]

    });

    /*

    describe("sendAll", function() {
        it("fires the SMS send service for each phone number in the phone numbers array", function() {
            spyOn(sendMessages, "sendSMS");
            sendMessages.init();
            expect(sendMessages.sendSMS).toHaveBeenCalledWith("1111111111");
            expect(sendMessages.sendSMS).toHaveBeenCalledWith("2222222222");
            expect(sendMessages.sendSMS).toHaveBeenCalledWith("3333333333");
            expect(sendMessages.sendSMS).toHaveBeenCalledWith("4444444444");
        });


    });
     */

    describe("sendText", function() {
        it("calls to the android SMS service", function() {
            spyOn(sms, "sendTextMessage");
            sendMessages.sendText("PendingIntent","1111111111");
            expect(sms.sendTextMessage).toHaveBeenCalledWith("1111111111", null, "this is a test", "PendingIntent", null);
        });
    });

    describe("returnPhoneArray", function() {
        it("Creates an new array of phone numbers from the contacts array", function() {
            expect(sendMessages.returnPhoneArray(contacts)).toEqual(["1111111111","2222222222","3333333333","4444444444"]);
        });
    });

    describe("extractPhoneNumber", function() {
        it("extracts a phone number from the contacts object", function() {
            expect(sendMessages.extractPhoneNumber(contacts[0])).toBe("1111111111");
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

    //This works but only on a live device. Since it cant be used as automated testing I am commenting. It can be uncommented for manual testing
    /*
    describe("broadCastReceiver", function() {
        it("responds to the pendingIntent event that is fired when a text has finished sending", function() {
            var id = "alertme-messageSent"
            var intent = new android.content.Intent(id);
            var pendingIntent = android.app.PendingIntent.getBroadcast(context, 0, intent, 0);
            spyOn(sendMessages, "broadcastReceiver");
            sms.sendTextMessage("5555555555", null, "Sent", pendingIntent, null);
            expect(sendMessages.broadcastReceiver).toHaveBeenCalled();
        })
    });
    */

});