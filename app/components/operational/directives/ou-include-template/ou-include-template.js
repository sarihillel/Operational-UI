'use strict';


/*
 * @description: like ng-include but not creats new scope
 * @param: {templateUrl}: if there is value get template and comile contects
 * @param: {ouIncludeTemplate}: (template) if there is not templateUrl attr search in ouIncludeTemplate and compile it
 */
var ouIncludeTemplate = function ($http, $templateCache, $compile) {
    'ngInject'

    var directive = {
        restrict: 'EA',
        link: function (scope, element, attrs) {
        	//if (attrs.templateUrl)
            //	scope.$watch(attrs.templateUrl, function (value) {
            //    	if (value) {
            //        	loadTemplate(value);
            //    	}
            //	});
            //scope.$watch(attrs.ouIncludeTemplate, function (value) {
            //    if (value) {
            //        compileContent(scope.$eval(attrs.ouIncludeTemplate));
            //    }
            //});

            function loadTemplate(template) {
                $http.get(template, { cache: $templateCache })
                  .success(function (templateContent) {
                      compileContent(templateContent);
                  });
            }

            function compileContent(templateContent) {
                element.html($compile(templateContent)(scope));
            }


            var initialize = function () {
                if (attrs.templateUrl)
                    loadTemplate(attrs.templateUrl);
                else
                    compileContent(scope.$eval(attrs.ouIncludeTemplate));
            }

            initialize();
        }

    };

    return directive;
}


module.exports = ouIncludeTemplate;