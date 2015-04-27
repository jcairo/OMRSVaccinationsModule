'use strict';

angular.module('vaccinations')
.directive('loader', function () {
    var ddo = {
        replace: true,
        templateUrl: '/app/main/loader.template.html',
    };

    return ddo;
});
