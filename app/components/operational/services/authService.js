'use strict';
var authService = function($rootScope, $resource, $q, $http, localStorageService, $timeout) {
	'ngInject';

	var ACCESS_TOKEN_KEY = 'access_token';

	var resource = $resource('/rest/auth', {},
		{
			doLogin: {
				method:'POST',
				url: '/rest/users/login',
				isArray: false
			},
			token: {
				method:'GET',
				url: '/rest/users/token',
				isArray: false,
				suppressErrors: true
			}
		}
	);

	// Storing current user's data
	resource.currentUser = null;

	// Storing result of authentication
	resource.authStatus = null;

	resource.setCurrentLanguage = function(language){
		resource.currentUser.currentLanguage = language;
	}


	/**
	 * Set access header for all future requests
	 *
	 * @param {string|undefined|null} token
	 */
	function setAccessHeader(token) {
		if (token) {
			$http.defaults.headers.common.Authorization = 'Bearer ' + token;
		}else {
			delete $http.defaults.headers.common.Authorization;
		}

	}

	// jscs:disable
	/**
	 * Try to store auth data
	 *
	 * @param {object} response
	 * @returns {Promise}
	 */
	function storeAuthResult(response) {
		if (response.$resolved && response.access_token) {
			setAccessHeader(response.access_token);

			resource.currentUser = {
				id: response.id,
				name: response.name,
				currentLanguage: response.defaultLanguage
			};

			localStorageService.set(ACCESS_TOKEN_KEY, response.access_token);

			return $q.resolve();
		} else {
			return $q.reject();
		}
	}
	// jscs:enable


	/**
	 * Renew token
	 *
	 * @returns {Promise}
	 */
	function renewToken(authData) {
		resource.authStatus = false;
		if(authData && authData.ticket){
			localStorageService.set(ACCESS_TOKEN_KEY, authData.ticket);
		}
		// #9120
		// If we have token already -- pass it into header
		setAccessHeader(localStorageService.get(ACCESS_TOKEN_KEY));

		return resource.token().$promise.then(function(response) {
			return storeAuthResult(response);
		}).then(function() {
			resource.authStatus = true;
		});
	}


	/**
	 * Login method
	 *
	 * @param {object} authData
	 * @returns {Promise}
	 */
	resource.login = function(authData) {
		return resource.doLogin(authData).$promise
			.then(function(response) {
				resource.currentUser = response;
				return storeAuthResult(response);
			}).then(function() {
				resource.authStatus = true;
			}).catch(function() {
				resource.authStatus = false;
			});
	};

	/**
	 * Logout method
	 *
	 * @returns {Promise}
	 */
	resource.logout = function() {
		localStorageService.remove(ACCESS_TOKEN_KEY);
		setAccessHeader(undefined);
		resource.authStatus = false;
	};




	var _authCheckTempDeferred = $q.defer();
	var _authCheckInProgress = false;

	/**
	 * Check authentication method
	 *
	 * @returns {Promise}
	 */
	resource.authCheck = function(authData) {

		// If status is already gotten at least one time
		if (resource.authStatus !== null) {
			if (resource.authStatus) {
				return $q.resolve();
			}else {
				return $q.reject();
			}
		}


		// It will return promise and prevent of multiple calling $http
		if (_authCheckInProgress) {
			return _authCheckTempDeferred.promise;
		}
		_authCheckInProgress = true;


		return renewToken(authData).then(function() {
			_authCheckTempDeferred.resolve();
		}).catch(function() {
			_authCheckTempDeferred.reject();
		});
	};

	return resource;
};

module.exports = authService;