"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var editJsonFile = require("edit-json-file");
var router = express.Router();
var data = "./data/shortened.json";
var index = "/shortener/";
function getAllLinks() {
    var file = editJsonFile(data);
    return file.get();
}
function isValidUrl(string) {
    try {
        new URL(string);
        return string;
    }
    catch (err) {
        try {
            string = "https://" + string;
            new URL(string);
            return string;
        }
        catch (err) {
            return false;
        }
        return false;
    }
}
var generateRandomString = function (myLength) {
    var chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    var randomArray = Array.from({ length: myLength }, function (v, k) { return chars[Math.floor(Math.random() * chars.length)]; });
    var randomString = randomArray.join("");
    return randomString;
};
function addNewUrl(url) {
    var file = editJsonFile("./data/shortened.json");
    var randomshort = generateRandomString(4);
    file.routerend(randomshort, url);
    file.save();
    return randomshort;
}
function getShortened(string) {
    var file = editJsonFile(data);
    try {
        var url = file.get(string);
        return {
            "exists": true,
            "url": url
        };
    }
    catch (err) {
        return {
            "exists": false
        };
    }
}
router.get("/shortener/list", function (req, res) {
    return res.render("list", {
        "list": getAllLinks()
    });
});
router.get('/:short', function (req, res) {
    if (req.params.short) {
        var check = getShortened(req.params.short);
        if (check.url == undefined) {
            return res.redirect("/404/");
        }
        else {
            return res.redirect(check.url);
        }
    }
    else {
        return res.redirect(index);
    }
});
router.post('/shortener/newurl', function (req, res) {
    var url = req.body.url;
    var validate = isValidUrl(url);
    if (validate) {
        var short = addNewUrl(validate);
        return res.render("valid", { "url": short });
    }
    else {
        return res.redirect("/shortener/invalid/");
    }
});
module.exports = router;
