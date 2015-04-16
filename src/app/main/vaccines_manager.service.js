'use strict';

angular.module('vaccinations')
.service('vaccinesManager', ['$http', function($http) {
    var self = this;
    var promise = $http.get('/vaccines/non_scheduled').success( function(data) {
        self.vaccines = data.non_scheduled_vaccines;
    });

    var exports = {
        getVaccines: function() {
            return promise;
        }
    };

    return exports;

}]);