'use strict';

var loginController = function ($scope, $state, $filter, authService, localStorageService, $translate,ERRORS) {
	'ngInject';
	$scope.isFormSubmitted = false;
	$scope.incorrectAuthData = false;

	/**
	 * Login form submit handler
	 */
	$scope.loginFormSubmit = function() {
		$scope.isFormSubmitted = true;
		$scope.incorrectAuthData = false;
		$scope.loginFormErrorMessage = null;

		// set error message according to form state
		if (!$scope.loginForm.$valid) {
			if ($scope.loginForm.username.$error.required && $scope.loginForm.password.$error.required) {
				$scope.loginFormErrorMessage = $filter('translate')('features.login.emptyfields');
			} else if ($scope.loginForm.username.$error.required) {
				$scope.loginFormErrorMessage = $filter('translate')('features.login.emptyuser');
			} else if ($scope.loginForm.password.$error.required) {
				$scope.loginFormErrorMessage = $filter('translate')('features.login.emptypassword');
			}
			return;
		}
		
		var authData = {
			username: $scope.inputsContent.usn,
			password: $scope.inputsContent.pwd
		};

		authService.login(angular.toJson(authData))
			.then(function(response) {
				if (!authService.authStatus)
				{
					$scope.loginFormErrorMessage = ERRORS.LOGIN_FORM.INCORRECT_AUTH_DATA;
				}
				else
				{
					if(authService.currentUser && authService.currentUser.currentLanguage){
						$translate.use(authService.currentUser.currentLanguage);
					}	
					$state.go('operational.home.search.list');
				}
			})
			.catch(function(response) {
				$scope.incorrectAuthData = true;
				$scope.loginFormErrorMessage = ERRORS.LOGIN_FORM.INCORRECT_AUTH_DATA;
			});
	};

	/**
	 * Check auth status and if it's true -- go to the home screen
	 */
	function checkAccessibility() {
		authService.authCheck()
			.then(function() {
				$state.go('operational.home.search.list');
			});
	}

	// Set current user data or go to login
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		checkAccessibility();
	});

	checkAccessibility();

};

module.exports = loginController;