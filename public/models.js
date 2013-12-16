/*jslint sloppy: true, browser: true */
/*globals Backbone */
var Announcement = Backbone.Model.extend({});
var Announcements = Backbone.Collection.extend({
    model: Announcement,
    url: '/announcements',
    initialize: function (models, options) {
        this.wait = (options && options.wait) || 10000;
    },
    refresh: function () {
        setTimeout(this.refresh.bind(this), this.wait);
        return this.fetch();
    }
});