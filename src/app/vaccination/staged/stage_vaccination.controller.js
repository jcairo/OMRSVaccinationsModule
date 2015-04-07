'use strict';

angular.module('vaccinations')
.controller('StagedVaccinationController', ['$scope', '$http', '$interval', '$alert', 'vaccinationsManager',
    function ($scope, $http, $interval, $alert, vaccinationsManager) {
    //$scope.enteredFormData = getVaccination();
    $scope.state = {};
    $scope.state.administerFormOpen = true;
    // $scope.alert = {
    //     title: 'New Vaccination',
    //     content: 'Fill in details and click submit to save.',
    //     type: 'info',
    //     show: true,
    //     duration: 3
    // };

    var myAlert = $alert({
        title: 'New Vaccination.',
        content: 'Add details and click submit to save.',
        placement: 'top', type: 'info', show: true,
        container: '#alert-container', duration: 4});

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