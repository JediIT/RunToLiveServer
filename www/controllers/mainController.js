var userController = angular.module('mainController', []);

userController.controller('mainCtrl', function ($scope,$http,$rootScope,$location,$window,mains) {
	$scope.center  = {
        lat: 46.483,
        lng: 30.6079,
        zoom: 8
    };

    angular.extend($scope, {
        odessa: {
            lat: 46.483,
            lng: 30.6079,
            zoom: 8
        },
        events: {}
    });
});