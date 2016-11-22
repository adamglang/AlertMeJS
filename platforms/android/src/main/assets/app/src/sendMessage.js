var sendMessage = function() {

    var SendMessage = this;
    var sms = android.telephony.SmsManager.getDefault();
    var model = require("../main-view-model");

    SendMessage.init = (function() {
        var phonenumber = model.phone.value;
        sms.sendTextMessage(phonenumber, null, "Sent from alert me :)", null, null);
    }());

};

module.exports = sendMessage;