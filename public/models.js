/*jslint sloppy: true, browser: true */
/*globals Backbone */
var Event = Backbone.Model.extend({});
var Events = Backbone.Collection.extend({
    model: Event,
    url: '/events',
    initialize: function (models, options) {
        this.wait = (options && options.wait) || 10000;
    },
    refresh: function () {
        setTimeout(this.refresh.bind(this), this.wait);
        return this.fetch();
    }
});