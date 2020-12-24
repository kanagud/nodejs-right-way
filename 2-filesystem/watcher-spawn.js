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

  //linking the stdout stream of the child process to the process.stdout stream
  ls.stdout.pipe(process.stdout);
});
console.log(`Watching ${fileName} changes...`);
