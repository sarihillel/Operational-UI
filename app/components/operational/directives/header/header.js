'use strict';

var header = function (localStorage, authService, $document, $timeout, $state) {
	'ngInject';
	
    return {
        restrict: 'E',
        replace: true,
        scope: {
            isSideBarClosed: '=',
            toggleSideBar: '=',
            isClear: '='
        },
        templateUrl: './components/operational/directives/header/header.html',
        link: link
    };

    function link($scope, element, attrs) 
    {
    
    /*****************************************************
     *                  VARIABLES                        *
     *****************************************************/

   // $scope.userName = USERNAME;
    if(authService.currentUser){
    	$scope.userName = authService.currentUser.name;	
    }
    
    $scope.usernameSelectionListOptions = ['', 'Logout'];

    /*****************************************************
     *                  METHODS                        *
     *****************************************************/


    var getSelectedThemeFromLocalStorage = function () {
        var selectedTheme = localStorage.get('theme') === 'clear' ? 'Clear Theme' : 'Dark Theme';

        $timeout(function () {
            $scope.usernameSelectionListOptions[0] = selectedTheme;
        }, 0);
    };


    // Toggles between themes & saves the chosen theme to localStorage.
    $scope.toggleTheme = function () {

        $scope.isClear = !$scope.isClear;

        var themeToStoreInLocalStorage = localStorage.get('theme') === 'clear' ? 'dark' : 'clear';

        localStorage.set('theme', themeToStoreInLocalStorage);

        if (document.getElementById('editor')) {
            var theme = $scope.isClear ? 'xcode' : 'monokai';
            ace.edit("editor").setTheme("ace/theme/" + theme);
        }

        getSelectedThemeFromLocalStorage();
    };

    $scope.logout = function () {
        $scope.user = null;
		authService.logout();
		$state.go('login');
    };


    $scope.usernameSelectionListItemClicked = function (index) {
        switch (index) {
            case 0:
                $scope.toggleTheme();
                break;
            case 1:
                $scope.logout();
                break;
        }
    };

    /*****************************************************
     *                  EXECUTIONS                        *
     *****************************************************/

    angular.element('.ie9 [placeholder]').focus(function () {
        var input = angular.element(this);
        if (input.val() == input.attr('placeholder')) {
            input.val('');
            input.removeClass('placeholder');
        }
    }).blur(function () {
        var input = angular.element(this);
        if (input.val() == '' || input.val() == input.attr('placeholder')) {
            input.addClass('placeholder');
            input.val(input.attr('placeholder'));
        }
    }).blur();



    getSelectedThemeFromLocalStorage();
    }
};

module.exports = header;