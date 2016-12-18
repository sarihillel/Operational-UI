'use strict';
var transactionsServices = function ($resource, $q, CacheFactory) {
    'ngInject';

    var resource = $resource( '/rest/CDM/', {},
		{
		    getTransactions: {
		        method: 'POST',
		        isArray: false,
		        url:  '/rest/CDM/SearchCdm/ ',
		    },
		    getCDM: {
		        method: 'GET',
		        isArray: false,
		        url:  '/rest/CDM/GetCdm/:transactionID',
		    },
		    saveCDM: {
		        method: 'POST',
		        isArray: false,
		        url: 'rest/CDM/UpdateCdm/ ',
		    }
		}
	);
    resource.transactions = [];

    resource.getTransactionsData = function (term) {
        return resource.getTransactions(term)
			.$promise.then(function (response) {
			    resource.transactions = response.data;
			}, function (errorResponse) {
			    resource.transactions = [];
        	});
        //resource.transactions = [{transactionID:_.random(1, 225)}];
        //var deferred = $q.defer();
        //deferred.resolve({});
        //return deferred.promise;
    }

    resource.getCDMData = function (transactionID) {
        var deferred = $q.defer();
        //deferred.resolve({});
        resource.getCDM({ transactionID: transactionID })
             .$promise.then(function (response) {
                 deferred.resolve(response.CDM);
             }, function (error) {
                 deferred.reject(error);
             });

        return deferred.promise;
    }

    resource.saveCDMData = function (transactionCDM) {
        var deferred = $q.defer();
        resource.saveCDM({ CDM: transactionCDM })
             .$promise.then(function (response) {
                 deferred.resolve(true);
             }, function (error) {
                 deferred.reject(false);
             });

        return deferred.promise;
    }
    return resource;

};

module.exports = transactionsServices;