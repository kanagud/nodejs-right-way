'use strict';
const fs = require('fs');
const zmq = require('zeromq/v5-compat');

const numWorkers = require('os').cpus().length;

const cluster = require('cluster');

if (cluster.isMaster) {
  //Master process creates router and dealer endpoints and binds sockets
  const router = zmq.socket('router').bind('tcp://127.0.0.1:60401');
  const dealer = zmq.socket('dealer').bind('ipc://filer-dealer.ipc');

  //Forward message between router and dealer
  router.on('message', (...frames) => {
    console.log(frames);
    dealer.send(frames);
  });

  dealer.on('message', (...frames) => {
    console.log(frames);
    router.send(frames);
  });

  //Listen for workers to comeonline
  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  //For a worker process for each cpu
  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }
} else {
  //worker process create a rep socket and connects to the dealer
  const responder = zmq.socket('rep').connect('ipc://filer-dealer.ipc');

  //Handle incoming requests
  responder.on('message', (data) => {
    //Parse incoming message
    const request = JSON.parse(data);
    console.log(`${process.pid}:Received request to get ${request.path}`);

    //Read the file and reply with content
    fs.readFile(request.path, (err, content) => {
      console.log('Sending response content');
      const responseObject = {
        data: content.toString(),
        timestamp: Date.now(),
        pid: process.pid,
      };
      responder.send(JSON.stringify(responseObject));
    });
  });
}
