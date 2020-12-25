'use strict';

const { doesNotMatch } = require('assert');
var assert = require('assert');
var EventEmitter = require('events').EventEmitter;
var LDJClient = require('../lib/ldj-client');

describe('LDJClient', () => {
  let ldjClient = null;
  let stream = null;

  beforeEach(() => {
    stream = new EventEmitter();
    ldjClient = new LDJClient(stream);
  });

  it('should emit a message from a even single data event', (done) => {
    ldjClient.on('message', (message) => {
      assert.deepEqual(message, { foo: 'bar' });
      done();
    });

    stream.emit('data', '{"foo":"bar"}\n');
  });

  it('should emit a message from a even split data event', (done) => {
    ldjClient.on('message', (message) => {
      assert.deepEqual(message, { foo: 'bar' });
      done();
    });

    stream.emit('data', '{"foo":');
    process.nextTick(() => {
      stream.emit('data', '"bar"}\n');
    });
  });
});
