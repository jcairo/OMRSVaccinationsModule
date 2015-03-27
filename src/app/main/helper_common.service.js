'use strict';

angular.module('vaccinations')
.service('helperFunctions', function(){
    return {
        // Find the index of an object with a given id.
        findObjectIndexByAttribute: function(attribute, attributeValue, array){
            for (var i = 0; i < array.length; i++){
                if (array[i][attribute] === attributeValue){
                    return i;
                }
            }
            return undefined;
        }
    };
});