var rnc = rnc || {};

rnc.router = function () {

    console.log("starting our app");

    // sorry, no Backbone router here since chocolate chip handles the routes
    // instead we bind the navigation events to backbone views

    function navEventHandler(data, url) {
        console.log("nav to " + url);
        rnc.Event.trigger("route:" + url, url);
    }

    $.subscribe('chui/navigateBack/enter', navEventHandler);
    $.subscribe('chui/navigate/enter', navEventHandler);

//    new rnc.Views.Listings();
//    new rnc.Views.Main();
}


// wait for everything to be ready then run the demo code
rnc.resolver.initialize(function () {
    rnc.router();
    console.info("The app is initialized");

    rnc.Event.on('rnc_tweets_authorized', function (evt) {
        rnc.Collections.tweets.fetch();
    });

    rnc.Collections.tweets = new rnc.Collections.Tweets();

});