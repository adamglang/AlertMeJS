const observable = require("data/observable");
const ObservableArray = require("data/observable-array").ObservableArray;

const model = observable.fromObject({
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