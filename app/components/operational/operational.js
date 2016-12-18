'use strict';

require('angular');
require('angular-animate');
require('angular-bootstrap');
require('angular-resource');
require('angular-ui-router');
require('angular-local-storage');
require('angular-cache');
require('angular-translate');
require('angular-translate-loader-static-files');
require('api-check');
require('angular-filter');
require('angularjs-toaster');



/**
 * @ngdoc overview
 * @name operational
 *
 * @description
 * The main module of operational app
 */
var operational = angular.module('operational', [
	'ngResource',
	'ui.router',
	'ui.bootstrap',
	'ngAnimate',
	'LocalStorageModule',
	'angular-cache',//?
	'pascalprecht.translate',
	'angular.filter',
	'toaster',
    'ui.grid',
    'ui.grid.edit',
    'ui.grid.rowEdit',
    'ui.grid.cellNav',
    'ui.grid.expandable',
    'ui.grid.resizeColumns',
    'ui.grid.moveColumns',
    'ui.grid.pagination',
    'ui.grid.autoResize',
    'pikaday',
    'angularMoment',
    'base64',
    'ui.grid.treeView',
    'ui.grid.selection',
    'ui.grid.saveState',
    'ui.checkbox'
]);

operational.config(function ($stateProvider, $urlRouterProvider, $translateProvider, $httpProvider, $compileProvider, $rootScopeProvider, STORAGE_TYPES, pikadayConfigProvider, DATE_FORMAT, $sceDelegateProvider, localStorageServiceProvider) {
    'ngInject';

    var DIR = './components/operational/features';
    $translateProvider.useSanitizeValueStrategy(null);
    $translateProvider.useStaticFilesLoader({
        prefix: 'assets/languages/',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
    pikadayConfigProvider.setConfig({ format: DATE_FORMAT.client });

    $stateProvider
		.state('login', {
		    url: '/login',
		    templateUrl: './components/operational/features/login/login.html'
		})
		.state('operational', {
		    abstract: true,
		    url: '?ticket=',
		    template: '<ui-view></ui-view>',
		    controller: 'MainCtrl',
		    resolve: {
		        authCheck: function (authService, $stateParams) {
		            'ngInject';
		            var authData = {
		                ticket: $stateParams.ticket
		            };
		            return authService.authCheck(authData);
		        }
		    }
		})
		.state('operational.home', {
		    url: '/home',
		    templateUrl: DIR + '/home/home.html',
		})
		.state('operational.home.search', {
		    abstract: true,
		    url: '/search',
		    templateUrl: DIR + '/search/search-view.html',
		    controller: 'searchController',
		    controllerAs: 'searchVm',
		})
        .state('operational.home.search.transaction', {
            url: '/transaction/:transactionID',
            templateUrl: DIR + '/transaction/transaction-view.html',
            controller: 'transactionController',
            controllerAs: 'transactionVm',
        })
        .state('operational.home.search.transaction.order', {
            url: '/order',
            templateUrl: DIR + '/transaction/tabs/order/transaction-order-view.html',
            controller: 'transactionOrderController',
            controllerAs: 'transactionOrderVm',
        })
        .state('operational.home.search.transaction.customer', {
            url: '/customer',
            templateUrl: DIR + '/transaction/tabs/customer/transaction-customer-view.html',
            controller: 'transactionCustomerController',
            controllerAs: 'transactionCustomerVm',
        })
        .state('operational.home.search.transaction.billing', {
            url: '/billing',
            templateUrl: DIR + '/transaction/tabs/billing/transaction-billing-view.html',
            controller: 'transactionBillingController',
            controllerAs: 'transactionBillingVm',
        })
        .state('operational.home.search.transaction.memo', {
            url: '/memo',
            templateUrl: DIR + '/transaction/tabs/memo/transaction-memo-view.html',
            controller: 'transactionMemoController',
            controllerAs: 'transactionMemoVm',
        })
        .state('operational.home.search.transaction.generalRequest', {
            url: '/generalRequest',
            templateUrl: DIR + '/transaction/tabs/generalRequest/transaction-general-request-view.html',
            controller: 'transactionGeneralRequestController',
            controllerAs: 'transactionGeneralRequestVm',
        })
        .state('operational.home.search.list', {
            url: '/list',
            templateUrl: DIR + '/searchList/search-list-view.html',
            controller: 'searchListController',
            controllerAs: 'searchListVm',
        })
    	.state('operational.home.task', {
    	    url: '/task',
    	    templateUrl: DIR + '/task/task-view.html',
    	    controller: 'taskListController',
    	    controllerAs: 'taskListVm',
    	});


    $urlRouterProvider.otherwise('/login');

    // #9111 hack
    //$rootScopeProvider.digestTtl(15);

    localStorageServiceProvider
      .setPrefix('ou-operational');
    //.setStorageType('sessionStorage')
    //.setNotify(true, true)
    $compileProvider.debugInfoEnabled(true);
    //TODO: set from webpack the async value
    $httpProvider.useApplyAsync(true);
    $httpProvider.interceptors.push(require('./config/errorInterceptor'));
    $httpProvider.interceptors.push(require('./config/spinnerInterceptor'));
});

operational.run(function (CacheFactory, $rootScope, $state, $translate, HTTP_ERRORS, toaster, DATE_FORMAT, authService) {
    'ngInject';

    CacheFactory.createCache('operationalHttp', {
        maxAge: 10 * 60 * 1000,
        deleteOnExpire: 'aggressive',
        storageMode: 'localStorage',
        disabled: true
    });


    $rootScope.$on('$stateChangeError', function (e, toState, toParams, fromState, fromParams, resolve) {
        if (angular.isObject(resolve) && resolve.type === 'redirect') {
            $state.go(resolve.state.state, resolve.state.stateParams);
            return false;
        }
    });

    $rootScope.$on(HTTP_ERRORS.UNAUTHORIZED, function () {
        authService.logout();
        $state.go('login');
    });

    //$rootScope.$on(HTTP_ERRORS.FORBIDDEN, function (e, error) {
    //});

    //$rootScope.$on(HTTP_ERRORS.BAD_REQUEST, function (e, error) {
    //});

    $rootScope.$on(HTTP_ERRORS.INTERNAL, function (e, error) {
        toaster.error('Server error!', 'please contact help desk.')
    });

});

/**templatesCash**/
operational.run(require('./templates/ui-grid-templates'))
/**end templatesCash**/


/**directives**/
operational.directive('dropdownList', require('./directives/dropdown-list/dropdown-list'));
operational.directive('spinner', require('./directives/spinner/spinner'));
operational.directive('header', require('./directives/header/header'));
operational.directive('sidebar', require('./directives/sidebar/sidebar'));

operational.directive('ngSwitchWhenExp', require('./directives/ng-switch-when-exp/ng-switch-when-exp'));

operational.directive('ouTabs', require('./directives/ou-tabs/ou-tabs'));
operational.directive('ouPopoverList', require('./directives/ou-popover-list/ou-popover-list'));
operational.directive('ouModal', require('./directives/ou-modal/ou-modal'));
operational.directive('ouInputClear', require('./directives/ou-input-clear/ou-input-clear'));
operational.directive('ouInputDate', require('./directives/ou-input-date/ou-input-date'));
operational.directive('ouDynamicFormGroup', require('./directives/ou-dynamic-form-group/ou-dynamic-form-group'));
operational.directive('ouIncludeTemplate', require('./directives/ou-include-template/ou-include-template'));
operational.directive('ouPopover', require('./directives/ou-popover/ou-popover'));
operational.directive('ouInputPhone', require('./directives/ou-input-phone/ou-input-phone'));
operational.directive('ouGridSize', require('./directives/ou-grid-size/ou-grid-size'));
/**end directives**/

/**controllers**/
operational.controller('sidebarController', require('./directives/sidebar/sidebarController'));

operational.controller('ouTabsController', require('./directives/ou-tabs/ouTabsController'));


/**components controllers**/
operational.controller('MainCtrl', require('./features/MainCtrl'));
operational.controller('loginController', require('./features/login/loginController'));
operational.controller('searchController', require('./features/search/searchController'));
operational.controller('searchListController', require('./features/searchList/searchListController'));
operational.controller('transactionController', require('./features/transaction/transactionController'));
operational.controller('transactionOrderController', require('./features/transaction/tabs/order/transactionOrderController'));
operational.controller('transactionCustomerController', require('./features/transaction/tabs/customer/transactionCustomerController'));
operational.controller('transactionMemoController', require('./features/transaction/tabs/memo/transactionMemoController'));
operational.controller('transactionGeneralRequestController', require('./features/transaction/tabs/generalRequest/transactionGeneralRequestController'));
operational.controller('taskListController', require('./features/task/taskListController'));
operational.controller('transactionBillingController', require('./features/transaction/tabs/billing/transactionBillingController'));
/**end components controllers**/

/**end controllers**/

/**services**/
operational.service('localStorage', require('./services/localStorage'));
operational.service('Helper', require('./services/Helper'));
operational.service('authService', require('./services/authService'));

operational.service('transactionsService', require('./services/transactionsServices'));
operational.service('cdmService', require('./services/cdmService'));
operational.service('ouTabsService', require('./directives/ou-tabs/ouTabsService'));
operational.service('ouDynamicFormGroupService', require('./directives/ou-dynamic-form-group/ouDynamicFormGroupService'));

operational.service('searchListFieldsService', require('./features/searchList/searchListFieldsService'));
operational.service('transactionOrderViewsService', require('./features/transaction/tabs/order/transactionOrderViewsService'));
operational.service('transactionCustomerViewsService', require('./features/transaction/tabs/customer/transactionCustomerViewsService'));
operational.service('transactionBillingViewsService', require('./features/transaction/tabs/billing/transactionBillingViewsService'));
operational.service('transactionMemoViewsService', require('./features/transaction/tabs/memo/transactionMemoViewsService'));
operational.service('transactionGeneralRequestViewsService', require('./features/transaction/tabs/generalRequest/transactionGeneralRequestViewsService'));
/**end services**/

/**constants**/
operational.constant('HTTP_ERRORS', require('./constants/HTTP_ERRORS'));
operational.constant('ERRORS', require('./constants/errorConstants'));
operational.constant('STORAGE_TYPES', require('./constants/STORAGE_TYPES'));
operational.constant('config', require('./constants/config'));

operational.constant('DATE_FORMAT', require('./constants/DATE_FORMAT'));
operational.constant('INPUT_TYPES', require('./constants/INPUT_TYPES'));
operational.constant('INPUT_OPTIONS', require('./constants/INPUT_OPTIONS'));
operational.constant('TRANSACTION_TABS_INFO', require('./constants/TRANSACTION_TABS_INFO'));
//operational.constant('angularMomentConfig', {preprocess: 'utc', format: 'YYYYMMDD'});
/**end constants**/

/**filters**/
operational.filter('trustAsResourceUrl', require('./filters/trustAsResourceUrl'));
operational.filter('ouDateFormat', require('./filters/ouDateFormat'));
operational.filter('ouToDate', require('./filters/ouToDate'));
/**end filters**/

module.exports = operational;