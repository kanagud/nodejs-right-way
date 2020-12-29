'use strict';

var zmq = require('zeromq/v5-compat');

var subscriber = zmq.socket('sub');

subscriber.subscribe('');

subscriber.on('message', (data) => {
  var message = JSON.parse(data);
  const date = new Date(message.timestamp);
  console.log(`File ${message.filename} changed at ${date}`);
});

subscriber.connect('tcp://localhost:60400');
