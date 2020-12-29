'use strict';
const fs = require('fs');
const zmq = require('zeromq/v5-compat');

//socket to reply to client requests
const responder = zmq.socket('rep');

//Handle incoming requests
responder.on('message', (data) => {
  const request = JSON.parse(data);

  console.log(`Received request to get ${request.path}`);

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

//Listen on tcp port 60401
responder.bind('tcp://127.0.0.1:60401', (err) => {
  console.log('Listening for zmq requesters...');
});

//Close the responder when node process ends
process.on('SIGINT', () => {
  console.log('Process is shutting down');
  responder.close();
});
