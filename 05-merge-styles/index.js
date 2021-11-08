const fp = require('fs').promises;
const fs = require('fs');
const path = require('path');

let srcStyles = path.resolve(__dirname, 'styles');
let srcBundle = path.resolve(__dirname, 'project-dist', 'bundle.css');


function createBundle(array, fileWrite) {
    if (!array.length) {

        return fileWrite.end(console.log('Merge success!'));

    }

    let currFile = path.resolve(srcStyles, array.shift().name);

    let readStream = fs.createReadStream(currFile);

    readStream.pipe(fileWrite, {
        end: false
    });
    readStream.on('end', function () {
        createBundle(array, fileWrite);
    });
    readStream.on('error', function (err) {
        console.log(err);
        fileWrite.close();
    });
}

async function getBundle() {
    let writeStream = fs.createWriteStream(srcBundle);

    let file = await fp.readdir(srcStyles, { withFileTypes: true, });

    let fileCutter = file.filter((el) => el.isFile() && el.name.slice(-3) === 'css');
    createBundle(fileCutter, writeStream);
}


getBundle();


