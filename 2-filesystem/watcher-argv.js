'use strict';

var fs = require('fs');

var fileName = process.argv[2];

if (!fileName) {
  throw Error('A file to watch must be specified');
}
fs.watch(fileName, () => {
  console.log('File has changed ');
});
console.log(`Watching ${fileName} changes...`);
