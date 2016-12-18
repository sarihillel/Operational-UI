'use strict';

/*
 * @description: copied from angular.js ng-sw-when directive and added chek by descriprtion
 * @author:rivki aizen 08/03/2016
 */

var ngSwitchWhenExpDirective = function () {
    'ngInject'

    var directive = {
        transclude: 'element',
        priority: 1200,
        require: '^ngSwitch',
        multiElement: true,
        link: function (scope, element, attrs, ctrl, $transclude) {
            var ngSwitchWhenExp = scope.$eval(attrs.ngSwitchWhenExp);
            ctrl.cases['!' + ngSwitchWhenExp] = (ctrl.cases['!' + ngSwitchWhenExp] || []);
            ctrl.cases['!' + ngSwitchWhenExp].push({ transclude: $transclude, element: element });
        }
    }

    return directive;
}

module.exports = ngSwitchWhenExpDirective;