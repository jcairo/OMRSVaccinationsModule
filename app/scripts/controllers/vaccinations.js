'use strict';

/**
 * @ngdoc function
 * @name vaccinationsApp.controller:VaccinationsController
 * @description
 * # VaccinationsController
 * Controller of the vaccinationsApp
 */
angular.module('vaccinationsApp')
  .controller('VaccinationsController', ['$scope', '$http', function($scope, $http){
    $scope.hello = {};
    $scope.hello.name = 'JIM';

    $http.get('../mock_data/vaccinations.json')
        .success(function(result){
            console.log(result);
        })
        .error(function(data, status){
            console.log(data);
            console.log(status);
        });
}]);
