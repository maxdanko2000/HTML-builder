const path = require('path');
const src = './03-files-in-folder/secret-folder';
const fs = require("fs");

fs.readdir(src, function (err, items) {
    if (!err) {
        for (let i = 0; i < items.length; i++) {
            fs.stat(items[i], function (err, stats) {

            });
            console.log(items[i]);
        }
    } else {
        console.log(err);
    }
});