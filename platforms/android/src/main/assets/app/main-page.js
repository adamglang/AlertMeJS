(function(Executables) {
    
    var model = require("./main-view-model");
    var getContacts = require('./src/getContacts.js');
    var getPermissions = require('./src/getPermissions.js');
    var sendMessage = require('./src/sendMessage.js');

    Executables.pageLoaded = function(args) {
        var page = args.object;
        page.bindingContext = model;
        getPermissions();
    };

    Executables.sendMessage = function(){
        sendMessage();
    };

    Executables.getContacts = function() {
        getContacts.init();
    };

}(exports));

