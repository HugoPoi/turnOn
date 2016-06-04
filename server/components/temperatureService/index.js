'use strict';

import serialPort from 'serialport';

class TemperatureService{

  constructor(){
    this.sensors = {
      'LM35': 2,
      'DS18B20': 1
    };
  }

  init(callback){
    var vm = this;
    if(vm.portInstance){
      return callback(null, vm.portInstance);
    }
    serialPort.list(function (err, ports) {
      ports.forEach(function(port) {
        if(/arduino/.test(port.manufacturer)){
          if(!vm.portInstance){
            vm.portInstance = new serialPort.SerialPort(port.comName, {
              parser: serialPort.parsers.readline('\r\n')
            });
          }
          return callback(null, vm.portInstance);
        }
      });
    });
  }

  getTemperature(sensor, cb){
    var vm = this;
    this.init(function(){
      vm.portInstance.once('data', function(data){
        console.log('Received :#' + data + '#');
        var extractTemp = /^S([0-9]+\.[0-9]+)E$/.exec(data);
        if(extractTemp){
          cb(null, parseFloat(extractTemp[1]));
        }else{
          cb(new Error('Corrupted data received.'));
        }
      });
      vm.portInstance.write('S1' + vm.sensors[sensor] + 'E');

    });
  }
}

module.exports = new TemperatureService();
