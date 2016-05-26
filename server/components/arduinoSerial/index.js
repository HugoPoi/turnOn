'use strict';

import serialPort from 'serialport';

module.exports = function(callback){
  serialPort.list(function (err, ports) {
    ports.forEach(function(port) {
      if(/arduino/.test(port.manufacturer)){
        return callback(null, new serialPort.SerialPort(port.comName, {
          parser: serialPort.parsers.readline('\n')
        }));
      }
    });
  });
}
