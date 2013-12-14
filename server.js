/*jslint node: true, es5: true, nomen: true, sloppy: true */
var express = require('express');
var path    = require('path');
var Bourne  = require("bourne");

var app = express();
var db  = new Bourne("db/announcements.json");

app.configure(function () {
    "use strict";
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/*', function (req, res) {
    res.render("index.ejs");
});

app.listen(3000);
console.log('Listening on port 3000');
