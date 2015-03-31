'use strict';

angular.module('vaccinations')
.controller('StagedVaccinationController', ['$scope', '$http', '$interval', 'vaccinationsManager',
    function ($scope, $http, $interval, vaccinationsManager) {
    //$scope.enteredFormData = getVaccination();
    $scope.state = {};
    $scope.enteredAdminFormData = angular.copy($scope.getVaccination());
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
        $scope.enteredAdminFormData = angular.copy($scope.getVaccination());
    };

    $scope.commitStagedVaccination = function () {
        vaccinationsManager.commitStagedVaccination($scope.enteredAdminFormData);
    };
}]);