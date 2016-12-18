'use strict';
var ouTabsController = function ($scope, $state,$window, $log, $rootScope, ouTabsService) {
    'ngInject';
    var ctrl = this;
    /* ****************************************************
    *                  VARIABLES                        *
    **************************************************** */
    $scope.options =
                angular.extend({},
                {
                    limitTo: 10,
                    limitToSmallScreen: 3,
                    defualtTabs: [],
                    defualtTabActive: 0,
                    moveTo: 0
                },
                $scope.options || {});

    
    /*****************************************************
     *                  PRIVATE METHODS                  *
     *****************************************************/

    /*
     * @description: init tabs data from options.defualtTabs
     * @event: fire on init ou-tabs directive
     */
    function _initTabsData() {
        if (!$scope.options.tabListName) {
            throw new Error('ouTabs: \'options.tabName\' attribute not defined.');
        }

        if (!$scope.options.defualtTabs) {
            throw new Error('ouTabs: \'options.defualtTabs\' attribute not defined');
        }

        if (!angular.isArray($scope.options.defualtTabs)) {
            throw new Error('ouTabs: \'options.defualtTabs\' attribute must be an array of tab data with at least one tab defined.');
        }
        $scope.rootState = $state.$current.parent.self,
        $scope.TabListApi = ouTabsService.getTabListApi($scope.options.tabListName, $scope.options, $scope.rootState);
        $scope.tabs = $scope.TabListApi.tabs;
        $scope.options.defualtTabs.forEach(function (tab) {
            $scope.TabListApi.addTab(tab);
        });

        $scope.TabListApi.update_tabs();
        ctrl.TabListApi = $scope.TabListApi;
    }


    function updateLimit() {
        var limitTo = 0;
        if ($window.innerWidth < 1400) {
            limitTo = $scope.options.limitTo - $scope.options.limitToSmallScreen;
        }
        else
            limitTo = $scope.options.limitTo;

        $scope.options.limit = limitTo;
    }
    /*
    * @description: fire on init the ou-tabs directive
   */
    var initialize = function () {
        updateLimit();
        _initTabsData();
        if ($scope.options.limitToSmallScreen)
            $window.onresize = function (event) {
                updateLimit();
                // scope.$apply();
            }
    };
    /*****************************************************
     *                  METHODS                          *
     *****************************************************/
  
    /*****************************************************
     *                  EXECUTIONS                       *
     *****************************************************/

    initialize();


};

module.exports = ouTabsController;