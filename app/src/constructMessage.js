var model = require("../main-view-model");
var timestamp = require("./timestamp");
var geolocation = require("./geolocation");

var Message = {

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