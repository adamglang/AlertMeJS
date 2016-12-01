var model = require("../main-view-model");
var timestamp = require("./timestamp");

var Message = {

    init: function() {
        return "This is a test from AlertMe " + timestamp.returnTimestamp();
    }

};

module.exports = Message;