'use strict';

var mockBackend = angular.module('mockBackend', ['vaccinations', 'ngMockE2E', 'mockData']);
mockBackend.run(function($httpBackend, $resource, mockObjects){
    // Get the mock json data from the mockData module.
    var vaccinations = mockObjects.vaccinations;
    var vaccines =  mockObjects.vaccines;

    $httpBackend.whenGET(/^\/?vaccinations\/patients\/1/).respond(mockObjects);
    $httpBackend.whenGET('/vaccines').respond(mockObjects);

    $httpBackend.whenPOST(/^\/vaccinations\/patients\/1/).respond(function(mehod, url, data){
        console.log("Matched!");
        var vaccination = angular.fromJson(data).vaccine;
        // Add a vaccination id field and remove the
        // staged marker.
        vaccination._id = "NEWLYADDED-" + Math.random() * 10000000;
        delete vaccination._staged;
        vaccinations.push(vaccination);
        return [200, {vaccination:vaccination}, {}];

    });
    $httpBackend.whenPUT('vaccinations/patients/1');

    // Do not serve anything from the mock server on these routes.
    $httpBackend.whenGET(/\/?mock_data\/.+/).passThrough();
    $httpBackend.whenGET(/\/?app\/.+/).passThrough();
});
// Manually bootstrap the backend.
angular.element(document).ready(function () {
    angular.bootstrap(document, ['mockBackend']);
});
