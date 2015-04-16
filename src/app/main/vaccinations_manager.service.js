'use strict';

// Manages the retrival of vaccinations from the server and the
// removal and entry of vaccinations for a patient.
angular.module('vaccinations')
.service('vaccinationsManager', ['$http', '$filter', 'appConstants', 'helperFunctions',
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

    var promise = $http.get('vaccinations/patients/1')
        .success(function(data, status, headers, config){
            setVaccinations(data.vaccinations);
        })
        .error(function(data, status, headers, config){
            alert('Error when retrieving patient vaccinations from server.');
        });

    var exports = {

        addVaccination: function(vaccination) {
            var index = helperFunctions.findObjectIndexByAttribute('_id', vaccination._id, self.vaccinations);
            if (index === undefined){
                self.vaccinations.push(vaccination);
            } else {
                throw new Error('Could not add vaccination to array, a vaccination with the _id attribute already exists.');
            }
        },

        // vaccinationCopy provides a way to remove template vaccinations
        // from the vaccinations list. It is only required when calling
        // the function with a new vaccination, not when the vaccination
        // exists on the server and needs to be modified.
        submitVaccination: function(vaccination, vaccsOrigCopy) {
            var that = this;
            // Prevent unintentional sending of reaction details
            // modifications.
            var vaccination = angular.copy(vaccination);
            try {
                delete vaccination.reaction_details;
            } catch(err) {
                console.log(err);
            }
            // Check whether we are updating an existing vaccination
            // or adding new vaccination.
            if (vaccination.hasOwnProperty('_id')) {
                // Vaccination exists, modify on server.
                $http.put(
                    '/vaccinations/' + vaccination._id +
                    '/patients/' + appConstants.getPatientId(window.location.href),
                    {vaccination: vaccination})
                .success( function (data) {
                    // Remove the old version and add the new version
                    that.removeVaccination(vaccination._id);
                    that.addVaccination(data.vaccination); })
                .error( function (data) {
                    alert("The vaccination was not saved. Please try again.");
                });
            } else {
                // Vaccination does not exist on server. Post to server.
                $http.post(
                    '/vaccinations/patients/' + appConstants.getPatientId(window.location.href),
                    {vaccination: vaccination} )
                .success( function (data) {
                    // This catches new, unscheduled vaccinations
                    // that have not been saved to the patients records.
                    if (vaccination._staged) {
                        that.removeStagedVaccination();
                    // This catches scheduled vaccinations that
                    // have yet to be saved to the patients records.
                    // Since scheduled unadministered vaccs have no id
                    // remove old version using object equality.
                    } else {
                        var idx = helperFunctions.findObjectIndexByEquality(vaccsOrigCopy, self.vaccinations);
                        self.vaccinations.splice(idx, 1);
                    }
                    that.addVaccination(data.vaccination); })
                .error( function (data) {
                    alert("The vaccination was not saved. Please try again.");
                });
            }
        },

        submitReaction: function (reaction, vaccination) {
            // Get the vaccination from the array.
            // Adding reaction details to the vaccination passed
            // into the function will only change the copy.
            var that = this;
            var vacc = this.getVaccinationById(vaccination._id);
            if (vaccination.adverse_reaction) {
                $http.put(
                    '/vaccinations/' + vaccination._id +
                    '/patients/' + appConstants.getPatientId(window.location.href) +
                    '/adverse_reactions/' + reaction._id,
                    {reaction: reaction} )
                .success( function (data) {
                    that.removeVaccination(vaccination._id);
                    that.addVaccination(data.vaccination);
                })
                .error( function (data) {
                    alert("An error occured while sending information to server. Try again.");
                });
            } else {
                $http.post(
                    '/vaccinations/' + vaccination._id +
                    '/patients/' + appConstants.getPatientId(window.location.href) +
                    '/adverse_reactions',
                    {reaction: reaction} )
                .success( function (data) {
                    that.removeVaccination(vaccination._id);
                    that.addVaccination(data.vaccination);
                })
                .error( function (data) {
                    alert("An error occured while sending information to server. Try again.");
                });
            }
        },

        removeReaction: function (reaction) {
            var that = this;
            $http.delete(
                '/vaccinations/' + reaction._vaccination_id +
                '/patients/' + appConstants.getPatientId(window.location.href) +
                '/adverse_reactions/' + reaction._id,
                {reaction: reaction})
            .success( function (data) {
                that.removeVaccination(data.vaccination._id);
                that.addVaccination(data.vaccination);
            })
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
        }
    };

    return exports;
 }]);