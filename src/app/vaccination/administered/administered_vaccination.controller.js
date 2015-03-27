'use strict';


// Manages a vaccination instance on each vaccination
// directive.
angular.module('vaccinations')
.controller('AdminVaccinationController', ['$scope', 'vaccinationsManager', function($scope, vaccinationsManager){
    // Form data inits.
    $scope.enteredAdminFormData = $scope.getVaccination();
    $scope.state = {};

    // Form states and methods.
    $scope.state.editFormOpen = false;

    $scope.toggleReactionForm = function(){
        $scope.state.adverseFormOpen = !$scope.state.adverseFormOpen;
    };

    $scope.toggleEditForm = function(){
        console.log('hello');
        $scope.state.editFormOpen = !$scope.state.editFormOpen;
    };

    // Available for all administered vaccinations.
    // Deletes a vaccination of type unscheduled, vaccinations of type
    // scheduled become unadministered instead of being removed.
    $scope.deleteVaccination = function(id) {
        vaccinationsManager.removeVaccination(id);
    };

}]);