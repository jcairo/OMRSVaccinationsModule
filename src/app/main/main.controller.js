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
    $scope.state = {};
    $scope.state.loading = false;

    // Get list of patient vaccinations.
    vaccinationsManager.getVaccinations().success(function(data) {
        $scope.vaccinations = data.vaccinations;
    });
    // Get list of staged vaccinations.
    $scope.stagedVaccinations = vaccinationsManager.getStagedVaccinations();

    // Get list of vaccines.
    vaccinesManager.getVaccines().success( function(data) {
        $scope.vaccines = data.non_scheduled_vaccines;
    });

    $scope.stageVaccination = function (vaccine, scheduled) {
        var stagedVaccination = angular.copy(vaccine);
        stagedVaccination._staged = true;
        if (scheduled) {
            stagedVaccination._scheduling = true;
        } else {
            stagedVaccination._administering = true;
        }
        vaccinationsManager.addStagedVaccination(stagedVaccination);
        $scope.newVaccine = '';
    };

    $scope.formatVaccine = function (vaccine) {
        var formattedVaccineName;
        formattedVaccineName = vaccine.name + ':: ';
        if (vaccine.custom) {
            return 'Custom Vaccine::';
        }
        if (typeof vaccine.dose !== 'undefined') {
            formattedVaccineName += 'Dose: ' + vaccine.dose + ' ';
        }
        if (typeof vaccine.dosing_unit !== 'undefined') {
            formattedVaccineName += 'Unit: ' + vaccine.dosing_unit + ' ';
        }
        if (typeof vaccine.route !== 'undefined') {
            formattedVaccineName += 'Route: ' + vaccine.route + ' ';
        }
        return formattedVaccineName;

    };
}]);
