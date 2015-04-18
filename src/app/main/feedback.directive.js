'use strict';

angular.module('vaccinations')
.directive('feedback', [ function () {
    return {
        replace: true,
        templateUrl: '/app/main/feedback.template.html',
        scope: {
            // Boolean indicating whether to show or hide.
            warn: '&',
            warning: '@'
        }
    };
}]);