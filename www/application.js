var application = angular.module('application',  [
  'ngRoute',
  'mainController',
  'mainFactory',
  'leaflet-directive'
]);

application.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider.
    when('/', {
      templateUrl: './views/lending.html',
      controller: 'mainCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
});