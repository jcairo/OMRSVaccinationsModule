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

angular.module('vaccinationsApp').directive('vaccination', function() {
    return {
        restrict: 'E',
        templateUrl: 'scripts/directives/vaccination_administered.html',
        controller: 'VaccinationController',
        scope: {
            vaccination: '='
        }
    };
 });

angular.module('vaccinationsApp').factory('vaccinations', ['$resource', function($resource){
    var config = {
         // TODO: Ensure caching is working as expected.
         // This call should only be made once.
         query: {method:'GET', isArray:false, cache:true}
    };
    // TODO: Change this address to the vaccionations of patient id.
    return $resource('mock_data/vaccinations.json', {}, config);
 }]);
