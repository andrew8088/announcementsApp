/*jslint nomen: true, sloppy: true, regexp: true */
/*globals Backbone, $, _, console */

_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};

var Templates = {
    announcements: _.template($("#announcementsView").html()),
    announcement: _.template($("#announcementView").html()),
    createAnnouncement: _.template($("#createAnnouncementView").html()),
    controls: _.template($("#controlsView").html())
};

var AnnouncementView = Backbone.View.extend({
    tagName: "tr",
    template: Templates.announcement,
    render: function () {
        this.el.innerHTML = this.template(this.model.toJSON());
        return this;
    }
});

var AnnouncementsView = Backbone.View.extend({
    tagName: "table",
    className: "table table-striped",
    template: Templates.announcements,
    render: function () {
        this.el.innerHTML = this.template();
        this.collection.forEach(this.addRow, this);
        return this;
    },
    addRow: function (annoucement) {
        this.$("tbody").append(new AnnouncementView({
            model: annoucement
        }).render().el);
    }
});

var ControlsView = Backbone.View.extend({
    tagName: "ul",
    className: "nav nav-pills",
    template: Templates.controls,
    initialize: function (options) {
        this.nav = options.nav;
    },
    events: {
        'click a[href="/create"]': 'create'
    },
    render: function () {
        this.el.innerHTML = this.template();
        return this;
    },
    create: function (evt) {
        evt.preventDefault();
        this.nav("create", { trigger: true });
    }
});

var CreateAnnouncementView = Backbone.View.extend({
    tagName: "form",
    template: Templates.createAnnouncement,
    events: {
        "click button": "create"
    },
    initialize: function (options) {
        this.announcements = options.announcements;
    },
    render: function () {
        this.el.innerHTML = this.template();
        return this;
    },
    create: function (evt) {
        evt.preventDefault();
        var a = {
            title: this.$("#title").val(),
            details: this.$("#details").val(),
            date: this.$("#date").val()
        };
        this.announcements.create(a);
        return false;
    }
});