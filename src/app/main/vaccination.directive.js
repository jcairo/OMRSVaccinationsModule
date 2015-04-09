'use strict';

angular.module('vaccinations')
.directive('vaccination', [ function() {
    return {
        restrict: 'E',
        // compile: function(scope, element, attrs){
        //     console.log(scope);
        // },
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
                    var prevVacc = scope.getVacc();

                    // Determine whether this vaccination is the first
                    // of its kind in the list. If so we want to put a
                    // header on it with the drug name.
                    if (typeof prevVacc !== 'undefined') {
                        if (prevVacc.name !== scope.getVaccination().name) {
                            scope.firstOfKind = true;
                        } else {
                            scope.firstOfKind = false;
                        }
                    } else {
                        scope.firstOfKind = true;
                    }

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

        template: '<include-replace ng-include="getContentUrl()"></include-replace>',
        scope: {
            getVaccination: '&',
            getVacc: '&'
        }
    };
 }]);