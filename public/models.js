/*jslint  */
/*globals Backbone */
var Announcement = Backbone.Model.extend({});
var Announcements = Backbone.Collection.extend({
    model: Announcement,
    url: '/announcements'
});