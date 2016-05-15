/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(io) {
  // Insert routes below
  io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });
}
