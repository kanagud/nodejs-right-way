'use strict';

var fs = require('fs');
var zmq = require('zeromq/v5-compat');

var filename = process.argv[2];

var publisher = zmq.socket('pub');

fs.watch(filename, () => {
  publisher.send(
    JSON.stringify({
      type: 'changed',
      filename: filename,
      timestamp: Date.now(),
    })
  );
});

publisher.bind('tcp://*:60400', (err) => {
  if (err) throw err;

  console.log('Listening for zmq subscribers');
});
