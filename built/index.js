"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var port = 4000;
app.set('view engine', 'ejs');
app.use(express.static("./public"));
app.use(express.urlencoded({
    extended: true
}));
app.use("/", require("./shortener"));
app.get("/", function (req, res) {
    return res.redirect("/shortener/");
});
app.listen(port, function () {
    console.log("listening on port ".concat(port));
});
