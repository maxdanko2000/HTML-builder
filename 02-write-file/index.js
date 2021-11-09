const fs = require('fs');
const path = require('path');
const readline = require('readline');

const srcFile = path.resolve(__dirname, 'text.txt');

fs.open(srcFile, 'w', (err) => {
    if (err) throw err;
    console.log('Enter something: ');
    input.prompt();
});



const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

input.addListener('line', (data) => {
    if (data === 'exit') {
        onExit();
    } else {
        fs.appendFile(srcFile, `\n${data}`, (err) => {
            if (err) {
                throw err;
            }
        });
        someThing();
    }
});

function someThing() {
    console.log('Something more?(Enter \'exit\' or Control-C to exit):');
    input.prompt();
}

input.addListener('SIGINT', () => {
    onExit();
});

function onExit() {
    console.log('Good Luck!');
    input.close();
}