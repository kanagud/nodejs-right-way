'use strict';

var net = require('net');
var LDJClient = require('./lib/ldj-client');

const tcpClient = net.connect({ port: 60300 });

const ldjClient = LDJClient.connect(tcpClient);

ldjClient.on('message', (message) => {
  if (message.type === 'Watching') {
    console.log(`Now watching: ${message.file}`);
  } else if (message.type === 'changed') {
    console.log(`File changed: ${new Date(message.timestamp)}`);
  } else {
    console.log('Unrecognized message type');
  }
});

// tcpClient.on('data', function onData(data) {
//   var messsage = JSON.parse(data);

//   if (messsage.type === 'Watching') {
//     console.log(`Now watching: ${messsage.file}`);
//   } else if (messsage.type === 'changed') {
//     console.log(`File changed: ${new Date(messsage.timestamp)}`);
//   } else {
//     console.log('Unrecognized message type');
//   }
// });
