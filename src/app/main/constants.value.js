'use strict';

/**
 * @ngdoc overview
 * @name vaccinations
 * @description
 * # vaccinations
 *
 * Main module of the application.
 */

// Constants for this instance of the app
angular.module('vaccinations')
.value('appConstants', {
    // TODO: Retrive this from window.location;
    providerId: 1,
    // TODO: Retrive this from window.location;
    patientId: 1
});