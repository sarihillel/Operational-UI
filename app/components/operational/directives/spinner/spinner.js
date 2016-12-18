'use strict';
var spinner = function($rootScope) {
	'ngInject';

	return {
		replace: true,
		templateUrl: './components/operational/directives/spinner/spinner.html',
		link: link,
		scope: {}
	};
	function link($scope) {

		$scope.spinner = {
			isShown: false
		};

		$rootScope.$on('spinner.show', function() {
			$scope.spinner.isShown = true;
		});

		$rootScope.$on('spinner.hide', function() {
			$scope.spinner.isShown = false;
		});

	}
};

module.exports = spinner;