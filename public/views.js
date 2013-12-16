/*jslint nomen: true, sloppy: true, regexp: true */
/*globals Backbone, $, _, console */

_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};

var Templates = {
    events: _.template($("#eventsView").html()),
    event: _.template($("#eventView").html()),
    createEvent: _.template($("#createEventView").html()),
    controls: _.template($("#controlsView").html())
};

var EventView = Backbone.View.extend({
    tagName: "tr",
    template: Templates.event,
    events: {
        "click .delete" : "destroy"
    },
    initialize: function () {
        this.model.on("remove", this.remove, this);
    },
    render: function () {
        this.el.innerHTML = this.template(this.model.toJSON());
        return this;
    },
    remove: function () {
        this.$el.fadeOut(Backbone.View.prototype.remove.bind(this));
        return false;
    },
    destroy: function (evt) {
        evt.preventDefault();
        this.model.destroy();
        this.remove();
    }
});

var EventsView = Backbone.View.extend({
    tagName: "table",
    className: "table table-striped",
    template: Templates.events,
    initialize: function () {
        this.collection.on("add", this.addRow, this);
        this.collection.refresh();
    },
    render: function () {
        this.el.innerHTML = this.template();
        this.collection.forEach(this.addRow, this);
        return this;
    },
    addRow: function (event) {
        this.$("tbody").append(new EventView({
            model: event
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

var CreateEventView = Backbone.View.extend({
    className: "modal hide fade",
    template: Templates.createEvent,
    events: {
        "click .close": "close",
        "click #create": "create"
    },
    initialize: function (options) {
        var thiz = this;
        this.evts = options.evts;
        this.nav = options.nav;
        this.$el.on("hidden", function () {
            thiz.remove();
            thiz.nav("/");
        });
    },
    render: function () {
        this.el.innerHTML = this.template();
        this.$el.modal("show");
        return this;
    },
    close: function (evt) {
        evt.preventDefault();
        this.$el.modal("hide");
    },
    create: function (evt) {
        evt.preventDefault();
        var a = {
            title: this.$("#title").val(),
            details: this.$("#details").val(),
            date: this.$("#date").val()
        };
        this.evts.create(a, { wait: true });
        this.$el.modal("hide");
        return false;
    }
});