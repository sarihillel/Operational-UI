'use strict';

var transactionController = function ($log, toaster, $filter, $scope, $stateParams, $q, transactionsService, ouTabsService, TRANSACTION_TABS_INFO, ouDynamicFormGroupService) {
    'ngInject';

    /* ***************************************************
                      VARIABLES
     **************************************************** */
    var vm = this;
    var currentTab = ouTabsService.getCurrentTab('mainTabs') || {};

    var specialGrids = ['BillingAccountRef', 'Order.BillingAccountRef', 'Role', 'ContractRef'];

    vm.dropDownVisible = false;
    vm.transactionID = $stateParams.transactionID;
    vm.tabsOptions = {
        defualtTabs: [
            {
                heading: 'Order',
                route: 'operational.home.search.transaction.order',
                params: {
                    transactionID: vm.transactionID
                }
            },
            {
                heading: 'Customer',
                route: 'operational.home.search.transaction.customer',
                params: {
                    transactionID: vm.transactionID
                }
            },
            {
                heading: 'Billing',
                route: 'operational.home.search.transaction.billing',
                params: {
                    transactionID: vm.transactionID
                }
            },
            {
                heading: 'Memo',
                route: 'operational.home.search.transaction.memo',
                params: {
                    transactionID: vm.transactionID
                }
            },
            {
                heading: 'General Request',
                route: 'operational.home.search.transaction.generalRequest',
                params: {
                    transactionID: vm.transactionID
                }
            }
        ],
        tabListName: 'transactionTabs' + vm.transactionID,
        limitTo: 5,
        //not to remove tab in small screen
        limitToSmallScreen:0
    };

    //options how to view form details
    vm.optionsView = {
        chunkGroups: 1,
        chunkFields: 2,
        cssForm: 'form-view'
    };

    $scope.$on('transaction:viewChange', function (event, data) {
        _updateTransactionData();
        _changeView(data);
    });

    $scope.$on('$destroy', function (event, data) {
        _updateTransactionData();
    });


    /*****************************************************
    *               METHODS - PRIVATE                   *
    *****************************************************/
    var initialize = function () {
        //set data on vm.data from currentTab.data to save the data globaly between the tabs
        vm.data = currentTab.data = currentTab.data || {};
        if (!vm.data.initData) {
            vm.data.initData = true;
            vm.data.tabsInfo = TRANSACTION_TABS_INFO
            //set vm.data.transactionCDM
            _loadTransactionCDM(vm.transactionID);
        }
    };

    /*
     * @description:set vm.data.transactionCDM from the server
     * @param: {transactionID} 
     */
    function _loadTransactionCDM() {
        return transactionsService.getCDMData(vm.transactionID).then(function (data) {
            delete vm.data.currentView;
            vm.data.transactionCDM = data;
            // $scope.$broadcast('transaction:dataChanged', vm.data.transactionCDM);
        });
    }

    function _saveTransactionCDM() {
        _updateTransactionData();
        var transactionCDM = vm.data.transactionCDM;
        return transactionsService.saveCDMData(transactionCDM);
    }

    /*
    * @description: execute on over tab - update transaction data with current view data
    */
    function _updateTransactionData() {
        //prevent update in the first loading 
        if (vm.data.currentView) {
            var data = vm.data.currentView.data;
            var view = vm.data.currentView.view;

            ouDynamicFormGroupService.setDataValues(data, view, _getGridData)
        }
    }

    function _changeView(data) {
        vm.data.currentView = data;
        ouDynamicFormGroupService.setGroupsValues(data.data, data.view, _setGridData);
    }

    /*
     * @description: set grid data in view
     */
    function _setGridData(gridName, data) {
        if (specialGrids.indexOf(gridName) > -1) {
            var gridData = [];
            _.forEach(data, function (item) {
                gridData.push({ References: item });
            });
            return gridData;
        }
        return _.concat(data || []);
    }

    /*
    * @description: get grid data from view
    */
    function _getGridData(gridName, data) {
        if (specialGrids.indexOf(gridName) > -1) {
            var gridData = [];
            angular.forEach(data, function (item) {
                gridData.push(item.References);
            });
            return gridData;
        }
        return data;
    }

    /*****************************************************
    *                  METHODS                          *
    *****************************************************/

    vm.reloadData = function () {
        _loadTransactionCDM();
    }
    vm.saveData = function () {
        _saveTransactionCDM().then(function () {
            toaster.success('Save transaction', 'Transaction ' + vm.transactionID + ' was saved successfully')
            //_loadTransactionCDM();
        });
    }

    /*****************************************************
     *                  EXECUTIONS                       *
     *****************************************************/
    initialize();

};

module.exports = transactionController;