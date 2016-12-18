'use strict';

var transactionCustomerController = function ($log, $scope, $filter, $stateParams, transactionsService, ouTabsService, uiGridTreeBaseService, TRANSACTION_TABS_INFO, transactionCustomerViewsService) {

    'ngInject';
    /* ***************************************************
                      VARIABLES
     **************************************************** */
    var vm = this;
    vm.transactionID = $stateParams.transactionID;

    var currentTab = ouTabsService.getCurrentTab('transactionTabs' + vm.transactionID) || {};
    var transactionTab = ouTabsService.getCurrentTab('mainTabs') || {};

    vm.customerInfo = TRANSACTION_TABS_INFO.customer;
    vm.views = vm.customerInfo.views;

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
            vm.data.views = transactionCustomerViewsService;
            setGridCustomer();
        }
        setGridCustomerFunctions();
        _watchTransactionCDM()
        _selectCustomerDefualt();
    };

    function _selectCustomerDefualt() {
        if (vm.data.currentView && vm.data.currentView.type == vm.views.customer)
            vm.changeView(vm.views.customer, vm.data.gridOptions.data[0]);
    }

    var setGridCustomer = function () {
        vm.data.gridOptions = {
            rowHeight: 25,
            enableSorting: true,
            enableFiltering: false,
            showTreeExpandNoChildren: false,
            showTreeRowHeader: false,
            treeRowHeaderAlwaysVisible: false,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,
            noUnselect: true,
            modifierKeysToMultiSelect: false,
            enableHorizontalScrollbar: 0,
            isRowSelectable: function (row) {
                // every row that has an entity with the name "Grid" is selectable
                return row.entity.$$treeLevel !== 1;
            },
            columnDefs: [
              {
                  name: 'name',
                  width: '70%',
                  displayName: 'General Info',
                  cellTemplate: 'ui-grid/treeBaseRowHeaderButtons-withName'
              },
               {
                   name: 'status',
                   width: '30%',
                   displayName: $filter('translate')('features.transaction.tabs.order.statusName'),
                   defaultValue: ''
               },
            ],
        };
    };

    /*
     * @description:  set onRegisterApi functions, 
     * @remarks: separated from setGridCustomer() due to error that vm didn't refresh in moving between tabs (vm pointed to the old vm...)
     */
    var setGridCustomerFunctions = function () {
        vm.data.gridOptions.onRegisterApi = function (gridApi) {
            vm.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged(null, function (row) {
                vm.itemSelected = row.entity;
                vm.changeView(row.entity.$$type, row.entity);
            });
            gridApi.grid.registerDataChangeCallback(function () {
                vm.gridApi.treeBase.expandAllRows();
            });
            var rowsRenderedoff = gridApi.core.on.rowsRendered(null, function (gridApi) {
                rowsRenderedoff();
                if (angular.isNumber(vm.data.itemSelected))
                    vm.gridApi.selection.selectRow(vm.data.gridOptions.data[vm.data.itemSelected]);

            })
        }
        vm.data.gridOptions.appScopeProvider = {
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

        //refresh customer details view
        vm.changeView(vm.views.customer, vm.data.gridOptions.data[0]);
        _manuallySelectGridRow(0);
    }

    function _manuallySelectGridRow(rowNumber) {
        if (vm.data.gridOptions.data &&
            rowNumber < vm.data.gridOptions.data.length) {

            vm.gridApi.grid.modifyRows(vm.data.gridOptions.data);
            vm.gridApi.selection.selectRow(vm.data.gridOptions.data[rowNumber]);
        }
    }

    /*
     * @description: get tree of grid and sets hasError to the parents of row with error
     * @param: tree {tree of ui-grid treebase}
     */
    function _setTreeViewData() {
        var data = vm.data.transactionCDM.Customer;
        vm.data.gridOptions.data = getCustomerData(data, 0);
    }

    function getCustomerData(data, level) {
        var tree = _.concat([{
            name: "Customer Details: " + data.S_CustomerID,
            status: data.CustomerStatus,
            $$treeLevel: level,
            $$type: vm.views.customer,
            $$data: data
        }]);
        if (data.Contact) {
            tree = _.concat(tree, getTreeDataParent("Contacts", level + 1));
            tree = _.concat(tree, getTreeDataArray(_.concat(data.Contact) || [], "S_ContactID", level + 2, vm.views.contact));
        }
        if (data.Location) {
            tree = _.concat(tree, getTreeDataParent("Locations", level + 1));
            tree = _.concat(tree, getTreeDataArray(_.concat(data.Location) || [], "Name", level + 2, vm.views.location));
        }
        if (data.Subscriber) {
            tree = _.concat(tree, getTreeDataParent("Subscribers", level + 1));
            tree = _.concat(tree, getTreeDataArray(_.concat(data.Subscriber) || [], "S_SubscriberID", level + 2, vm.views.subscriber));
        }
        //if (data.Contract) {
        //    tree = _.concat(tree, getTreeDataParent("Contracts", level + 1));
        //    tree = _.concat(tree, getTreeDataArray(_.concat(data.Contract) || [], "ContractID", level + 2, vm.views.contract));
        //}
        if (data.Customer) {
            tree = _.concat(tree, getTreeDataParent("Customers", level + 1));
            _.forEach(_.concat(data.Customer) || [], function (customer) {
                tree = _.concat(tree, getCustomerData(customer, level + 2));
            });
        }
        return tree;
    }

    function getTreeDataArray(obj, keyField, level, type) {
        return _.map(obj, function (item) {
            return {
                name: item[keyField],
                $$treeLevel: level,
                $$type: type,
                $$data: item
            };
        });
    }

    function getTreeDataParent(parentName, level) {
        return {
            name: parentName,
            $$treeLevel: level,
            notSelectable: true
        };
    }

    function getTitleByType(entity, type) {
        switch (type) {
            case vm.views.customer:
                return entity.name;
            case vm.views.contact:
                return $filter('translate')(vm.data.views.contact.title) + ': ' + entity.name;
            case vm.views.location:
                return $filter('translate')(vm.data.views.location.title) + ': ' + entity.name;
            case vm.views.subscriber:
                return $filter('translate')(vm.data.views.subscriber.title) + ': ' + entity.name;
            case vm.views.contract:
                return $filter('translate')(vm.data.views.contract.title) + ': ' + entity.name;
        }
        return '';
    }

    /*****************************************************
     *                  METHODS                          *
     *****************************************************/
    vm.changeView = function (type, entity) {
        var ProductID = entity ? entity.ProductID : 0;
        vm.data.currentView = {
            type: type,
            data: entity.$$data,
            view: vm.data.views[type].viewDetails,
            title: getTitleByType(entity, type)
        };
        $scope.$emit('transaction:viewChange', vm.data.currentView);
    }

    /*****************************************************
     *                  EXECUTIONS                       *
     *****************************************************/
    initialize();

    $scope.$on('$destroy', function () {
        vm.data.itemSelected = _.indexOf(vm.data.gridOptions.data, vm.itemSelected);
    });

};

module.exports = transactionCustomerController;