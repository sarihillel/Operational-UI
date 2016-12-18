'use strict';

var transactionBillingController = function ($log, $scope, $filter, $stateParams, transactionsService, ouTabsService, uiGridTreeBaseService, TRANSACTION_TABS_INFO, transactionBillingViewsService) {

    'ngInject';
    /* ***************************************************
                      VARIABLES
     **************************************************** */
    var vm = this;
    vm.transactionID = $stateParams.transactionID;

    var transactionTab = ouTabsService.getCurrentTab('mainTabs') || {};
    var currentTab = ouTabsService.getCurrentTab('transactionTabs' + vm.transactionID) || {};

    vm.billingInfo = TRANSACTION_TABS_INFO.billing;
    vm.views = vm.billingInfo.views;

    /*****************************************************
   *               METHODS - PRIVATE                   *
   *****************************************************/

    /*
     * @description: fire on init the controller
     */
    var initialize = function () {
        vm.data = currentTab.data = currentTab.data || {};
        if (!vm.data.initData) {
            vm.data.initData = true;
            vm.data.views = transactionBillingViewsService;
            setGridAccontList();

        }
        setGridAccountFunctions();

        _watchTransactionCDM();
    };

    var setGridAccontList = function () {
        vm.data.gridAccountsOptions = {
            rowHeight: 25,
            enableSorting: true,
            enableFiltering: false,
            showTreeExpandNoChildren: true,
            showTreeRowHeader: false,
            treeRowHeaderAlwaysVisible: false,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,
            noUnselect: true,
            modifierKeysToMultiSelect: false,
            enableHorizontalScrollbar: 0,
            isRowSelectable: function (row) {
                return true;
            },
            columnDefs: [
              {
                  name: 'AccountUniqueID',
                  width: '70%',
                  displayName: $filter('translate')('features.transaction.tabs.billing.generalInfo'),
                  cellTemplate: 'ui-grid/treeBaseRowHeaderButtons-withName'
              },
              {
                  name: 'AccountStatus',
                  width: '30%',
                  displayName: $filter('translate')('features.transaction.tabs.billing.accountStatus'),
                  defaultValue: ''
              }
            ],
        };
    };

    /*
     * @description:  set onRegisterApi functions, 
     */
    var setGridAccountFunctions = function () {
        vm.data.gridAccountsOptions.onRegisterApi = function (gridApi) {
            vm.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged(null, function (row) {
                vm.accountSelected = row.entity;
                vm.changeView(vm.views.billingAccount, row.entity);
            });
            gridApi.grid.registerDataChangeCallback(function () {
                vm.gridApi.treeBase.expandAllRows();
            });
            var rowsRenderedoff = gridApi.core.on.rowsRendered(null, function (gridApi) {
                rowsRenderedoff();
                if (angular.isNumber(vm.data.accountSelected))
                    vm.gridApi.selection.selectRow(vm.data.gridAccountsOptions.data[vm.data.accountSelected]);

            });

        }
        vm.data.gridAccountsOptions.appScopeProvider = {
            toggleRow: function (row, evt) {
                uiGridTreeBaseService.toggleRowTreeState(vm.gridApi.grid, row, evt);
            }
        };
    }


    function _watchTransactionCDM() {
        $scope.$watch(function () {
            return transactionTab && transactionTab.data ? transactionTab.data.transactionCDM : null;
        }, function (newData, oldData) {
            if (newData && (oldData != newData || vm.data.transactionCDM != newData)) {
                changedCdm(newData);
            }
        });
    }

    function changedCdm(transactionCDM) {
        vm.data.transactionCDM = transactionCDM;
        _setTreeViewData();
        _manuallySelectGridRow(0);
    }

    function _manuallySelectGridRow(rowNumber) {
        if (vm.data.gridAccountsOptions.data &&
            rowNumber < vm.data.gridAccountsOptions.data.length) {

            vm.gridApi.grid.modifyRows(vm.data.gridAccountsOptions.data);
            vm.gridApi.selection.selectRow(vm.data.gridAccountsOptions.data[rowNumber]);
        }
    }

    function _setTreeViewData() {
        vm.data.BillingData = _.concat(transactionTab.data.transactionCDM.BillingAccount || []);
        _.forEach(vm.data.BillingData, function (obj) {
            obj.S_CustomerID = transactionTab.data.transactionCDM.Info.S_CustomerID;
            obj.AccountUniqueID = obj.PersonalDetails.FirstName + ' ' + obj.PersonalDetails.LastName;
        });

        vm.data.gridAccountsOptions.data = vm.data.BillingData;
    }

    function _removeSelectedAccounts() {
        if (vm.gridApi) {
            vm.gridApi.selection.clearSelectedRows();
            delete vm.accountSelected;
        }
    }

    function getViewTitle(billAccount) {
        return $filter('translate')('features.transaction.tabs.Billing.billingAccount') + ': '
        + billAccount.PersonalDetails.FirstName + ' ' + billAccount.PersonalDetails.LastName +
        ' (' + billAccount.S_AccountID + ')';
    }


    /*****************************************************
     *                  METHODS                          *
     *****************************************************/
    vm.changeView = function (type, entity) {
        vm.data.currentView = {
            type: type,
            data: entity,
            view: vm.data.views[type].viewDetails,
            title: getViewTitle(entity)
        };

        $scope.$emit('transaction:viewChange', vm.data.currentView);
    }


    /*****************************************************
     *                  EXECUTIONS                       *
     *****************************************************/
    initialize();
    $scope.$on('$destroy', function () {
        vm.data.accountSelected = _.indexOf(vm.data.gridAccountsOptions.data, vm.accountSelected);
    })

};

module.exports = transactionBillingController;