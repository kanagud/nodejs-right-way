var fs = require('fs');
var net = require('net');

var filename = process.argv[2];

if (!filename) throw Error('Error: No file name specified');

var tcpServer = net.createServer(function onConnectionSuccessful(
  tcpConnection
) {
  console.log(`Now watching ${filename} for changes`);
  tcpConnection.write('Connected to localhost:60300 \n');
  tcpConnection.write(`Now watching ${filename} for changes. \n`);

  const watcher = fs.watch(filename, function onFileChange() {
    tcpConnection.write(`File changed: ${Date.now()}\n`);
  });

  tcpConnection.on('close', function onTcpConnectionClose() {
    console.log('Connecteion closed');
    watcher.close();
  });
});

tcpServer.listen(60300, function onListening() {
  console.log('Waiting for subscribers');
});
