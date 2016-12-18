'use strict';
/*
 * @description: add to input x button at the left, 
 * if the input not empty the x button show , on click the input will be empty
 */
var ouInputClear = function ($compile) {
	'ngInject';
    var config = {
        restrict: 'A',
        link: link,
    };

    function link(scope, element, attrs) {

        var action = attrs.ngModel + " = '';";
        element.wrap('<div class="ou-input-icon-div"></div>');
        element.after($compile(angular.element(
            '<span class="animate-show ou-icon" ng-if="' + attrs.ngModel + '" ng-click=" ' + action + '">' +
                '<i class="fa fa-times"></i>' +
            '</span>'))(scope));


    }

    return config;
};

module.exports = ouInputClear;
