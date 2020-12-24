'use strict';

var fs = require('fs');

//spawn function is assigned to a variable - this is possible because fns are first class citizens in js
var spawn = require('child_process').spawn;

var fileName = process.argv[2];

if (!fileName) {
  throw Error('A file to watch must be specified');
}
fs.watch(fileName, () => {
  //we are running a new program in the child process and passing arguments to it
  var ls = spawn('ls', ['-l', '-h', fileName]);

  let output = '';

  //listening on the child processes stdout stream since stdout is deriving from event emitter
  ls.stdout.on('data', (chunk) => {
    output = output + chunk;
  });

  ls.on('close', () => {
    const parts = output.split(/\s+/);
    console.log([parts[0], parts[4], parts[8]]);
  });
});
console.log(`Watching ${fileName} changes...`);
