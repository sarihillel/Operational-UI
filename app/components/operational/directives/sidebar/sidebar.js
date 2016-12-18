'use strict';


var sidebar = function ($window) {
	'ngInject';
    return {
        restrict: 'E',
        replace: true,
        scope: {
            isSideBarClosed: '=',
            toggleSideBar: '='
        },
        templateUrl: './components/operational/directives/sidebar/sidebar.html',
        link: link,
        controller: 'sidebarController'
    };

    function link($scope, element, attrs) {
        angular.element($window).on('resize', function() {
            if (!$scope.isSideBarClosed && window.innerWidth < 992 ) {
            	$scope.toggleSideBar();
            	$scope.$apply();
            }
        });
    }
 };

 module.exports = sidebar;
    