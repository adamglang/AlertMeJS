var app = require("application");
var utils = require("utils/utils");
var context = utils.ad.getApplicationContext();
var sms = android.telephony.SmsManager.getDefault();
var model = require("../main-view-model");


var SendMessages = {

    init: function() {
            var id = this.makeRandomId();
            this.sendAll(id);
    },

    sendAll: function(id) {
        var counter = 0;
        var phoneNumbers = this.returnPhoneArray(model.contacts);
        var self = this;

        function send() {

            if(counter < phoneNumbers.length) {
                var uniqueId = id + counter;
                self.sendText(self.pendingIntent(uniqueId), phoneNumbers[counter]);
                self.broadcastReceiver((uniqueId), function () {
                    counter++;
                    send();
                });
            }
            
        }
        send();
    },

    sendText: function(pendingIntent, phoneNumber) {
        sms.sendTextMessage(phoneNumber, null, "this is a test", pendingIntent, null);
    },
    
    returnPhoneArray: function(contactsArray) {
        var self = this;
        var phoneNumbersArray = [];
        contactsArray.forEach(function(contact) {
            phoneNumbersArray.push(self.extractPhoneNumber(contact));
        });
        return phoneNumbersArray;
    },

    extractPhoneNumber: function(contact) {
        for(var key in contact) {
            if(key === "contactPhone") {
                return contact[key];
            }
        }
    },

    pendingIntent: function(id) {
        var intent = new android.content.Intent(id);
        return android.app.PendingIntent.getBroadcast(context, 0, intent, 0);
    },

    broadcastReceiver: function(id, callback) {
        app.android.registerBroadcastReceiver(id, function() {
            callback();
        });
    },

    makeRandomId: function() {
        var id = "";
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for(var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

};

module.exports = SendMessages;