const cluster = require('cluster');
const os = require('os');
const pid = process.pid;

if (cluster.isMaster) {
    const cpusCount = os.cpus().length;

    console.log(`
        Master started on machine with ${cpusCount} CPUs
        Current PID is ${pid}
    `);

    for (let i = 0; i < cpusCount - 1; i++) {
        const worker = cluster.fork();

        worker.on('exit', () => {
            console.log(`Worker #${worker.process.pid} died`);
            cluster.fork();
        });
        worker.send(`Hello you is #${i + 1} worker`);
        worker.on('message', (msg) => {
            console.log(`From worker#${worker.process.pid}: ${msg.text}`)
        });
    }
} else {
    require('./index.js');
    process.on('message', (msg) => {
        console.log(`Message from Master: ${msg}`);
    });
    process.send({text: `Worker Started ${pid}`});
}