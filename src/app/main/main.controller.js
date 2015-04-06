'use strict';

/**
 * @ngdoc function
 * @name vaccinations.controller:VaccinationsController
 * @description
 * # VaccinationsController
 * Controller of the vaccinations
 */
angular.module('vaccinations')
.controller('MainController', ['$scope', '$http', 'vaccinationsManager', 'vaccinesManager',
    function($scope, $http, vaccinationsManager, vaccinesManager){

    $scope.search = {};
    $scope.search.vaccinations = '';
    $scope.search.vaccines = '';

    // Get list of patient vaccinations.
    vaccinationsManager.getVaccinations().success(function(data) {
        $scope.vaccinations = data.vaccinations;
    });
    // Get list of staged vaccinations.
    $scope.stagedVaccinations = vaccinationsManager.getStagedVaccinations();

    // Get list of vaccines.
    vaccinesManager.getVaccines().success( function(data) {
        $scope.vaccines = data.nonRoutineVaccines;
    });

    $scope.stageNewVaccination = function (vaccine) {
        var stagedVaccination = angular.copy(vaccine);
        stagedVaccination._staged = true;
        vaccinationsManager.addStagedVaccination(stagedVaccination);
        $scope.newVaccine = '';
    };
}]);