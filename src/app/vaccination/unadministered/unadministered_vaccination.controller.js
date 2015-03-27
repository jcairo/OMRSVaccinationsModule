'use strict';

// Manages a vaccination instance on each vaccination
// directive.
angular.module('vaccinations')
.controller('UnAdminVaccinationController', ['$scope', 'vaccinationsManager', function($scope, vaccinationsManager){
    // Form data inits.
    $scope.enteredAdminFormData = angular.copy($scope.getVaccination());

    // Form states and methods.
    $scope.state = {};
    $scope.state.administerFormOpen = false;

    $scope.resetFormDataToDefaults = function(){
        $scope.enteredAdminFormData = angular.copy($scope.getVaccination());
    };

    $scope.toggleAdministerForm = function(){
        $scope.state.administerFormOpen = !$scope.state.administerFormOpen;
    };

    // Called when vaccination data from form has been validated
    // and ready to create a new vaccination event.
    $scope.addVaccination = function(vaccinationData) {
        vaccinationsManager.addVaccination(vaccinationData);
    };

    // Only available if the vaccination is of type unscheduled.
    $scope.deleteVaccination = function(id) {
        vaccinationsManager.removeVaccination(id);
    };

}]);