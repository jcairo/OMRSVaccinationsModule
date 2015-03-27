'use strict';

var mockBackend = angular.module('mockBackend', ['vaccinations', 'ngMockE2E']);
mockBackend.run(function($httpBackend, $resource){
    // Get the mock json data
    var vaccinations = $resource('../mock_data/vaccinations.json').get();
    var vaccines = $resource('../mock_data/vaccines.json').get();
    $httpBackend.whenGET('/vaccinations/patients/1').respond(vaccinations);
    $httpBackend.whenGET('/vaccines').respond(vaccines);

    $httpBackend.whenPOST('/vaccinations/patients/1').respond(function(mehod, url, data){
        var vaccination = angular.fromJson(data);
        vaccinations.push(vaccination);
        return [200, vaccination, {}];
    });
    $httpBackend.whenPUT('vaccinations/patients/1');
    // $httpBackend.whenGET('/').passThrough();
});
// Manually bootstrap the backend.
angular.element(document).ready(function () {
    angular.bootstrap(document, ['vaccinations']);
});
