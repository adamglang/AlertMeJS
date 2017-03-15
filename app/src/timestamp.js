const model = require("../main-view-model"),
    Toast = require("nativescript-toast");

let Timestamp = {

    timestampEnabled: false,

    returnTimestamp: () => model.switches.timestamp ? "timestamp: " + new Date() : "",

    toggleTimestamp: function() {
        if(this.timestampEnabled) {
            model.switches.timestamp ? Toast.makeText("Timestamp Deactivated").show() : Toast.makeText("Timestamp Activated").show();
        }
        this.timestampEnabled = true;
    }
};

module.exports = Timestamp;