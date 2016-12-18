'use strict';
/*
 * @description: add to input x button at the left, 
 * if the input not empty the x button show , on click the input will be empty
 */
var ouGridSize = function ($compile) {
    
    'ngInject';

    var config = {
        restrict: 'A',
        link: link,
    };

    function link(scope, element, attrs) {
        var offset = element.parent()[0].offsetHeight;
        element.height(offset);
    }

    return config;
};

module.exports = ouGridSize;
