var gestures = require("ui/gestures");

var ViewBehaviors = {

    pageLoaded: function(args) {
        var page = args.object;
        this.removeKeyboardOnMessageFieldBlur(page);
    },

    removeKeyboardOnMessageFieldBlur: function(page) {
        var messageField = page.getViewById("messageTextField");
        page.observe(gestures.GestureTypes.tap, function() {
            messageField.dismissSoftInput();
        });
    }

};

module.exports = ViewBehaviors;