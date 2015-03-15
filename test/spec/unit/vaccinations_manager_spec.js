'use strict';

describe('Service: vaccinationsManager', function() {
    beforeEach(module('vaccinationsApp'));

    var vaccinationsManager, httpBackend;

    beforeEach(inject(function(_vaccinationsManager_, $httpBackend){
        vaccinationsManager = _vaccinationsManager_;
        httpBackend = $httpBackend;

        var response = readJSON('app/mock_data/vaccinations.json');
        console.log(response);
        $httpBackend.whenGET('mock_data/vaccinations.json').respond(response);
}));

    it('should be able to get a list of all vaccinations from the server', function () {
        vaccinationsManager.getVaccinations();
        httpBackend.flush();
        console.log(vaccinationsManager);
        expect(vaccinationsManager.vaccinations.length).toBe(8);
    });
});