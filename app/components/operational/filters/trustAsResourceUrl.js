'use strict';

var trustAsResourceUrl = function($sce) {
	'ngInject';

	return function(val) {

		  return $sce.trustAsResourceUrl(val);

	};
};

module.exports = trustAsResourceUrl;