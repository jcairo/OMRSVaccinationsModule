'use strict';

describe('Service: vaccinationsManager', function() {
    beforeEach(module('vaccinationsApp'));

    var vaccinationsManager, httpBackend, mockVaccinationsData, mockVaccination, vaccinations;

    beforeEach(inject(function(_vaccinationsManager_, $httpBackend){
        vaccinationsManager = _vaccinationsManager_;
        httpBackend = $httpBackend;

        // Create a mock response.
        mockVaccinationsData = readJSON('app/mock_data/vaccinations.json');
        mockVaccination = readJSON('app/mock_data/vaccinations.json').vaccinations[0];
        $httpBackend.whenGET('mock_data/vaccinations.json').respond(mockVaccinationsData);

        // Add mock data to the manager.
        // vaccinationsManager.setVaccinations(mockVaccinationsData.vaccinations);

    }));

    beforeEach(function (done) {
        vaccinationsManager.getVaccinations().success( function (data) {
            vaccinations = data.vaccinations;
            done();
        });
        httpBackend.flush();
    });

    // it('should reject any attempt to set vaccinations more than once', function(){
    //     expect(function(){vaccinationsManager.setVaccinations(mockVaccinationsData.vaccinations);})
    //         .toThrow(new Error('Vaccinations have already been set.'));
    // });

    it('should allow you to set an array of vaccination objects', function () {
        expect(vaccinations.length).toBe(10);
    });

    it('should remove a vaccination from the array based on id', function(){
        var idOfVaccinationToRemove = vaccinations[0]._id;
        vaccinationsManager.removeVaccination(idOfVaccinationToRemove);
        expect(vaccinations.length).toBe(9);
        expect(vaccinationsManager.getVaccinationById(idOfVaccinationToRemove)).not.toBeDefined();

        // vaccinationsManager.getVaccinations().success( function(data) {
        //     vaccsCheck = data.vaccinations;
        //     expect(vaccinations).toEqual(vaccsCheck);
        //     done();
        // });
        // httpBackend.flush();
    });

    it('should add a new vaccination object to the array if its _id attribute is unique', function(){
        mockVaccination._id = mockVaccination._id + '1';
        vaccinationsManager.addVaccination(mockVaccination);
        expect(vaccinationsManager.testHelper().length).toBe(11);
    });

    it('should reject a new vaccination from being added to the array if its _id attribute is not unique', function() {
        vaccinationsManager.addVaccination(mockVaccination);
        expect(vaccinationsManager.testHelper().length).toBe(10);
    });
});