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
    'ngTouch',
    'mgcrea.ngStrap'
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
.directive('vaccination', ['$popover', function($popover) {
    return {
        restrict: 'E',
        // compile: function(scope, element, attrs){
        //     console.log(scope);
        // },
        // The link function provides access to the scope of the vaccination
        // element. Use the vaccinations.administered property to decide on
        // which template to include administered/unadministered.
        // The controller is assigned in the html templates.
        link: function(scope, element, attrs){
            scope.vaccination = scope.getVaccination();
            // Add popover for staged vaccinations.
            if (scope.vaccination._staged) {
                scope._popover = $popover(element, {
                    title: 'My TI',
                    content: 'hel',
                    placement: 'top'
                });
                scope._popover.$promise.then(scope._popover.show);
            }
            // scope.defaultData = scope.vaccination();
            // scope.vaccinationDefaults = scope.vaccination();

            scope.getContentUrl = function(){
                if (scope.vaccination._staged){
                    return '/scripts/directives/vaccination_staged_template.html';
                }
                else if (scope.vaccination.administered){
                    return '/scripts/directives/vaccination_administered.html';
                }
                else if (!scope.vaccination.administered){
                    return '/scripts/directives/vaccination_unadministered.html';
                }
            };


        },
        template: '<include-replace ng-include="getContentUrl()"></include-replace>',
        scope: {
            getVaccination: '&',
        }
    };
 }]);

angular.module('vaccinationsApp')
.service('helperFunctions', function(){
    return {
        // Find the index of an object with a given id.
        findObjectIndexByAttribute: function(attribute, attributeValue, array){
            for (var i = 0; i < array.length; i++){
                if (array[i][attribute] === attributeValue){
                    return i;
                }
            }
            return undefined;
        }
    };
});

angular.module('vaccinationsApp')
.service('vaccinesManager', ['$http', function($http) {
    var self = this;
    var promise = $http.get('mock_data/vaccines.json').success( function(data) {
        self.vaccines = data.vaccines;
    });

    var exports = {
        getVaccines: function() {
            return promise;
        }
    };

    return exports;

}]);


// Manages the retrival of vaccinations from the server and the
// removal and entry of vaccinations for a patient.
angular.module('vaccinationsApp')
.service('vaccinationsManager', ['$http', '$filter','appConstants', 'helperFunctions',
    function($http, $filter, appConstants, helperFunctions){
    var self = this;


    var setVaccinations = function (vaccinations) {
        if (self.vaccinations){
            throw new Error('Vaccinations have already been set.');
        } else {
            self.vaccinations = vaccinations;
        }
    };

    var promise = $http.get('mock_data/vaccinations.json')
        // var vaccsPromise = $http.get('/vaccinations/patients/' + appConstants.patientId)
        .success(function(data, status, headers, config){
            setVaccinations(data.vaccinations);
        })
        .error(function(data, status, headers, config){
            alert('Error when retrieving patient vaccinations from server.');
        });
    // The main controller gets the vaccinations data from the server
    // and sets it in the manager.
    var exports = {

        addVaccination: function(vaccination) {
            var index = helperFunctions.findObjectIndexByAttribute('_id', vaccination._id, self.vaccinations);
            if (index === undefined){
                self.vaccinations.push(vaccination);
            } else {
                console.log("Could not add vaccination to array, a vaccination with the _id attribute already exists.");
            }
        },

        getVaccinations: function(){
            return promise;
        },

        getVaccinationById: function(id){
            var vaccination = $filter('filter')(self.vaccinations, function(vaccination, index){
                return vaccination._id === id;
            });
            return vaccination[0];
        },

        removeVaccination: function(id){
            var index = helperFunctions.findObjectIndexByAttribute('_id', id, self.vaccinations);
            if (index !== undefined){
                self.vaccinations.splice(index, 1);
            } else {
                console.log("The index of the vaccination to be removed could not be found.");
            }
        }
    };

    return exports;
 }]);
