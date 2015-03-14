'use strict';

var mockBackend = angular.module('mockBackend', ['vaccinationsApp', 'ngMockE2E']);
mockBackend.run(function($httpBackend, $resource, $http){
    // Get the mock json data
    var vaccinations = $resource('mock_data/vaccinations.json').get();
    $httpBackend.whenGET('mock_data/vaccinations.json').respond(vaccinations);
    $httpBackend.whenPOST('/vaccinations').respond(function(mehod, url, data){
        var vaccination = angular.fromJson(data);
        vaccinations.push(vaccination);
        return [200, vaccination, {}];
    });
    $httpBackend.whenGET('/').passThrough();
});
// Manually bootstrap the backend.
angular.element(document).ready(function () {
    'use strict';
    angular.bootstrap(document, ['vaccinationsApp']);
});
