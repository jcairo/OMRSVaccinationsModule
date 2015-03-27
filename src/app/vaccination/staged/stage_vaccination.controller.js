'use strict';

angular.module('vaccinations')
.controller('StagedVaccinationController', ['$scope', '$http', 'vaccinationsManager',
    function ($scope, $http, vaccinationsManager) {
    //$scope.enteredFormData = getVaccination();
    $scope.state = {};
    $scope.enteredAdminFormData = angular.copy($scope.getVaccination());
    $scope.state.administerFormOpen = true;
    $scope.popover = {
        'title': 'New Vaccination',
        'content': 'Fill in details and click submit to save.'
    };
    $scope.resetFormDataToDefaults = function () {
        $scope.enteredAdminFormData = angular.copy($scope.getVaccination());
    };
    $scope.submitVaccination = function () {
        $http.post('/vaccines/patients/1', vaccine)
        .success( function (data) {
            vaccinationsManager.addVaccination(data.vaccination);
            $scope.unstageNewVaccination();
        })
        .error( function (data) {
            alert("A problem occured adding this vaccination. It has not been saved. Please try again.")
        });
    };
}]);