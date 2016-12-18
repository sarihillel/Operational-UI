'use strict';

var searchController = function ($scope, $log, ouTabsService, localStorageService, $window) {
    'ngInject';

    /* ***************************************************
                      VARIABLES
     **************************************************** */
    var vm = this;

    vm.tabsOptions = {
        defualtTabs: getDefualtTabs(),
        tabListName: 'mainTabs',
        moveTo: 1
    };
    /*****************************************************
     *               METHODS - PRIVATE                   *
     *****************************************************/


    /*
     * @description: fire on init the controller
     */
    var initialize = function () {

    };

    function getDefualtTabs() {
        var tabs = localStorageService.get('tabs:mainTabs');
        if (tabs)
            return angular.fromJson(tabs);
        else
            return [{
                heading: 'Search',
                route: 'operational.home.search.list'
            }];
    };

    function saveTabs() {
        if (vm.tabsApi) {
            var tabs = vm.tabsApi.getTabsList();
            localStorageService.set('tabs:mainTabs', angular.toJson(tabs));
        }
    }

    /*****************************************************
     *                  METHODS                          *
     *****************************************************/
    vm.getTabApi = function () {
        vm.tabsApi = ouTabsService.findTabListApi('mainTabs');
        $scope.$watchCollection('searchVm.tabsApi.tabs', function (newTabs, oldTabs) {
            saveTabs();
        });
    }

    /*****************************************************
     *                  EXECUTIONS                       *
     *****************************************************/
    initialize();

    
    $scope.$on('$destroy', function () {
        saveTabs();
    })

};

module.exports = searchController;