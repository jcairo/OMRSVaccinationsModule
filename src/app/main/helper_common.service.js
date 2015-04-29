'use strict';

angular.module('vaccinations')
.service('helperFunctions', function(){
    return {
        // Format vaccine names for dropdown
        formatVaccineName: function (vaccine) {
            var formattedVaccineName = vaccine.name + ':: ';
            if (vaccine.custom) {
                return 'Custom Vaccine::';
            }
            if (typeof vaccine.dose !== 'undefined') {
                formattedVaccineName += 'Dose: ' + vaccine.dose + ' ';
            }
            if (typeof vaccine.dosing_unit !== 'undefined') {
                formattedVaccineName += 'Unit: ' + vaccine.dosing_unit + ' ';
            }
            if (typeof vaccine.route !== 'undefined') {
                formattedVaccineName += 'Route: ' + vaccine.route + ' ';
            }
            return formattedVaccineName;
        },

        // Generate a random color
        getColor: function (mix) {
            var red = Math.floor((Math.random() * 16)) + 245;
            var green = Math.floor((Math.random() * 21)) + 235;
            var blue = Math.floor((Math.random() * 21)) + 235;
            return 'rgb(' + red + ',' + green + ',' + blue + ')'
        },

        // Find the index of an object with a given id.
        findObjectIndexByAttribute: function(attribute, attributeValue, array){
            for (var i = 0; i < array.length; i++) {
                if (array[i][attribute] === attributeValue){
                    return i;
                }
            }
            return undefined;
        },

        // Find the index of an object in an array.
        findObjectIndexByEquality: function(obj, array) {
            for (var i = 0; i < array.length; i++) {
                if (angular.equals(obj, array[i])) {
                    return i;
                }
            }
            return undefined;
        }
    };
});