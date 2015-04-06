'use strict';

angular.module('vaccinations')
.controller('StagedVaccinationController', ['$scope', '$http', '$interval', 'vaccinationsManager',
    function ($scope, $http, $interval, vaccinationsManager) {
    //$scope.enteredFormData = getVaccination();
    $scope.state = {};
    $scope.state.administerFormOpen = true;
    $scope.popover = {
        title: 'New Vaccination',
        content: 'Fill in details and click submit to save.',
        trigger: 'hover',
        show: true,
        autoClose: true
    };

    $scope.removeStagedVaccination = function () {
        vaccinationsManager.removeStagedVaccination();
    };

    $scope.resetFormDataToDefaults = function () {
         var vaccination = angular.copy($scope.getVaccination());
         vaccination.administration_date = new Date();
         vaccination.manufacture_date = new Date();
         vaccination.expiry_date = new Date();
         $scope.enteredAdminFormData = vaccination;
    };

    $scope.saveVaccination = function () {
        vaccinationsManager.submitVaccination($scope.enteredAdminFormData);
    };

    $scope.resetFormDataToDefaults();
}]);