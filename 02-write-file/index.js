const fs = require("fs");
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });
const src = path.resolve('02-write-file', 'text.txt')
const process = require('process');

process.on('exit', () => {
    console.log(`\n Good luck!`);
    rl.close();
});

rl.question('What\'s your name? ', (answer) => {
    if (answer == 'exit') {
        rl.close();
    } else {
        fs.writeFile(src, `${answer}`, function (error) {
            if (error) throw error;
            rl.close();
        });
    }
});
