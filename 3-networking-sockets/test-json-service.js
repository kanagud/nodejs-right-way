'use strict';
var net = require('net');

var tcpServer = net.createServer(function onConnectionSuccessful(
  tcpConnection
) {
  console.log('new subscriber connected');
  const firstChunk = '{"type":"changed","tim';
  const secondChunk = 'estamp":1608855288827}\n';

  tcpConnection.write(firstChunk);

  const timer = setTimeout(() => {
    tcpConnection.write(secondChunk);
    tcpConnection.end();
  }, 100);

  tcpConnection.on('end', function onTcpConnectionEnd() {
    console.log('Subscriber disconnected');
    clearTimeout(timer);
  });
});

tcpServer.listen(60300, function onListening() {
  console.log('Waiting for subscribers');
});
