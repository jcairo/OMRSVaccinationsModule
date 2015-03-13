'use strict';

/**
 * @ngdoc function
 * @name vaccinationsApp.controller:VaccinationsController
 * @description
 * # VaccinationsController
 * Controller of the vaccinationsApp
 */
angular.module('vaccinationsApp')
.controller('MainController', ['$scope', 'vaccinations', function($scope, vaccinations){
    $scope.search = {};
    $scope.search.name = '';
    $scope.vaccinations = {};
    vaccinations.query(function(data){
        $scope.vaccinations = data.vaccinations;
    });
}]);



angular.module('vaccinationsApp')
.controller('VaccinationController', ['$scope', function($scope){
    $scope.state = {};
    $scope.state.entryOpen = false;
    $scope.showForm = function(){
        $scope.state.entryOpen = !$scope.state.entryOpen;
    };
}]);