'use strict';

angular.module('vaccinations')
.directive('vaccination', [ 'helperFunctions', function(helperFunctions) {
    return {
        restrict: 'E',
        // The link function provides access to the scope of the vaccination
        // element. Use the vaccinations.administered property to decide on
        // which template to include administered/unadministered.
        // The controller is assigned in the html templates.
        compile: function compile (element, attrs) {
            return {
                post: function postLink(scope, element, attributes) {
                    // Add popover for staged vaccinations.
                    scope.vaccination = {};
                    if (scope.getVaccination()._staged) {
                        scope.vaccination._staged = true;
                    }
                    scope.vaccination.administered = scope.getVaccination().administered;

                    // Tracks the location in the list
                    // of vaccination so grouping of the same vaccine can be done.

                    scope.indexVaccination = function () {
                        if (!scope.vaccination._staged) {
                            var prevVacc = scope.getVacc()[scope.$parent.$index-1];
                            var nextVacc = scope.getVacc()[scope.$parent.$index+1];
                            if (typeof prevVacc !== 'undefined') {
                                if (prevVacc.name !== scope.getVaccination().name) {
                                    scope.firstOfKind = true;
                                } else {
                                    scope.firstOfKind = false;
                                }
                            } else {
                                scope.firstOfKind = true;
                            }

                            // Check if this is the last of this type of vaccine
                            // in the list.
                            if (typeof nextVacc !== 'undefined') {
                                if (nextVacc.name !== scope.getVaccination().name) {
                                    scope.lastOfKind = true;
                                } else {
                                    scope.lastOfKind = false;
                                }
                            } else {
                                scope.lastOfKind = true;
                            }
                        }
                    };

                    scope.indexVaccination();

                    scope.getContentUrl = function(){
                        if (scope.vaccination.hasOwnProperty('_staged')) {
                            return '/app/vaccination/staged/vaccination_staged.template.html';
                        }
                        else if (scope.vaccination.administered){
                            return '/app/vaccination/administered/vaccination_administered.template.html';
                        }
                        else if (!scope.vaccination.administered){
                            return '/app/vaccination/unadministered/vaccination_unadministered.template.html';
                        }
                    };
                }
            };
        },

        template: '<div ng-include="getContentUrl()"></div>',
        scope: {
            getVaccination: '&',
            getVacc: '&'
        }
    };
 }]);