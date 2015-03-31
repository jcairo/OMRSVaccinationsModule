'use strict';

angular.module('vaccinations')
.directive('header', ['$popover', function($popover) {
    return {
        restrict: 'E',
        templateUrl: '/app/vaccination/unadministered/vaccination_unadministered.template.html'
        //link: function (scope, element, tattr) {
        //    var header = element.find('div.vaccination');
        //    scope._popover = $popover(header, {
        //        title: 'My TI lkafd lkajf l lajfl k jlkdsfj',
        //        content: 'hellf ljkalksj lkj laksjlaksjaf ',
        //        placement: 'top'
        //    });
        //    scope._popover.$promise.then(scope._popover.show);
        //}
    };
}]);