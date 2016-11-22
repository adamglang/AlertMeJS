var getPermissions = function() {

    var GetPermissions = this;
    var permissions = require('nativescript-permissions');

    GetPermissions.init = (function() {
        permissions.requestPermission([android.Manifest.permission.READ_CONTACTS, android.Manifest.permission.SEND_SMS], "required for AlertMe to function")
    }());
};

module.exports = getPermissions;