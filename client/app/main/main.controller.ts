'use strict';

(function() {

class MainController {

  temperatures = { test: [] };
  options;
  constructor(Measure) {
    var vm = this;
    Measure.find().$promise.then(function(temps) {
      temps.forEach(function(p) {
         p.when = new Date(p.when);
      });
      vm.temperatures.test = temps;
    });
    vm.options = {
      margin: {top: 20},
      series: [
        {
          axis: 'y',
          dataset: 'test',
          key: 'value',
          label: 'A line series',
          color: 'hsla(88, 48%, 48%, 1)',
          type: ['line'],
          id: 'mySeries0'
        }
      ],
      axes: {x: {key: 'when', type: 'date'}}
    };
  }

}

angular.module('turnOnApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
