/// <reference path="../lib/jquery-1.8.3.js" />
/// <reference path="../lib/message.js" />

// The background API.
var ns_background = {

    // Global data container.
    ns_global: {

        ns_whitelist: []

    },

    // Posts a message to another window.
    ns_post: function (target, targetURL, message) {
        target.postMessage(JSON.stringify(message), targetURL);
    },

    // Storage manager.
    ns_storage: {

        // Sets data into browser storage.
        ns_set: function (key, data) {

            // html5 local storage implementation.
            if (window.localStorage) {
                window.localStorage[key] = data;
            }

            // TODO:
            // add implementation for cookie, SqlLight and session storage.

        },

        // Gets data from browser storage.
        ns_get: function (key) {

            var retval = null;

            // html5 local storage implementation.
            if (window.localStorage) {
                retval = window.localStorage[key];
            }

            // TODO:
            // add implementation for cookie, SqlLight and session storage.

            return retval;

        }

    },

    // Initialize method.
    ns_init: function (whitelist) {

        ns_background.ns_global.ns_whitelist = whitelist;

        // Bind the onMessage handler to the message event.
        jq$(window).bind("message", ns_background.ns_handlers.ns_onMessage);

    },

    // Event handlers.
    ns_handlers: {

        // Request handler.
        ns_onRequest: function (message, eventData) {

            switch (message.action) {

                case "set": {

                    // Sets the data into browser storage.
                    ns_background.ns_storage.ns_set(message.data.key, message.data.val);

                } break;

                case "get": {

                    // Gets the data from browser storage.
                    var val = ns_background.ns_storage.ns_get(message.data.key);

                    // Posts the data back to caller.
                    var response = new ns_message("callback", message.action, { key: message.data.key, val: val }, message.id);
                    ns_background.ns_post(eventData.source, eventData.origin, response); 

                } break;

            }

        },

        // Message handler.
        ns_onMessage: function (e) {

            // Get event data.
            var eventData = e.originalEvent ? e.originalEvent : e;

            var allow = false;

            // Check if message arrived from allowed domain.
            for (var i in ns_background.ns_global.ns_whitelist) {

                if (eventData.origin == ns_background.ns_global.ns_whitelist[i] || "*" == ns_background.ns_global.ns_whitelist[i]) {
                    allow = true;
                    break;
                }

            }

            if (allow) {

                var message = null;
                try {
                    message = JSON.parse(eventData.data);
                }
                catch (error) {
                    eval("message = " + eventData.data);
                }

                // Make sure we have a valid message object.
                if (message.type && message.action && message.data) {
                    
                    if (message.type == "request") {

                        // Send the message to request handler.
                        ns_background.ns_handlers.ns_onRequest(message, eventData);

                    }

                }

            }

        }

    },

    // Ajax wrapper.
    ns_ajax: function() {

        // TODO:
        // implement.

    }

};

// Document ready event handler.
jq$(document).ready(function () {

    // Initialize the background API.
    ns_background.ns_init(["*",window.location.origin]);

});
