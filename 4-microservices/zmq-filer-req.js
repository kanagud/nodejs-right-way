'use strict';
const zmq = require('zeromq/v5-compat');

//create a request endpoint
const requester = zmq.socket('req');

const filename = process.argv[2];

//Handle replies from responder
requester.on('message', (data) => {
  const response = JSON.parse(data);
  console.log(`Received reponse: ${JSON.stringify(response)}`);
});

requester.connect('tcp://127.0.0.1:60401');

//Send a request for response
console.log(`Sending a request for file data: ${filename}`);
requester.send(JSON.stringify({ path: filename }));
