'use strict';

/**
 * @ngdoc function
 * @name vaccinationsApp.controller:VaccinationsController
 * @description
 * # VaccinationsController
 * Controller of the vaccinationsApp
 */
angular.module('vaccinationsApp')
  .controller('VaccinationsController', ['$scope', '$http', 'vaccinations', function($scope, $http, vaccinations){
    $scope.hello = {};
    $scope.hello.name = 'JIM';
    $scope.vaccinations = vaccinations.getVaccinations();

}]);
