'use strict';

/**
 * @ngdoc function
 * @name vaccinationsApp.controller:VaccinationsController
 * @description
 * # VaccinationsController
 * Controller of the vaccinationsApp
 */
angular.module('vaccinationsApp')
.controller('MainController', ['$scope', 'vaccinationsResource', function($scope, vaccinationsResource){
    $scope.search = {};
    $scope.search.name = '';
    $scope.vaccinations = {};
    vaccinationsResource.query(function(data){
        console.log(data.vaccinations);
        $scope.vaccinations = data.vaccinations;
    });
}]);

// Manages a vaccination instance on each vaccination
// directive.
angular.module('vaccinationsApp')
.controller('VaccinationController', ['$scope', 'vaccinationsManager', function($scope, vaccinationsManager){
    var a = vaccinationsManager;
    a = 1;
    $scope.state = {};
    $scope.state.editFormOpen = false;
    $scope.state.AdverseFormOpen = false;
    $scope.showEditForm = function(){
        console.log('hello');
        $scope.state.editFormOpen = !$scope.state.editFormOpen;
    };
}]);
