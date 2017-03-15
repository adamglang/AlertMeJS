const app = require("application");
const utils = require("utils/utils");
const geoLocation = require("nativescript-geolocation");
const context = utils.ad.getApplicationContext();
const message = require("./constructMessage");
const model = require("../main-view-model");
const sms = android.telephony.SmsManager.getDefault();

let SendMessages = {

    init: function() {
        let id = this.makeRandomId();
        model.switches.geoLocation ? this.sendWithGeolocation(id) : this.sendAll(id, 0);
    },

    sendWithGeolocation: function(id) {
        let self = this;
        geoLocation.getCurrentLocation().then(function(location) {
            self.sendAll(id, 0, location);
        }).catch(function(e) {
            console.log(e.stack);
        })
    },

    sendAll: function(id, counter, location) {
        let self = this;
        let phoneNumbers = this.returnPhoneArray(model.contacts);
        if(counter < phoneNumbers.length) {
            let uniqueId = id + counter;
            self.sendText(self.pendingIntent(uniqueId), message.init(location), phoneNumbers[counter]);
            self.broadcastReceiver((uniqueId), function () {
                counter++;
                self.sendAll(id, counter, location);
            });
        }
    },

    sendText: function(pendingIntent, message, phoneNumber) {
        sms.sendTextMessage(phoneNumber, null, message, pendingIntent, null);
    },

    returnPhoneArray: function(contactsArray) {
        let self = this;
        let phoneNumbersArray = [];
        contactsArray.forEach((contact) => {
            phoneNumbersArray.push(self.extractPhoneNumber(contact));
        });
        return phoneNumbersArray;
    },

    extractPhoneNumber: function(contact) {
        for(let key in contact) {
            if(key === "contactPhone") {
                return contact[key].replace(/[^0-9.]/g, "");
            }
        }
    },

    pendingIntent: function(id) {
        let intent = new android.content.Intent(id);
        return android.app.PendingIntent.getBroadcast(context, 0, intent, 0);
    },

    broadcastReceiver: function(id, callback) {
        app.android.registerBroadcastReceiver(id, function() {
            callback();
        });
    },

    makeRandomId: function() {
        let id = "";
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for(let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

};

module.exports = SendMessages;