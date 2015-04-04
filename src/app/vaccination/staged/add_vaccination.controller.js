'use strict';

// Adds a vaccine from the new vaccination input box to the
// patients vaccination list.
angular.module('vaccinations').
controller('AddVaccinationController', ['$scope', '$http', 'vaccinationsManager',
    function ($scope, $http, vaccinationsManager) {

    $scope.stageNewVaccination = function (vaccine) {
        $scope.stagedVaccination = angular.copy(vaccine);
        $scope.stagedVaccination._staged = true;
    };

    $scope.unstageNewVaccination = function () {
        console.log('deleting.');
        delete $scope.stagedVaccination;
    };


}]);


