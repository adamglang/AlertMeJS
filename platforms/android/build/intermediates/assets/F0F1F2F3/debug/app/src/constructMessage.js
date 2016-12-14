var model = require("../main-view-model");
var timestamp = require("./timestamp");
var geolocation = require("./geolocation");

var Message = {

    init: function() {
        return "This is a test from AlertMe " + timestamp.returnTimestamp() + " " + geolocation.returnGeoLocation();
    }

};

module.exports = Message;