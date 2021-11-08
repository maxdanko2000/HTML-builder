const path = require('path');
const src = './03-files-in-folder/secret-folder';
const fs = require("fs");

fs.readdir(src, [withFileTypes = true], function (err, items) {
    for (let i = 0; i < items.length; i++) {
        let file = src + '/' + items[i];
        fs.stat(file, function (err, stats) {
            if (stats.isFile() == true) {
                console.log(items[i].split('.').slice(0, -1).join('.') + ' - ' + path.extname(file) + ' - ' + stats["size"] + 'kb');
            }
        });
    }
});