/* This part uses jQuery's version of promises to wait until both jQuery and PhoneGap are ready */

var rnc = rnc || {};

// why pass these global variables into this method
(function (rnc, $, doc) {
    "use strict"

    rnc.onTheWeb = false;
    rnc.resolver = {
        jqReady: $.Deferred(),
        pgReady: $.Deferred(),
        /* Callback for when the app is ready */
        callback: null,

        initialize: function (callback) {
            var that = this;
            rnc.resolver.callback = callback;

            // are we running on the web?
            if (doc.URL.match(/^https?:/)) {
                console.log("Running on the web");
                rnc.onTheWeb = true;
                // In case of web, we ignore PG but resolve the Deferred Object to trigger initialization
                that.pgReady.resolve();
            }
            else {
                console.log("NOT running on the web");
                doc.addEventListener("deviceready", function () {
                    that.pgReady.resolve();
                }, false);
            }

            // wait for the jQuery doc ready event

            $(doc).ready(function () {
                console.log("jQuery document ready");
                that.jqReady.resolve();
            });

            // if we wanted to be super thorough we go add a setTimeout here
            // which would fail the promise after waiting a sufficient of time
        }
    };

    $.when(rnc.resolver.jqReady, rnc.resolver.pgReady).then(function () {
        console.log("Frameworks ready.");
        // both frameworks have initialized, so call the callback if one exists
        if (rnc.resolver.callback) {
            rnc.resolver.callback();
        }
    });
}(rnc, jQuery, document));
