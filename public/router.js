/*jslint sloppy:true */
/*global Backbone, console, AnnouncementsView, CreateAnnouncementView */

var AppRouter = Backbone.Router.extend({
    initialize: function (options) {
        this.main = options.main;
        this.announcements = options.announcements;
    },
    routes: {
        '': 'index',
        'create': 'create'
    },
    index: function () {
        var av = new AnnouncementsView({
            collection: this.announcements
        });
        this.main.html(av.render().el);
    },
    create: function () {
        var cv = new CreateAnnouncementView({
            announcements: this.announcements
        });
        this.main.html(cv.render().el);
    }
});