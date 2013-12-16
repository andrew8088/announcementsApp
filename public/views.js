/*jslint nomen: true, sloppy: true */
/*globals Backbone, $, _, console */

var Templates = {
    announcements: _.template($("#announcementsView").html()),
    announcement: _.template($("#announcementView").html()),
    createAnnouncement: _.template($("#createAnnouncementView").html())
};

var AnnouncementView = Backbone.View.extend({
    tagName: "tr",
    template: Templates.announcement,
    render: function () {
        this.el.innerHTML = this.template({
            model: this.model.toJSON()
        });
    }
});

var AnnouncementsView = Backbone.View.extend({
    tagName: "table",
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