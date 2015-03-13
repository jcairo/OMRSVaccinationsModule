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
.factory('vaccinations', ['$resource', function($resource){
    var config = {
         // TODO: Ensure caching is working as expected.
         // This call should only be made once.
         query: {method:'GET', isArray:false, cache:true}
    };
    // TODO: Change this address to the vaccionations of patient id.
    return $resource('mock_data/vaccinations.json', {}, config);
 }]);
