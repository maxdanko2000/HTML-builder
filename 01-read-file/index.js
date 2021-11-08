
const path = require('path');
const src = path.resolve('01-read-file', 'text.txt')
const fs = require('fs')
const stream = new fs.ReadStream(src, { encoding: 'utf-8' });

stream.on('readable', function () {
    const data = stream.read();
    if (data != null) console.log(data);
});

stream.on('end', function () {
    console.log("");
});

stream.on('error', function (err) {
    if (err.code == 'ENOENT') {
        console.log("Файл не найден");
    } else {
        console.error(err);
    }
});