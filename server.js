/*jslint node: true, es5: true, nomen: true, sloppy: true */
var express = require('express');
var path    = require('path');
var Bourne  = require("bourne");

var app = express();
var db  = new Bourne("db/events.json");

app.configure(function () {
    "use strict";
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get("/events", function (req, res) {
    db.find(function (data) {
        res.json(data);
    });
});

app.post("/events", function (req, res) {
    var e = {
        title: req.body.title,
        details: req.body.details,
        date: req.body.date,
        createdOn: new Date()
    };
    
    db.insert(e, function (e) {
        res.json(e);
    });
});

app.put("/events/:id", function (req, res) {
    var e = {
        title: req.body.title,
        details: req.body.details,
        date: req.body.date
    };
    
    db.update({ id: parseInt(req.params.id, 10) }, e, function (e) {
        res.json(e);
    });
});

app.delete("/events/:id", function (req, res) {
    db.delete({ id: parseInt(req.params.id, 10) }, function () {
        res.json({});
    });
});

app.get('/*', function (req, res) {
    db.find(function (data) {
        res.render("index.ejs", { as: JSON.stringify(data) });
    });
});

app.listen(3000);
console.log('Listening on port 3000');