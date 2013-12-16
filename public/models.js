/*jslint sloppy: true, browser: true */
/*globals Backbone */
var Event = Backbone.Model.extend({
    defaults: {
        title: "",
        details: "",
        date: ""
    }
});
var Events = Backbone.Collection.extend({
    model: Event,
    url: '/events',
    comparator: 'date',
    initialize: function (models, options) {
        this.wait = (options && options.wait) || 10000;
        this.on("change", this.sort, this);
        this.on("add", this.sort, this);
    },
    refresh: function () {
        setTimeout(this.refresh.bind(this), this.wait);
        return this.fetch();
    }
});