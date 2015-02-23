// Message class.
var ns_message = function (type, action, data, id) {

    if (id) {
        this.id = id;
    }
    else {
        this.id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // string: type (request/callback).
    this.type = type;

    // string: action (action id).
    this.action = action;

    // object: data (custom object).
    this.data = data;

};