'use strict';

// Manages the retrival of vaccinations from the server and the
// removal and entry of vaccinations for a patient.
angular.module('vaccinations')
.service('vaccinationsManager', ['$http', '$filter','appConstants', 'helperFunctions',
    function($http, $filter, appConstants, helperFunctions){
    var self = this;
    self.stagedVaccinations = [];

    var setVaccinations = function (vaccinations) {
        if (self.vaccinations){
            throw new Error('Vaccinations have already been set.');
        } else {
            self.vaccinations = vaccinations;
        }
    };

    var promise = $http.get('mock_data/vaccinations.json')
        // var vaccsPromise = $http.get('/vaccinations/patients/' + appConstants.patientId)
        .success(function(data, status, headers, config){
            setVaccinations(data.vaccinations);
        })
        .error(function(data, status, headers, config){
            alert('Error when retrieving patient vaccinations from server.');
        });
    // The main controller gets the vaccinations data from the server
    // and sets it in the manager.
    var exports = {

        addVaccination: function(vaccination) {
            var index = helperFunctions.findObjectIndexByAttribute('_id', vaccination._id, self.vaccinations);
            if (index === undefined){
                self.vaccinations.push(vaccination);
            } else {
                console.log("Could not add vaccination to array, a vaccination with the _id attribute already exists.");
            }
        },

        getVaccinations: function(){
            return promise;
        },

        getVaccinationById: function(id){
            var vaccination = $filter('filter')(self.vaccinations, function(vaccination, index){
                return vaccination._id === id;
            });
            return vaccination[0];
        },

        removeVaccination: function(id){
            var index = helperFunctions.findObjectIndexByAttribute('_id', id, self.vaccinations);
            if (index !== undefined){
                self.vaccinations.splice(index, 1);
            } else {
                console.log("The index of the vaccination to be removed could not be found.");
            }
        },

        addStagedVaccination: function(vaccine) {
            // We only want 1 staged vaccination at a time to keep
            // things organized. So clear the array first.
            this.removeStagedVaccination();
            self.stagedVaccinations.push(vaccine);
        },

        getStagedVaccinations: function () {
            return self.stagedVaccinations;
        },

        removeStagedVaccination: function () {
            self.stagedVaccinations.length = 0;
        },

        commitStagedVaccination: function (vaccine) {
            if (self.stagedVaccinations.length === 0) {
                alert("No vaccination is currently staged.")
                return;
            }
            $http.post('vaccinations/patients/1', vaccine)
                .success( function (data) {
                    this.removeStagedVaccination();
                    this.addVaccination(data.vaccination);
                })
                .error( function (data) {
                    alert("Unable to save the vaccination. Try again.");
                });
        }
    };

    return exports;
 }]);