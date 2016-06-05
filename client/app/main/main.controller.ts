'use strict';

(function() {

class MainController {

  temperatures = { lm35: [], ds18b20: [] };
  lastMeasure = { lm35: 20.0, ds18b20: 20.0 };
  potA5;
  options = {
    margin: {top: 20},
    series: [
      {
        axis: 'y',
        dataset: 'lm35',
        key: 'value',
        label: 'Temperatures from LM35',
        color: 'hsla(88, 48%, 48%, 1)',
        interpolation: {mode: 'bundle', tension: 0.7},
        type: ['line'],
        id: 'lm35'
      },
      {
        axis: 'y',
        dataset: 'ds18b20',
        key: 'value',
        label: 'Temperatures from DS18B20',
        color: 'hsla(44, 48%, 48%, 1)',
        type: ['line'],
        id: 'ds18b20'
      }
    ],
    axes: {x: {key: 'when', type: 'date'}}
  };
  constructor(Measure, createChangeStream) {
    var vm = this;
    var changes = createChangeStream(new EventSource('/api/measures/change-stream?_format=event-source'));
    changes.on('data', function(update){
      update.data.when = new Date(update.data.when);
      if ( update.data.from === 'LM35' ) {
        vm.temperatures.lm35.push(update.data);
        vm.lastMeasure.lm35 = update.data.value;
      } else if ( update.data.from === 'DS18B20' ) {
        vm.temperatures.ds18b20.push(update.data);
        vm.lastMeasure.ds18b20 = update.data.value;
      } else if ( update.data.from === 'potA5' ) {
        vm.potA5 = ( update.data.value / 720 ) * 100;
      }
    });
    Measure.findOne({ filter: { where: { from: 'potA5' }}}).$promise.then(function(potA5) {
      vm.potA5 = (potA5.value / 720) * 100;
    });
    Measure.find({ filter: { where: { from: 'LM35' }}}).$promise.then(function(temps) {
      temps.forEach(function(p) {
         p.when = new Date(p.when);
      });
      vm.temperatures.lm35 = temps;
    });
    Measure.find({ filter: { where: { from: 'DS18B20' }}}).$promise.then(function(temps) {
      temps.forEach(function(p) {
         p.when = new Date(p.when);
      });
      vm.temperatures.ds18b20 = temps;
    });
  }

}

angular.module('turnOnApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
