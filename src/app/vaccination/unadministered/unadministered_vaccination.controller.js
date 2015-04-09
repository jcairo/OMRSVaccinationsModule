'use strict';

// Manages a vaccination instance on each vaccination
// directive.
angular.module('vaccinations')
.controller('UnAdminVaccinationController', ['$scope', 'vaccinationsManager', function($scope, vaccinationsManager){

    // Form states and methods.
    $scope.state = {};
    $scope.state.administerFormOpen = false;


    $scope.resetFormDataToDefaults = function(){
        var vaccination = angular.copy($scope.getVaccination());
        vaccination.administration_date = new Date();
        vaccination.manufacture_date = new Date();
        vaccination.expiry_date = new Date();
        $scope.enteredAdminFormData = vaccination;
    };


    $scope.toggleAdministerForm = function(){
        $scope.state.administerFormOpen = !$scope.state.administerFormOpen;
    };

    // Called when vaccination data from form has been validated
    // and ready to create a new vaccination event.
    $scope.submitVaccination = function(vaccination) {
        var vaccinationCopy = angular.copy($scope.getVaccination());
        vaccinationsManager.submitVaccination(vaccination, vaccinationCopy);
    };

    // Only available if the vaccination is of type unscheduled.
    $scope.deleteVaccination = function(id) {
        vaccinationsManager.removeVaccination(id);
    };

    // Form data inits.
    $scope.resetFormDataToDefaults();
}]);