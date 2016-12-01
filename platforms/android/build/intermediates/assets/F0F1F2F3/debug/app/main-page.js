(function(Executables) {
    
    var model = require("./main-view-model");
    var getContacts = require('./src/getContacts');
    var getPermissions = require('./src/getPermissions');
    var sendMessages = require('./src/sendMessages');
    var geoLocation = require('./src/geolocation');
    var constructMessage = require('./src/constructMessage');
    var timestamp = require('./src/timestamp');

    Executables.pageLoaded = function(args) {
        var page = args.object;
        page.bindingContext = model;
        getPermissions();
    };
    
    Executables.toggleGeoLocation = function() {
        geoLocation.init();
    };
    
    Executables.toggleTimestamp = function() {
        timestamp.toggleTimestamp();
    };
    

    Executables.sendMessage = function(){
        sendMessages.init();
    };

    Executables.getContacts = function() {
        getContacts.init();
    };

    Executables.removeContacts = function() {
        getContacts.removeContacts();
    };

}(exports));

