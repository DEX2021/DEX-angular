const fs = require('fs');
const f = 'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js';

fs.readFile(f, 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    }

    var result = data.replace(/node: false/g, 'node: {crypto: true, stream: true}');

    fs.writeFile(f, result, 'utf8', (err) => {
        if (err) {
            console.log(err);
        }
    });
})