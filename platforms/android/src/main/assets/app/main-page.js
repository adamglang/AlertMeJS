var model = require("./main-view-model");
var getContacts = require("./src/getContacts");
var getPermissions = require("./src/getPermissions");
var sendMessages = require("./src/sendMessages");
var geoLocation = require("./src/geolocation");
var constructMessage = require("./src/constructMessage");
var timestamp = require("./src/timestamp");
var viewBehaviors = require("./src/viewBehaviors");

var Executables = {

    pageLoaded: function(args) {
        args.object.bindingContext = model;
        getPermissions.init();
        viewBehaviors.pageLoaded(args);
        constructMessage.getMessageTextFieldContent();
    },

    toggleGeoLocation: function() {
        geoLocation.init();
    },

    toggleTimestamp: function() {
        timestamp.toggleTimestamp();
    },

    sendMessage: function() {
        sendMessages.init();
    },

    getContacts: function() {
        getContacts.init();
    },

    removeContacts: function() {
        getContacts.removeContacts();
    }
};

module.exports = Executables;

