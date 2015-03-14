'use strict';

/**
 * @ngdoc function
 * @name vaccinationsApp.controller:VaccinationsController
 * @description
 * # VaccinationsController
 * Controller of the vaccinationsApp
 */
angular.module('vaccinationsApp')
.controller('MainController', ['$scope', 'vaccinationsManager', function($scope, vaccinationsManager){
    $scope.search = {};
    $scope.search.name = '';
    $scope.vaccinations = {};
    vaccinationsManager.getVaccinations().then(function(response){
        $scope.vaccinations = response.vaccinations;
    });
    vaccinationsManager.getVaccinations();
    // vaccinationsResource.query(function(data){
    //     console.log(data.vaccinations);
    //     $scope.vaccinations = data.vaccinations;
    // });
}]);

// Manages a vaccination instance on each vaccination
// directive.
angular.module('vaccinationsApp')
.controller('VaccinationController', ['$scope', 'vaccinationsManager', function($scope, vaccinationsManager){
    $scope.enteredFormData = {};
    $scope.enteredFormData.date = new Date().now;
    $scope.state = {};
    $scope.state.editFormOpen = false;
    $scope.state.adverseFormOpen = false;
    $scope.state.administerFormOpen = false;
    $scope.toggleAdministerForm = function(){
        $scope.state.administerFormOpen = !$scope.state.administerFormOpen;
    };
    $scope.showEditForm = function(){
        console.log('hello');
        $scope.state.editFormOpen = !$scope.state.editFormOpen;
    };
}]);
