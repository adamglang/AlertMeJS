var model = require("../main-view-model");
var Toast = require("nativescript-toast");

var Timestamp = {

    timestampEnabled: false,

    returnTimestamp: function() {
        return model.switches.timestamp ? "timestamp: " + new Date() : "";
    },

    toggleTimestamp: function() {
        if(this.timestampEnabled) {
            model.switches.timestamp ? Toast.makeText("Timestamp Deactivated").show() : Toast.makeText("Timestamp Activated").show();
        }
        this.timestampEnabled = true;
    }
};

module.exports = Timestamp;