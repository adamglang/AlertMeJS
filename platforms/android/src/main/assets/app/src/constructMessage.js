const model = require("../main-view-model"),
    timestamp = require("./timestamp"),
    geolocation = require("./geolocation");

let Message = {

    init: function(location) {
        return "This is a test from AlertMe " + timestamp.returnTimestamp() + " " + geolocation.getCoordinates(location);
    },
    
    getMessageTextFieldContent: function() {
        model.messageTextFieldVal.on("valueUpdate", function(data) {
            console.log(data.value);
        });
    }

};

module.exports = Message;