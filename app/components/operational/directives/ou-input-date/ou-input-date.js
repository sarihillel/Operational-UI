'use strict';
/*
 * @description: add to input x button at the left, 
 * if the input not empty the x button show , on click the input will be empty
 */
var ouInputDate = function ($compile) {
	'ngInject';
    var config = {
        restrict: 'A',
        link: link,
    };

    function link(scope, element, attrs) {

        var action = attrs.pikaday + '.show()';
        var piker;
        var clear=function () {
            if (attrs.onClear)
                scope.$eval(attrs.onClear);
        }
        element.bind('change', function () {
            piker = piker || scope.$eval(attrs.pikaday);
            if (element.val()) {
                if (!piker.getDate() || piker.toString() != element.val()) {
                    piker.setDate('');
                    clear();
                }
            }
            else if (piker.getDate()) {
                piker.setDate('');
                clear();
            }

            
        });
        element.wrap('<div class="ou-input-icon-div ou-input-date"></div>');
        element.after($compile(angular.element(
            '<span class="animate-show ou-icon" ng-click=" ' + action + '"  >' +
                '<i class="fa fa-calendar"></i>' +
            '</span>'))(scope));
    }

    return config;
};

module.exports = ouInputDate;
