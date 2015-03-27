'use strict';

angular.module('vaccinations')
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
        compile: function compile (element, attrs) {
            return {
                post: function postLink(scope, element, attributes) {
                    // Add popover for staged vaccinations.
                    scope.vaccination = scope.getVaccination();
                    scope.getContentUrl = function(){
                        if (scope.vaccination.hasOwnProperty('_staged')) {
                            return '/app/vaccination/staged/vaccination_staged.template.html';
                        }
                        else if (scope.vaccination.administered){
                            return '/app/vaccination/administered/vaccination_administered.template.html';
                        }
                        else if (!scope.vaccination.administered){
                            return '/app/vaccination/unadministered/vaccination_unadministered.html';
                        }
                    };
                    if (scope.vaccination.hasOwnProperty('_staged')) {
                        // var header = angular.element(element).find('div.header');
                        scope._popover = $popover(element, {
                            title: 'My TI',
                            content: 'hel',
                            placement: 'top'
                        });
                        scope._popover.$promise.then(scope._popover.show);
                    }
                }
            };
        },

        template: '<header ng-if="vaccination.administered"></header>',
        //template: '<include-replace ng-include="getContentUrl()"></include-replace>',
        scope: {
            getVaccination: '&',
        }
    };
 }]);