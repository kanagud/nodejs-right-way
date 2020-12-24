'use strict';

var fs = require('fs');

fs.writeFile('targetFile.txt', 'helllo world', (err) => {
  if (err) throw err;
  console.log('File saved');
});
