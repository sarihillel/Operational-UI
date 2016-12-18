'use strict';
/*
 * @description: add to input x button at the left, 
 * if the input not empty the x button show , on click the input will be empty
 */
var ouInputPhone = function ($compile) {
    
    'ngInject';

    var config = {
        restrict: 'EA',
        replace: true,
        templateUrl: './components/operational/directives/ou-input-phone/ou-input-phone.html',
        scope: {
            phoneModel: '=',
            isAdditional: '=?'

        },
        link: link,
    };

    function link(scope, element, attrs) {

        if(scope.isAdditional == undefined)
            scope.isAdditional = false;

        scope.getSetCountryCode = function (countryCode) {
            var modelCountryCode = scope.isAdditional ? scope.phoneModel.AddCountryCode : scope.phoneModel.CountryCode;
            if (!arguments.length) return modelCountryCode;

            if(scope.isAdditional){
                scope.phoneModel.AddCountryCode = countryCode;
            }
            else{
                scope.phoneModel.CountryCode = countryCode;
            }
        };

        scope.getSetAreaCode = function (areaCode) {
            var modelAreaCode = scope.isAdditional ? scope.phoneModel.AddAreaCode : scope.phoneModel.AreaCode;
            if (!arguments.length) return modelAreaCode;

            if(scope.isAdditional){
                scope.phoneModel.AddAreaCode = areaCode;
            }
            else{
                scope.phoneModel.AreaCode = areaCode;
            }
        };

        scope.getSetCOP = function (COP) {
            var modelCOP = scope.isAdditional ? scope.phoneModel.AddCOP : scope.phoneModel.COP;
            if (!arguments.length) return modelCOP;

            if(scope.isAdditional){
                scope.phoneModel.AddCOP = COP;
            }
            else{
                scope.phoneModel.COP = COP;
            }
        };

        scope.getSetLineNumber = function (lineNumber) {
            var modelLineNumber = scope.isAdditional ? scope.phoneModel.AddLineNumber : scope.phoneModel.LineNumber;
            if (!arguments.length) return modelLineNumber;

            if(scope.isAdditional){
                scope.phoneModel.AddLineNumber = lineNumber;
            }
            else{
                scope.phoneModel.LineNumber = lineNumber;
            }
        };
    }

    return config;
};

module.exports = ouInputPhone;
