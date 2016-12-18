'use strict';

var ouPopOverList = function ($document, $timeout,Helper) {

	'ngInject';
	
    var config = {

        restrict: 'E',
        scope: {
            limitFrom: '=ouPopoverLimitFrom',
            toggleItem: '&ouPopoverToggleItem',
            class: '@?ouPopoverClass',
            itemValue: '@ouPopoverItemValue',
            list: '=ouPopoverList'
        },
        templateUrl: './components/operational/directives/ou-popover-list/ou-popover-list.html',
        link: link
    };

    function link(scope, elem, attrs) {
        scope.class = scope.class || 'ou-popover-icon';

        scope.toggleItem = scope.toggleItem();

        scope.toggleSelectionList = function () {
            scope.visible = !scope.visible; //important 
        };
    
        function onDocumentClick(event) {

            var isClickedElementChildOfPopup = Helper.isDescendant(elem[0], event.target);

            if (isClickedElementChildOfPopup)
                return;

            $timeout(function () {
                scope.visible = false;
            });
        };

        $document.on("click", onDocumentClick);

        scope.$watch(
            // Getter function - gets the watched variable
            function (scope) {
                return scope.visible;
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

module.exports = ouPopOverList;
