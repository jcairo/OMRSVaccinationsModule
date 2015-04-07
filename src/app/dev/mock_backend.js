'use strict';

var mockBackend = angular.module('mockBackend', ['vaccinations', 'ngMockE2E', 'mockData']);
mockBackend.run(function($httpBackend, $resource, mockObjects, helperFunctions){
    // Get the mock json data from the mockData module.
    var vaccinations = mockObjects.vaccinations;
    var routineVaccines =  mockObjects.routineVaccines;
    var nonRoutineVaccines =  mockObjects.nonRoutineVaccines;

    $httpBackend.whenGET(/^\/?vaccinations\/patients\/1/).respond(mockObjects);
    $httpBackend.whenGET(/^\/?vaccines\/routine\/?/).respond(mockObjects);
    $httpBackend.whenGET(/^\/?vaccines\/non_routine\/?/).respond(mockObjects);

    $httpBackend.whenPOST(/^\/vaccinations\/patients\/1/).respond(function(method, url, data){
        var vaccination = angular.fromJson(data).vaccination;
        // Add a vaccination id field and remove the
        // staged marker.
        vaccination._id = "NEWLYADDED" + Math.floor(Math.random() * 10000000);
        delete vaccination._staged;
        if (vaccination.administration_date) {
            vaccination.administered = true;
        }
        vaccinations.push(vaccination);
        return [200, {vaccination:vaccination}, {}];

    });

    $httpBackend.whenPUT(/^\/vaccinations\/[a-zA-Z0-9_]+\/patients\/[a-zA-Z0-9]+$/)
        .respond( function (method, url, data) {
            var vaccination = angular.fromJson(data).vaccination;
            var index = helperFunctions.findObjectIndexByAttribute('_id', vaccination._id, vaccinations);
            if (vaccination.administration_date) {
                vaccination.administered = true;
            }
            vaccinations.splice(index, 1);
            vaccinations.push(vaccination);
            return [200, {vaccination: vaccination}, {}];
    });

    $httpBackend.whenPOST(/^\/vaccinations\/[a-zA-Z0-9]+\/patients\/[a-zA-Z0-9]+\/adverse_reactions$/)
        .respond(function (method, url, data) {
            var reaction = angular.fromJson(data).reaction;
            var index = helperFunctions.findObjectIndexByAttribute('_id', reaction._vaccination_id, vaccinations);
            var vaccination = vaccinations[index];
            vaccination.reaction_details = reaction;
            vaccination.reaction_details._id = "NEWLYADDED" + Math.floor(Math.random() * 10000000);
            vaccination.adverse_reaction = true;

            return [200, {vaccination: vaccination}, {}];
    });

    $httpBackend.whenPUT(/^\/vaccinations\/[a-zA-Z0-9]+\/patients\/[a-zA-Z0-9]+\/adverse_reactions\/[0-9a-zA-Z]+$/)
        .respond(function (method, url, data) {
            var reaction = angular.fromJson(data).reaction;
            var index = helperFunctions.findObjectIndexByAttribute('_id', reaction._vaccination_id, vaccinations);
            var vaccination = vaccinations[index];
            vaccination.reaction_details = reaction;
            vaccination.adverse_reaction = true;

            return [200, {vaccination: vaccination}, {}];
    });

    $httpBackend.whenDELETE(/^\/vaccinations\/[a-zA-Z0-9]+\/patients\/[a-zA-Z0-9]+\/adverse_reactions\/[0-9a-zA-Z]+$/)
        .respond( function (method, url, data) {
           var vaccination_id = data.vaccination.vaccination_id;
        })

    // Do not serve anything from the mock server on these routes.
    $httpBackend.whenGET(/\/?mock_data\/.+/).passThrough();
    $httpBackend.whenGET(/\/?app\/.+/).passThrough();
});
// Manually bootstrap the backend.
angular.element(document).ready(function () {
    angular.bootstrap(document, ['mockBackend']);
});
