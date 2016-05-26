/**
 * Main application routes
 */

'use strict';

import arduinoSerial from './components/arduinoSerial';
import path from 'path';

export default function(io) {
  arduinoSerial(function(err, port){
    port.on('data', function(msg){
      io.emit('led', msg.trim());
    });
    io.on('connection', function(socket){
      socket.on('switch', function(msg){
        port.write('switch\n');
      });
      console.log('a user connected');
      socket.on('disconnect', function(){
        console.log('user disconnected');
      });
    });
  });
}
