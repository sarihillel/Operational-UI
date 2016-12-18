'use strict';

var dropdownList = function ($document, $timeout, Helper) {
	'ngInject';
    var config = {

        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            isUsernameSelectionList: '=',
            selected: '='
        },
        templateUrl: './components/operational/directives/dropdown-list/dropdown-list.html',
        link: link
    };

    function link(scope, elem, attrs) {

        scope.isDropdownVisible = false;
        //scope.userImageUrl = USERIMAGEURL;
        scope.userImageUrl = "../assets/images/avatar5.png";

        scope.toggleSelectionList = function () {
            scope.isDropdownVisible = !scope.isDropdownVisible;
        };

        function onDocumentClick(event) {

            var isClickedElementChildOfPopup = Helper.isDescendant(elem[0], event.target);

            if (isClickedElementChildOfPopup)
                return;

            $timeout(function () {
                scope.isDropdownVisible = false;
            });
        };

        $document.on("click", onDocumentClick);

        scope.$watch(
            // Getter function - gets the watched variable
            function (scope) {
                return scope.isDropdownVisible;
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

        elem.on('$destroy', function () {      //un-bind document click when element is destroyed
            $document.off("click", onDocumentClick);
        });
    }

    return config;

};

module.exports = dropdownList;
