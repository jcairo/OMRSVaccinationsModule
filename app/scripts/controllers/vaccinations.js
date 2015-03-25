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
    // $http.get('mock_data/vaccinations.json')
    // // var vaccsPromise = $http.get('/vaccinations/patients/' + appConstants.patientId)
    //     .success(function(data, status, headers, config){
    //         $scope.vaccinations = data.vaccinations;
    //         vaccinationsManager.setVaccinations($scope.vaccinations);
    //     })
    //     .error(function(data, status, headers, config){
    //         alert('Error when retrieving patient vaccinations.');
    //     });
    vaccinationsManager.getVaccinations().success(function(data) {
        $scope.vaccinations = data.vaccinations;
    });
    $scope.search = {};
    $scope.search.name = '';

    $scope.orderByTemplate = function(vaccination) {
        return vaccination.hasOwnProperty('_template_id');
    };
}]);

// Manages a vaccination instance on each vaccination
// directive.
angular.module('vaccinationsApp')
.controller('AdminVaccinationController', ['$scope', 'vaccinationsManager', function($scope, vaccinationsManager){
    // Form data inits.
    $scope.enteredAdminFormData = $scope.getVaccination();
    $scope.state = {};

    // Form states and methods.
    $scope.state.editFormOpen = false;

    $scope.toggleReactionForm = function(){
        $scope.state.adverseFormOpen = !$scope.state.adverseFormOpen;
    };

    $scope.toggleEditForm = function(){
        console.log('hello');
        $scope.state.editFormOpen = !$scope.state.editFormOpen;
    };

    // Available for all administered vaccinations.
    // Deletes a vaccination of type unscheduled, vaccinations of type
    // scheduled become unadministered instead of being removed.
    $scope.deleteVaccination = function(id) {
        vaccinationsManager.removeVaccination(id);
    };

}]);


// Manages a vaccination instance on each vaccination
// directive.
angular.module('vaccinationsApp')
.controller('UnAdminVaccinationController', ['$scope', 'vaccinationsManager', function($scope, vaccinationsManager){
    // Form data inits.
    $scope.enteredAdminFormData = angular.copy($scope.getVaccination());

    // Form states and methods.
    $scope.state = {};
    $scope.state.administerFormOpen = false;

    $scope.resetFormDataToDefaults = function(){
        $scope.enteredAdminFormData = angular.copy($scope.getVaccination());
    };

    $scope.toggleAdministerForm = function(){
        $scope.state.administerFormOpen = !$scope.state.administerFormOpen;
    };

    // Called when vaccination data from form has been validated
    // and ready to create a new vaccination event.
    $scope.addVaccination = function(vaccinationData) {
        vaccinationsManager.addVaccination(vaccinationData);
    };

    // Only available if the vaccination is of type unscheduled.
    $scope.deleteVaccination = function(id) {
        vaccinationsManager.removeVaccination(id);
    };

}]);