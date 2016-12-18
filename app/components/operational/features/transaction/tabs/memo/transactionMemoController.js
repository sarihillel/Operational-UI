'use strict';

var transactionMemoController = function ($log, $scope, $filter, $stateParams, transactionsService, ouTabsService, TRANSACTION_TABS_INFO, transactionMemoViewsService) {

    'ngInject';
    /* ***************************************************
                      VARIABLES
     **************************************************** */
    var vm = this;
    vm.transactionID = $stateParams.transactionID;

    var currentTab = ouTabsService.getCurrentTab('transactionTabs' + vm.transactionID) || {};
    var transactionTab = ouTabsService.getCurrentTab('mainTabs') || {};

    vm.memoInfo = TRANSACTION_TABS_INFO.memo;
    vm.views = vm.memoInfo.views;

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
            vm.data.views = transactionMemoViewsService;
            setGridMemo();
        }
        setGridMemoFunctions();
        _watchTransactionCDM()
        _selectMemoDefualt();
    };


    function _selectMemoDefualt() {
        if (vm.data.currentView && vm.data.currentView.type == vm.views.memo)
            vm.changeView(vm.views.memo, vm.data.gridOptions.data[0]);

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
        //refresh view
        vm.changeView(vm.views.memo, vm.data.gridOptions.data[0]);
        _manuallySelectGridRow(0);
    }

    function _manuallySelectGridRow(rowNumber) {
        if (vm.data.gridOptions.data &&
            rowNumber < vm.data.gridOptions.data.length) {

            vm.gridApi.grid.modifyRows(vm.data.gridOptions.data);
            vm.gridApi.selection.selectRow(vm.data.gridOptions.data[rowNumber]);
        }
    }

    function _setTreeViewData() {
        var data = vm.data.transactionCDM.Memo;
        vm.data.gridOptions.data = _.concat(vm.data.transactionCDM.Memo || []);
    }

    var setGridMemo = function () {
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
                  name: 'MemoID',
                  width: '70%',
                  displayName: $filter('translate')('features.transaction.tabs.memo.fields.memoID'),
                  cellTemplate: 'ui-grid/treeBaseRowHeaderButtons-withName'
              },
               {
                   name: 'MemoStatus',
                   width: '30%',
                   displayName: $filter('translate')('features.transaction.tabs.order.statusName'),
                   defaultValue: ''
               },
            ],
        };
    };

    var setGridMemoFunctions = function () {
        vm.data.gridOptions.onRegisterApi = function (gridApi) {
            vm.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged(null, function (row) {
                vm.itemSelected = row.entity;
                vm.changeView(vm.views.memo, row.entity);
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

    /*****************************************************
     *                  METHODS                          *
     *****************************************************/
    vm.changeView = function (type, entity) {
        vm.data.currentView = {
            type: type,
            data: entity,
            view: vm.data.views[type].viewDetails,
            title: $filter('translate')(vm.data.views.memo.title)
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

module.exports = transactionMemoController;