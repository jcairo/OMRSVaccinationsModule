'use strict';

// Manages a vaccination instance on each vaccination
// directive.
angular.module('vaccinations')
.controller('AdminVaccinationController', ['$scope', 'vaccinationsManager', function($scope, vaccinationsManager){
    // Form data inits.
    $scope.enteredEditFormData = {};
    $scope.enteredAdverseFormData = {};

    // Form states and methods.
    $scope.state = {};
    $scope.state.editFormOpen = false;
    $scope.state.adverseFormOpen = false;

    $scope.toggleReactionForm = function(){
        $scope.state.editFormOpen = false;
        $scope.state.adverseFormOpen = !$scope.state.adverseFormOpen;
    };

    $scope.toggleEditForm = function(){
        $scope.state.adverseFormOpen = false;
        $scope.state.editFormOpen = !$scope.state.editFormOpen;
    };

    $scope.resetFormDataToDefaults = function () {
        var vaccination = angular.copy($scope.getVaccination());
        vaccination = angular.copy($scope.getVaccination());
        vaccination.administration_date = new Date(vaccination.administration_date);
        vaccination.manufacture_date = new Date(vaccination.manufacture_date);
        vaccination.expiry_date = new Date(vaccination.expiry_date);
        $scope.enteredEditFormData = vaccination;

        if (vaccination.adverse_reaction) {
            $scope.enteredAdverseFormData = vaccination.reaction_details;
            $scope.enteredAdverseFormData.date = new Date(vaccination.reaction_details.date);
        } else {
            $scope.enteredAdverseFormData.date = new Date();
        }
    };

    $scope.addReaction = function (reaction, enteredAdminFormData) {
        vaccinationsManager.submitReaction(reaction, enteredAdminFormData);
    };

    $scope.removeReaction = function (reaction) {
        vaccinationsManager.removeReaction(reaction);
    };

    // Available for all administered vaccinations.
    // Deletes a vaccination of type unscheduled, vaccinations of type
    // scheduled become unadministered instead of being removed.
    $scope.deleteVaccination = function(vaccination) {
        vaccinationsManager.deleteVaccination(vaccination);
    };

    $scope.updateVaccination = function (vaccination) {
        vaccinationsManager.submitVaccination(vaccination);
    };

    $scope.unadministerVaccination = function () {
        // Remove all information pertaining to administration.
        var vaccination = angular.copy($scope.getVaccination());
        vaccination.administered = false;
        delete vaccination.provider_id;
        delete vaccination.scheduler_id;
        delete vaccination.adverse_reaction;
        delete vaccination.reaction_details;
        delete vaccination.administration_date;
        delete vaccination.lot_number;
        delete vaccination.manufacture_date;
        delete vaccination.expiry_date;
        delete vaccination.manufacturer;
        vaccinationsManager.submitVaccination(vaccination);
    };

    $scope.resetFormDataToDefaults();

}]);
