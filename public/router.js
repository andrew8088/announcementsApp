/*jslint sloppy:true */
/*global Backbone, console */

var AppRouter = Backbone.Router.extend({
    initialize: function (options) {
        this.main = options.main;
    },
    routes: {
        '': 'index'
    },
    index: function () {
        console.log("test");
    }
});