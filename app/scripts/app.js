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
    ])
 .directive('vaccination', function() {
    return {
        restrict: 'E',
        templateUrl: 'scripts/directives/vaccination.html',
        replace: false
    };
 });
