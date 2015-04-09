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
            $scope.enteredAdverseFormData._id = $scope.enteredEditFormData.reaction_details._id;
            $scope.enteredAdverseFormData.date =
                new Date($scope.enteredEditFormData.reaction_details.date);
            $scope.enteredAdverseFormData.adverse_event =
                $scope.enteredEditFormData.reaction_details.adverse_event;
            $scope.enteredAdverseFormData.grade =
                $scope.enteredEditFormData.reaction_details.grade;
            if ($scope.enteredEditFormData.reaction_details.description) {
                $scope.enteredAdverseFormData.description =
                    $scope.enteredEditFormData.reaction_details.description;
            }
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

    $scope.unadministerVaccination = function (vaccination) {
        // Remove all information pertaining to administration.
        vaccination.provider_id = '';
        vaccination.scheduler_id = '';
        vaccination.administered = false;
        vaccination.adverse_reaction = false;
        vaccination.reaction_details = '';
        vaccination.administration_date = '';
        vaccination.lot_number = '';
        vaccination.manufacture_date = '';
        vaccination.expiry_date = '';
        vaccination.manufacturer = '';
        vaccinationsManager.submitVaccination(vaccination);
    };

    $scope.resetFormDataToDefaults();
}]);