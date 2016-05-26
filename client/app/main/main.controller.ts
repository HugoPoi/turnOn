'use strict';

(function() {

class MainController {

  constructor($http, arduinoService, $scope) {
    this.$http = $http;
    this.awesomeThings = [];
    var vm = this;

    arduinoService.forward('led', $scope);
    this.switchLed = function(){
      arduinoService.emit('switch');
    };

    $scope.$on('socket:led', function(event, data){
      vm.ledState = data;
    });
  }

  $onInit() {
    this.$http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
    });
  }

}

angular.module('turnOnApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
