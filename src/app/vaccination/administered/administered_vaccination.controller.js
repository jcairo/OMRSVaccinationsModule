'use strict';

// Manages a vaccination instance on each vaccination
// directive.
angular.module('vaccinations')
.controller('AdminVaccinationController', ['$scope', 'vaccinationsManager', function($scope, vaccinationsManager){
    // Form data inits.
    $scope.enteredEditFormData = {}
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
        $scope.enteredEditFormData = angular.copy($scope.getVaccination());
        $scope.enteredEditFormData.administration_date =
            new Date($scope.enteredEditFormData.administration_date);
        $scope.enteredEditFormData.manufacture_date =
            new Date($scope.enteredEditFormData.manufacture_date);
        $scope.enteredEditFormData.expiry_date =
            new Date($scope.enteredEditFormData.expiry_date);

        if ($scope.enteredEditFormData.adverse_reaction) {
            $scope.enteredAdverseFormData = $scope.enteredEditFormData.reaction_details;
            $scope.enteredAdverseFormData.date =
                new Date($scope.enteredEditFormData.reaction_details.date);
        } else {
            $scope.enteredAdverseFormData.date = new Date();
        }
    };

    $scope.addReaction = function (reaction, enteredAdminFormData) {
        reaction._vaccination_id = enteredAdminFormData._id;
        vaccinationsManager.submitReaction(reaction, enteredAdminFormData);
    };

    $scope.removeReaction = function (reaction) {
        vaccinationsManager.removeReaction(reaction);
    };

    // Available for all administered vaccinations.
    // Deletes a vaccination of type unscheduled, vaccinations of type
    // scheduled become unadministered instead of being removed.
    $scope.deleteVaccination = function(id) {
        vaccinationsManager.removeVaccination(id);
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
