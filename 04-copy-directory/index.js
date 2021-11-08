const src = './04-copy-directory/files-copy';
const path = require('path');
const srcFiles = './04-copy-directory/files'
const { promises: fs } = require("fs")


async function copyDir(src, dest) {
    await fs.mkdir(dest, { recursive: true });
    let entries = await fs.readdir(src, { withFileTypes: true });

    for (let entry of entries) {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        entry.isDirectory() ?
            await copyDir(srcPath, destPath) :
            await fs.copyFile(srcPath, destPath);
    }
}
copyDir(srcFiles, src);



