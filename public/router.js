/*jslint sloppy:true */
/*global Backbone, console, AnnouncementsView */

var AppRouter = Backbone.Router.extend({
    initialize: function (options) {
        this.main = options.main;
        this.announcements = options.announcements;
    },
    routes: {
        '': 'index'
    },
    index: function () {
        var av = new AnnouncementsView({
            collection: this.announcements
        });
        this.main.html(av.render().el);
    }
});