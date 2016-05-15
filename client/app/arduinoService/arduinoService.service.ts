'use strict';

angular.module('turnOnApp')
  .factory('arduinoService', function (socketFactory) {
    return socketFactory();
  });
