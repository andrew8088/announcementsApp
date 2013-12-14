/*jslint nomen: true, sloppy: true */
/*globals Backbone, $, _ */

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
    template: Templates.createAnnouncement,
    initialize: function (options) {
        this.announcements = options.announcements;
    },
    render: function () {
        this.el.innerHTML = this.template();
        return this;
    }
});