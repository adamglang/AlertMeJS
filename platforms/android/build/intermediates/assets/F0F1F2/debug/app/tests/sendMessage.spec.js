describe("sendMessage", function() {
    "use strict";

    var sendMessages, model, sms;

    beforeEach(function() {

        sendMessages = require('../src/sendMessages.js');

        model = {
            contacts: [
                {contactName: "John Smith", contactPhone: "1111111111"},
                {contactName: "Jane Smith", contactPhone: "2222222222"},
                {contactName: "John Doe", contactPhone: "3333333333"},
                {contactName: "Jane Doe", contactPhone: "4444444444"}
            ]
        };
        
        sms = {
            sendTextMessage: function(phoneNumber, scAddress, message, sentIntent, deliveryIntent) {}
        }

    });
    
    /*

    describe("sendSMS", function() {
        it("fires the SMS send service for each phone number in the phone numbers array", function() {
            spyOn(sendMessages, "sendSMS");
            sendMessages.init();
            expect(sendMessages.sendSMS).toHaveBeenCalledWith("1111111111");
            expect(sendMessages.sendSMS).toHaveBeenCalledWith("2222222222");
            expect(sendMessages.sendSMS).toHaveBeenCalledWith("3333333333");
            expect(sendMessages.sendSMS).toHaveBeenCalledWith("4444444444"); 
        });
        
        it("calls to the android SMS service", function() {
            spyOn(sms, "sendTextMessage");
            sendMessages.sendSMS("1111111111","Hello");
            expect(sms.sendTextMessage()).toHaveBeenCalledWith("1111111111", null, "Hello", null, null);
        });
    });
    
    describe("constructPhoneNumberArray", function() {
        it("Creates an new array of phone numbers from the contacts array", function() {
            expect(sendMessages.constructPhoneNumberArray(model.contacts)).toBe(["1111111111","2222222222","3333333333","4444444444"]); 
        });
    });

    describe("extractPhoneNumber", function() {
        it("extracts a phone number from the contacts object", function() {
            expect(sendMessages.extractPhonenumber(model.contacts[1])).toBe("1111111111"); 
        });
    });
    
    */
    
    describe("pendingIntent", function() {
        it("makes a js object which acts as a representation of android's pending intent data type", function() {
            expect(typeof sendMessages.pendingIntent("someRandomString")).toBe("Object");
            expect(sendMessages.pendingIntent("someRandomString").toString().indexOf("PendingIntent") > -1).toBe(true);
            expect(sendMessages.pendingIntent("someRandomString").toString().indexOf("BinderProxy") > -1).toBe(true);
        });
    });


});