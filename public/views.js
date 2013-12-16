/*jslint nomen: true, sloppy: true, regexp: true */
/*globals Backbone, $, _, console, Event, moment */

_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};

var Templates = {
    events: _.template($("#eventsView").html()),
    event: _.template($("#eventView").html()),
    modifyEvent: _.template($("#modifyEventView").html()),
    controls: _.template($("#controlsView").html())
};

var EventView = Backbone.View.extend({
    tagName: "tr",
    template: Templates.event,
    events: {
        "click .delete" : "destroy",
        "click .edit"   : "edit"
    },
    initialize: function (options) {
        this.nav = options.nav;
        this.model.on("remove", this.remove, this);
        this.model.on("change", this.render, this);
    },
    render: function () {
        var attrs = this.model.toJSON(),
            date = moment(attrs.date),
            diff = date.unix() - moment().unix();
        
        attrs.date = date.calendar();
        attrs.createdOn = moment(attrs.createdOn).fromNow();
        this.el.innerHTML = this.template(attrs);
        
        if (diff < 0) {
            this.el.className = "error";
        } else if (diff < 172800) {
            this.el.className = "warning";
        } else if (diff < 604800) {
            this.el.className = "info";
        }
        
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
    },
    edit: function (evt) {
        evt.preventDefault();
        this.nav("/edit/" + this.model.get("id"), { trigger: true });
    }
});

var EventsView = Backbone.View.extend({
    tagName: "table",
    className: "table",
    template: Templates.events,
    events: {
        'click th': 'sort'
    },
    initialize: function (options) {
        this.nav = options.nav;
        this.collection.on("add", this.addRow, this);
        this.collection.on("sort", this.renderRows, this);
        this.collection.refresh();
    },
    render: function () {
        this.el.innerHTML = this.template();
        this.renderRows();
        return this;
    },
    addRow: function (event) {
        this.$("tbody").append(new EventView({
            model: event,
            nav: this.nav
        }).render().el);
    },
    renderRows: function () {
        this.$("tbody").empty();
        this.collection.forEach(this.addRow, this);
    },
    sort: function (evt) {
        var target = evt.currentTarget,
            c = this.collection;
        
        c.comparator = target.getAttribute("data-field");
        
        if (target.getAttribute("data-direction") === "desc") {
            c.sort();
            target.setAttribute("data-direction", "asc");
        } else {
            c.sort({ silent: true });
            c.models = c.models.reverse();
            c.trigger('sort', c, {});
            target.setAttribute("data-direction", "desc");
        }
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

var ModifyEventView = Backbone.View.extend({
    className: "modal hide fade",
    template: Templates.modifyEvent,
    events: {
        "click .close": "close",
        "click .modify": "modify"
    },
    initialize: function (options) {
        var thiz = this;
        this.nav = options.nav;
        this.$el.on("hidden", function () {
            thiz.remove();
            thiz.nav("/");
        });
    },
    close: function (evt) {
        evt.preventDefault();
        this.$el.modal("hide");
    },
    render: function (model) {
        var data = this.model.toJSON();
        data.heading = this.heading;
        data.btnText = this.btnText;
        this.el.innerHTML = this.template(data);
        this.$el.modal("show");
        return this;
    },
    modify: function (evt) {
        evt.preventDefault();
        var a = {
            title: this.$("#title").val(),
            details: this.$("#details").val(),
            date: this.$("#date").val()
        };
        this.$el.modal("hide");
        this.save(a);
        return false;
    }
});

var CreateEventView = ModifyEventView.extend({
    heading: "Create New Event",
    btnText: "Create",
    initialize: function (options) {
        ModifyEventView.prototype.initialize.call(this, options);
        this.model = new Event();
    },
    save: function (e) {
        this.collection.create(e, { wait: true });
    }
});

var EditEventView = ModifyEventView.extend({
    heading: "Edit Event",
    btnText: "Update",
    save: function (e) {
        this.model.save(e);
    }
});