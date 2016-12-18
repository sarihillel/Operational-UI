'use strict';
var sidebarController = function($scope, $state,ouTabsService) {
	'ngInject';

    /*****************************************************
     *                  VARIABLES                        *
     *****************************************************/

    /*****************************************************
     *                  METHODS                        *
     *****************************************************/
    // resize sidebar in order to fit the screen with no scroll
    function resizeSidebar() {
        var sidebarOffset = 0;
        var element = document.getElementById('page-sidebar');

        while (element) {
            sidebarOffset += (element.offsetTop - element.scrollTop + element.clientTop);
            element = element.offsetParent;
        }

        var calculatedHeight = window.innerHeight - sidebarOffset;
        document.getElementById('page-sidebar').setAttribute("style", "height:" + calculatedHeight + "px");
    }

    

    $scope.navigateToOpenOperationalTab = function (nextState){
    	
        var currentTab = ouTabsService.getCurrentTab('mainTabs');
        if (currentTab != null)
        {
        	ouTabsService.findTabListApi('mainTabs').go(currentTab);
        }
        else
        {
        	$scope.navigateTo(nextState);
        }
    };
    
    
	$scope.navigateTo = function (nextState){
    	
    	$state.go(nextState);
    };
    
	$scope.isActiveRoot = function(state) {
		return $state.includes(state);
	};

    /*****************************************************
     *                  EXECUTIONS                       *
     *****************************************************/
    angular.element(document).ready(function () {
        resizeSidebar();
    });
};

module.exports = sidebarController;