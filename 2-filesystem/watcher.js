'use strict';

var fs = require('fs');
var count = 0;
fs.watch('targetfile.txt', () => {
  console.log('File has changed :' + count++); //callback function has a closure on the count variable
});
console.log('Watching file changs...');

