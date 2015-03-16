'use strict';

/**
 * @ngdoc overview
 * @name vaccinationsApp
 * @description
 * # vaccinationsApp
 *
 * Main module of the application.
 */
 angular
 .module('vaccinationsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
]);

// Constants for this instance of the app
angular.module('vaccinationsApp')
.value('appConstants', {
    // TODO: Retrive this from window.location;
    providerId: 1,
    // TODO: Retrive this from window.location;
    patientId: 1
});

// The template that is loaded for each vaccination is based on whether
// it has been administered or not. Angular does not have a nice way of
// doing this. I have used ng-include and a function which accesses the
// scope to determine whether an administered or unadministered template
// should be used. To clean up after myself I use this directive to remove
// the placeholder include-replace directive.
angular.module('vaccinationsApp')
.directive('replace', function() {
    return {
        require: 'ngInclude',
        restrict: 'E',
        link: function(scope, el){
            el.replaceWith(el.children());
        }
    };
});

angular.module('vaccinationsApp')
.directive('vaccination', function() {
    return {
        restrict: 'E',
        // The link function provides access to the scope of the vaccinations
        // element. Use the vaccinations.administered property to decide on
        // which template to include administered/unadministered.
        link: function(scope){
            scope.getContentUrl = function(){
                if (scope.vaccination.administered){
                    return '/scripts/directives/vaccination_administered.html';
                }
                if (!scope.vaccination.administered){
                    return '/scripts/directives/vaccination_unadministered.html';
                }
            };
        },
        template: '<include-replace ng-include="getContentUrl()"></include-replace>',
        controller: 'VaccinationController',
        scope: {
            vaccination: '='
        }
    };
 });

angular.module('vaccinationsApp')
.service('helperFunctions', function(){
    return {
        // Find the index of an object with a given id.
        findIndexById: function(id, array){
            for (var i = 0; i < array.length; i++){
                console.log(array[i]._id);
                console.log(id);
                if (array[i]._id === id){
                    return i;
                }
            }
            return undefined;
        }
    };
});

// Manages the removal and entry of vaccinations objects.
angular.module('vaccinationsApp')
.service('vaccinationsManager', ['$http', '$filter','appConstants', 'helperFunctions',
    function($http, $filter, appConstants, helperFunctions){
    var self = this;

    // The main controller gets the vaccinations data from the server
    // and sets it in the manager.
    return {
        addVaccination: function(vaccination) {
            if (helperFunctions.findIndexById(vaccination._id, self.vaccinations) === undefined){
                self.vaccinations.push(vaccination);
            } else {
                console.log("Could not add vaccination to array, a vaccination with the _id attribute already exists.");
            }
        },

        setVaccinations: function(vaccinations){
            self.vaccinations = vaccinations;
        },

        getVaccinations: function(){
            return self.vaccinations;
        },

        getVaccinationById: function(id){
            var vaccination = $filter('filter')(self.vaccinations, function(vaccination, index){
                return vaccination._id === id;
            });
            if (vaccination[0]) {
                return vaccination[0];
            } else {
                return undefined;
            }
        },

        removeVaccination: function(id){
            var index = helperFunctions.findIndexById(id, self.vaccinations);
            if (index !== undefined){
                self.vaccinations.splice(index, 1);
            } else {
                console.log("The index of the vaccination to be removed could not be found.");
            }
        }
    };
 }]);