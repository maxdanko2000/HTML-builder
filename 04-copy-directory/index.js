const fs = require('fs').promises;
const path = require('path');
const f = require('fs');

let srcFiles = path.resolve(__dirname, 'files');
let srcCopyFiles = path.resolve(__dirname, 'files-copy');


async function getSrc() {

    let src = await fs.readdir(path.resolve(__dirname), {
        withFileTypes: true,
    });
    let f = 0;

    src.forEach(e => {
        if (e.name === 'files-copy') {
            f++;
        }
    });

    if (f === 1) {
        await fs.rm(path.resolve(__dirname, 'files-copy'), { recursive: true });
    }
}

async function copyDir() {

    await getSrc();
    await fs.mkdir(srcCopyFiles, { recursive: true });

    let files = await fs.readdir(srcFiles, {
        withFileTypes: true,
    });

    let checkFilesOrDir = files.filter((e) => e.isFile());

    for (let i = 0; i < checkFilesOrDir.length; i++) {

        let prevSrc = await path.resolve(srcFiles, checkFilesOrDir[i].name);
        let nextSrc = await path.resolve(srcCopyFiles, checkFilesOrDir[i].name);
        let prevRStream;

        if (checkFilesOrDir[i].name.slice(-3) === 'jpg') {
            prevRStream = await f.createReadStream(prevSrc);
        } else {
            prevRStream = await f.createReadStream(prevSrc, 'utf8');
        }

        let writeStream = await f.createWriteStream(nextSrc);

        await prevRStream.pipe(writeStream);

    }
}

copyDir();