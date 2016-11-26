var app = require("application");
var utils = require("utils/utils");
var context = utils.ad.getApplicationContext();
var sms = android.telephony.SmsManager.getDefault();
var model = require("../main-view-model");


var SendMessages = {

    init: function() {
            var id = "messageSent";
            this.sendText(id, this.pendingIntent(id));
    },

    sendText: function(id, pendingIntent) {
        sms.sendTextMessage("2069312099", null, "Sent from alert me :)", pendingIntent, null);
        this.broadcastReceiver(id, function() {
            console.log("$$$$$ text sent $$$$$");
        });
    },

    pendingIntent: function(id) {
        var intent = new android.content.Intent(id);
        return android.app.PendingIntent.getBroadcast(context, 0, intent, 0);
    },

    broadcastReceiver: function(id, callback) {
        app.android.registerBroadcastReceiver(id, function() {
            callback();
        });
    }

};

module.exports = SendMessages;