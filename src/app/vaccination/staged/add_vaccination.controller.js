'use strict';

// Adds a vaccine from the new vaccination input box to the
// patients vaccination list.
angular.module('vaccinations').
controller('AddVaccinationController', ['$scope', '$http', 'vaccinationsManager',
    function ($scope, $http, vaccinationsManager) {

    $scope.stageNewVaccination = function (vaccine) {
        vaccine._staged = 'true';
        $scope.stagedVaccination = angular.copy(vaccine);
    };

    $scope.unstageNewVaccination = function () {
        delete $scope.stagedVaccination;
    };


}]);


