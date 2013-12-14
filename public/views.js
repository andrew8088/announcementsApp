/*jslint nomen: true, sloppy: true */
/*globals Backbone, $, _ */

var Templates = {
    announcementsView: _.template($("#AnnouncementsView").html()),
    announcementView: _.template($("#AnnouncementView").html())
};

var AnnouncementView = Backbone.View.extend({
    tagName: "tr",
    template: Templates.announcementView,
    render: function () {
        this.el.innerHTML = this.template({
            model: this.model.toJSON()
        });
    }
});

var AnnouncementsView = Backbone.View.extend({
    tagName: "table",
    template: Templates.announcementsView,
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