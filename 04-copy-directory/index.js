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

// function copyDir() {
//     fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
//         if (err) {
//             return console.error(err);
//         } else console.log('Directory created successfully!');
//     });
//     fs.readdir(srcFiles, [withFileTypes = true], function (err, items) {
//         function callback(err) {
//             if (err) console.log(err);;
//             console.log('file copy successfully!');
//         }
//         fse.copy(srcFiles, path.join(__dirname, 'files-copy'), err => {
//             if (err) return console.error(err)
//             console.log('copy is success!')
//         })
//         // for (let i = 0; i < items.length; i++) {
//         //     let file = src + '/' + items[i];


//         // }
//     });
// }

// copyDir();


