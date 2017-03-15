var observable = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;

var model = observable.fromObject({
    contacts: new ObservableArray([]),
    switches: new observable.Observable({
        "timestamp": false,
        "geoLocation": false
    }),
    messageTextFieldVal: new observable.Observable({
        textFieldInput: ""
    })
});
module.exports = model;