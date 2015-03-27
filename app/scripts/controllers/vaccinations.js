'use strict';

/**
 * @ngdoc function
 * @name vaccinationsApp.controller:VaccinationsController
 * @description
 * # VaccinationsController
 * Controller of the vaccinationsApp
 */
angular.module('vaccinationsApp')
.controller('MainController', ['$scope', '$http', 'vaccinationsManager', 'vaccinesManager',
    function($scope, $http, vaccinationsManager, vaccinesManager){


    $scope.search = {};
    $scope.search.vaccinations = '';
    $scope.search.vaccines = '';

    // Get list of patient vaccinations.
    vaccinationsManager.getVaccinations().success(function(data) {
        $scope.vaccinations = data.vaccinations;
    });

    // Get list of vaccines.
    vaccinesManager.getVaccines().success( function(data) {
        $scope.vaccines = data.vaccines;
    });

}]);

// Adds a vaccine from the new vaccination input box to the
// patients vaccination list.
angular.module('vaccinationsApp').
controller('AddVaccinationController', ['$scope', '$http', 'vaccinationsManager',
    function ($scope, $http, vaccinationsManager) {

    $scope.stageNewVaccination = function (vaccine) {
        vaccine._staged = 'true';
        $scope.stagedVaccination = vaccine;
    };

    $scope.unstageNewVaccination = function () {
        delete $scope.stagedVaccination;
    };


}]);

angular.module('vaccinationsApp')
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