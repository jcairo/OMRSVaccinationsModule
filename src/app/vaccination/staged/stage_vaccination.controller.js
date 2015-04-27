'use strict';

angular.module('vaccinations')
.controller('StagedVaccinationController', ['$scope', '$http', 'vaccinationsManager',
    function ($scope, $http, vaccinationsManager) {
    $scope.state = {};
    $scope.state.administerFormOpen = true;

    $scope.removeStagedVaccination = function () {
        vaccinationsManager.removeStagedVaccination();
    };

    $scope.resetFormDataToDefaults = function () {
         var vaccination = angular.copy($scope.getVaccination());
         vaccination.administration_date = new Date();
         vaccination.manufacture_date = new Date();
         vaccination.expiry_date = new Date();
         vaccination.scheduled_date = new Date();
         $scope.enteredAdminFormData = vaccination;
    };

    $scope.saveVaccination = function (enteredAdminFormData) {
        // When saving an administered vaccination ensure no scheduled
        // date is saved.
        vaccinationsManager.submitVaccination(enteredAdminFormData);
    };

    $scope.scheduleVaccination = function (enteredAdminFormData) {
        vaccinationsManager.submitVaccination(enteredAdminFormData);
    };

    $scope.resetFormDataToDefaults();
}]);
