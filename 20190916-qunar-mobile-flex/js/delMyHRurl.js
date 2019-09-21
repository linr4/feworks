let fs = require('fs');
let fileUrl = 'c:\\Users\\linr4\\Desktop\\My HR.url';
let timerId = null;

timerId = setInterval(() => {
    if (fs.existsSync(fileUrl)) {
        fs.unlinkSync(fileUrl);
        console.log('deleted ' + fileUrl);
    }
}, 5000);