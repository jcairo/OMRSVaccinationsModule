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
        templateUrl: 'scripts/directives/vaccination_administered.html',
        replace: false
    };
 })
 .factory('vaccinations', ['$http', function($http){
    var vaccinations;
    return {
        getVaccinations: function(){
            if (!vaccinations){
                $http.get('../mock_data/vaccinations.json')
                    .success(function(result){
                        vaccinations = result.vaccinations;
                        return vaccinations;
                        console.log(result);
                    })
                    .error(function(data, status){
                        console.log(data);
                });
            } else {
                return vaccinations;
            }
        }
    };
 }]);
