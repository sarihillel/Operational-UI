'use strict';

var ouPopover = function ($document, $timeout, Helper) {
    'ngInject';
    var config = {

        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            tsTitle: '@',
            tsVisible: '=',
            tsWidth: '@',
            tsHide: '&'
        },
        templateUrl: './components/operational/directives/ou-popover/ou-popover.html',
        link: link
    };

    function link($scope, element, attrs) {


        /*****************************************************
         *                  VARIABLES                        *
         *****************************************************/
        $scope.tsVisible = false;

        /*****************************************************
         *                  METHODS                          *
         *****************************************************/

        $scope.toggleSelectionList = function () {
            $scope.tsVisible = !$scope.tsVisible;
        };

    

        function onDocumentClick(event) {

            var isClickedElementChildOfPopup = Helper.isDescendant(element[0], event.target);

            if (isClickedElementChildOfPopup)
                return;

            $timeout(function () {
                $scope.tsVisible = false;
                var hideFn = $scope.tsHide();
                if ('undefined' !== typeof hideFn) {
                    hideFn();
                }
            });
        };

        $document.on("click", onDocumentClick);

        $scope.$watch(
            // Getter function - gets the watched variable
            function (scope) {
                return scope.tsVisible;
            },
            // if there's a new value for the watched variable:
            function (v) {
                if (v) { //bind document click when element is shown
                    $document.on("click", onDocumentClick);
                }
                else { //un-bind document click when element is hidden
                    $document.off("click", onDocumentClick);
                }
            });

        element.on('$destroy', function () {      //un-bind document click when element is destroyed
            $document.off("click", onDocumentClick);
        });
    }

    /*****************************************************
     *                  EXECUTIONS                       *
     *****************************************************/
    return config;
};

module.exports = ouPopover;