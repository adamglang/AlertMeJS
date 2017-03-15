const permissions = require('nativescript-permissions');
let GetPermissions = {
    init: () => {
        permissions.requestPermission([android.Manifest.permission.READ_CONTACTS, android.Manifest.permission.SEND_SMS], "required for AlertMe to function")
    }
};

module.exports = GetPermissions;