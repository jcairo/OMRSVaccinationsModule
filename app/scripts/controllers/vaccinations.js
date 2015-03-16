'use strict';

/**
 * @ngdoc function
 * @name vaccinationsApp.controller:VaccinationsController
 * @description
 * # VaccinationsController
 * Controller of the vaccinationsApp
 */
angular.module('vaccinationsApp')
.controller('MainController', ['$scope', '$http', 'vaccinationsManager', function($scope, $http, vaccinationsManager){
    $http.get('mock_data/vaccinations.json')
    // var vaccsPromise = $http.get('/vaccinations/patients/' + appConstants.patientId)
        .success(function(data, status, headers, config){
            $scope.vaccinations = data.vaccinations;
            vaccinationsManager.setVaccinations($scope.vaccinations);
        })
        .error(function(data, status, headers, config){
            alert('Error when retrieving patient vaccinations.');
        });

    $scope.search = {};
    $scope.search.name = '';
}]);

// Manages a vaccination instance on each vaccination
// directive.
angular.module('vaccinationsApp')
.controller('VaccinationController', ['$scope', 'vaccinationsManager', function($scope, vaccinationsManager){
    $scope.enteredFormData = {};
    $scope.enteredFormData.date = new Date().now;
    $scope.state = {};

    // Form states and methods.
    $scope.state.editFormOpen = false;
    $scope.state.adverseFormOpen = false;
    $scope.state.administerFormOpen = false;
    $scope.toggleAdministerForm = function(){
        $scope.state.administerFormOpen = !$scope.state.administerFormOpen;
    };

    $scope.showEditForm = function(){
        console.log('hello');
        $scope.state.editFormOpen = !$scope.state.editFormOpen;
    };

    $scope.deleteVaccination = function(id) {
        vaccinationsManager.removeVaccination(id);
    };
}]);
