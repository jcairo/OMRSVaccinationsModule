'use strict';

describe('Service: vaccinationsManager', function() {
    beforeEach(module('vaccinations', 'mockData'));

    var vaccinationsManager, httpBackend, mockVaccinationsData, mockVaccination, mockObjects, vaccinations;

    beforeEach(inject(function(_vaccinationsManager_, _mockObjects_, $httpBackend){
        mockObjects = _mockObjects_;
        vaccinationsManager = _vaccinationsManager_;
        httpBackend = $httpBackend;

        // Create a mock responses and backend.
        mockVaccinationsData = mockObjects;
        mockVaccination = mockObjects.vaccinations[0];
        $httpBackend.whenGET(/\/?vaccinations\/patients\/.+/).respond(mockVaccinationsData);
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

    it('should allow automatically set an array of vaccination objects on instantiation', function () {
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
        expect(vaccinations.length).toBe(11);
    });

    it('should reject a new vaccination from being added to the array if its _id attribute is not unique', function() {
        vaccinationsManager.addVaccination(mockVaccination);
        expect(vaccinations.length).toBe(10);
    });
});