'use strict';

angular.module('turnOnApp', [
  'turnOnApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'ls.LiveSet',
  'ls.ChangeStream',
  'lbServices',
  'n3-line-chart'
])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
