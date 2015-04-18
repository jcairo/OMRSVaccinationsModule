'use strict';

angular.module('vaccinations')
.controller('StagedVaccinationController', ['$scope', '$http', '$interval', '$alert', 'vaccinationsManager',
    function ($scope, $http, $interval, $alert, vaccinationsManager) {
    //$scope.enteredFormData = getVaccination();
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
        delete enteredAdminFormData._administering;
        delete enteredAdminFormData.scheduled_date;
        vaccinationsManager.submitVaccination(enteredAdminFormData);
    };

    $scope.scheduleVaccination = function (enteredAdminFormData) {
        delete enteredAdminFormData._scheduling;
        delete enteredAdminFormData.administration_date;
        delete enteredAdminFormData.manufacture_date;
        delete enteredAdminFormData.expiry_date;
        var scheduledVacc = {};
        vaccinationsManager.submitVaccination(enteredAdminFormData);
    };

    $scope.resetFormDataToDefaults();
}]);