/*jslint sloppy:true */
/*global $, Backbone, console, EventsView, CreateEventView, ControlsView */

var AppRouter = Backbone.Router.extend({
    initialize: function (options) {
        this.main = options.main;
        this.events = options.events;
    },
    routes: {
        '': 'index',
        'create': 'create'
    },
    index: function () {
        var cv = new ControlsView({
            nav: this.navigate.bind(this)
        }),
            av = new EventsView({
                collection: this.events
            });
        this.main.html(cv.render().el);
        this.main.append(av.render().el);
    },
    create: function () {
        var cv = new CreateEventView({
            evts: this.events,
            nav: this.navigate.bind(this)
        });
        if ($("table").length === 0) {
            this.index();
        }
        this.main.prepend(cv.render().el);
    }
});