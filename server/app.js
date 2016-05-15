/**
 * Main application file
 */

'use strict';

import express from 'express';
import config from './config/environment';
import http from 'http';
import socketio from 'socket.io';

// Setup server
var app = express();
var server = http.createServer(app);
var io = socketio(server);
require('./config/express').default(app);
require('./routes').default(app);
require('./io-routes').default(io);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
