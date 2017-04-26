angular.module('mainFactory', [])
       .factory('mains', function($http){
  return {
    signIn: function (email,password,callback){
      $http({
           method: 'POST',
           data: JSON.stringify({
                email : email,
                password : password
           }),
           url: '/user/signin',
           contentType: 'application/json; charset=utf-8',
           responseType: 'json'
        }).then(function successCallback(response) {
           callback(response.data);
        }, function errorCallback(response) {
            callback(null);
      });
    }
  };
});