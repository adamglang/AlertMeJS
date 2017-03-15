const gestures = require("ui/gestures");

let ViewBehaviors = {

    pageLoaded: function(args) {
        let page = args.object;
        this.removeKeyboardOnMessageFieldBlur(page);
    },

    removeKeyboardOnMessageFieldBlur: function(page) {
        let messageField = page.getViewById("messageTextField");
        page.observe(gestures.GestureTypes.tap, () => messageField.dismissSoftInput());
    }

};

module.exports = ViewBehaviors;