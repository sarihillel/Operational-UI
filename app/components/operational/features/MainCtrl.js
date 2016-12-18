'use strict';

var MainCtrl = function ($scope,$state, localStorage,authService) {
'ngInject';


    //Variables:

    $scope.showSidebar = false;

    $scope.isSideBarClosed = false; // Determines if side bar is closed
    $scope.isClear = true; // Determines if the current theme is clear

    // Functions:

    // Opens or Closes sidebar when 'hamburger' button clicked
    $scope.toggleSideBar = function () {

        $scope.isSideBarClosed = !$scope.isSideBarClosed;

        // Adjust table's height only if exists
        var tableDiv = document.getElementById('table1');
        if (tableDiv) {
            var height = tableDiv.clientHeight;
            //handsTableInstance.updateSettings({height: height});
        }
    };

    // Executions:

    // if 'theme' key does not exist in localStorage, create it and set a default 'clear' theme
    if (!localStorage.get('theme')) {
        localStorage.set('theme', 'clear');
    }

    // if 'theme' value in localStorage is 'dark', set 'isClear' to false
    if (localStorage.get('theme') === 'dark') {
        //document.body.className += " dark";
        $scope.isClear = false;
    }

    $scope.showSidebar = true;

 // Set current user data or go to login
	$scope.$on('$stateChangeSuccess', function() {
		authService.authCheck().catch(function() {
			$state.go('login');
		});
	});

};

module.exports = MainCtrl;
