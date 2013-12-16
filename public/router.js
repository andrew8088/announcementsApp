/*jslint sloppy:true */
/*global $, Backbone, console, AnnouncementsView, CreateAnnouncementView, ControlsView */

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
        var cv = new ControlsView({
            nav: this.navigate.bind(this)
        }),
            av = new AnnouncementsView({
                collection: this.announcements
            });
        this.main.html(cv.render().el);
        this.main.append(av.render().el);
    },
    create: function () {
        var cv = new CreateAnnouncementView({
            announcements: this.announcements,
            nav: this.navigate.bind(this)
        });
        if ($("table").length === 0) {
            this.index();
        }
        this.main.prepend(cv.render().el);
    }
});