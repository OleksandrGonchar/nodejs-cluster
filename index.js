const http = require('http');
const pid = process.pid;

http.createServer((req, res) => {
        res.end('Yollo!');
    }).listen(8800, () => {
        console.log(`Server started. Pid: ${pid}`);
    });