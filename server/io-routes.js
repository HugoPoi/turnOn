/**
 * Main application routes
 */

'use strict';

import path from 'path';

export default function(io) {
    io.on('connection', function(socket){
      console.log('a user connected');
      socket.on('disconnect', function(){
        console.log('user disconnected');
      });
    });
}
