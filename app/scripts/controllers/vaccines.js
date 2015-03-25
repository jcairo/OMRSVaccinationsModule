'use strict';

// Defines information for the typeahead function in the search box.
angular.module('vaccinationsApp')
.controller('VaccinesController', ['$scope', 'vaccinesManager',
    function($scope, vaccinesManager) {
    vaccinesManager.getVaccines().success( function (data) {
        $scope.vaccines = data.vaccines;
    });
}]);