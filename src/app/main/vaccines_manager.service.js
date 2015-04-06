'use strict';

angular.module('vaccinations')
.service('vaccinesManager', ['$http', function($http) {
    var self = this;
    var promise = $http.get('vaccines/non_routine.json').success( function(data) {
        self.vaccines = data.nonRoutineVaccines;
    });

    var exports = {
        getVaccines: function() {
            return promise;
        }
    };

    return exports;

}]);