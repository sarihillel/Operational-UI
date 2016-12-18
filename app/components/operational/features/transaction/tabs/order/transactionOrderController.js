'use strict';

var transactionOrderController = function ($log, $scope, $filter, $stateParams, transactionsService, ouTabsService, uiGridTreeBaseService, TRANSACTION_TABS_INFO, transactionOrderViewsService,Helper) {

    'ngInject';
    /* ***************************************************
                      VARIABLES
     **************************************************** */
    var vm = this;
    vm.transactionID = $stateParams.transactionID;

    var currentTab = ouTabsService.getCurrentTab('transactionTabs' + vm.transactionID) || {};
    var transactionTab = ouTabsService.getCurrentTab('mainTabs') || {};

    vm.viewsInfo = TRANSACTION_TABS_INFO.order.views;

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
            vm.data.views = transactionOrderViewsService;
            setGridSource();
            setGridTarget();
        }
        setGridSourceFunctions();
        setGridTargetFunctions();

        _watchTransactionCDM();

        _selectGeneralDefualt();
    };

    function _selectGeneralDefualt() {
        if (vm.data.currentView && vm.data.currentView.type == vm.viewsInfo.general)
            vm.changeView(vm.viewsInfo.general, null);
    }

    /*
     * @description: watch parent transactionCDM to fill the order grid 
     */
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
        //refresh general details view
        vm.changeView(vm.viewsInfo.general, null);
    }

    var setGridSource = function () {
        vm.data.gridSourceOptions = {
            rowHeight: 25,
            enableSorting: true,
            enableColumnMenus: false,
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
            columnDefs: [
               {
                   headerCellClass: 'ProductUniqueCodeHeader',
                   name: 'ProductUniqueCode',
                   width: '70%',
                   displayName: $filter('translate')('features.transaction.tabs.order.sourceName'),
                   cellTemplate: 'ui-grid/treeBaseRowHeaderButtons-withName-error'
               },
               {
                   name: 'Status',
                   width: '30%',
                   displayName: $filter('translate')('features.transaction.tabs.order.statusName'),
                   defaultValue: ''
               },
            ],
            isRowSelectable: function (row) {
                //products not selectable
                return row.entity.$$treeLevel !== 0;
            },
        };
    };

    /*
     * @description:  set onRegisterApi functions, 
     * @remarks: separated from setGridSource() due to error that vm didn't refresh in moving between tabs (vm pointed to the old vm...)
     */
    var setGridSourceFunctions = function () {
        vm.data.gridSourceOptions.onRegisterApi = function (gridApi) {
            vm.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged(null, function (row) {
                var type = row.entity.$$viewType || vm.viewsInfo.sourceProduct; //row.entity.$$treeLevel ? vm.viewsInfo.sourceProduct : vm.viewsInfo.sourceOrder;
                vm.sourceSelected = row.entity;
                vm.changeView(type, row.entity);
            });
            gridApi.grid.registerDataChangeCallback(function () {
                vm.gridApi.treeBase.expandAllRows();
                _setTreeErrors(gridApi.grid.treeBase.tree);
            });
            var rowsRenderedoff = gridApi.core.on.rowsRendered(null, function (gridApi) {
                rowsRenderedoff();
                if (angular.isNumber(vm.data.sourceSelected) && vm.data.sourceSelected > -1)
                    vm.gridApi.selection.selectRow(vm.data.gridSourceOptions.data[vm.data.sourceSelected]);

            })
        }
        vm.data.gridSourceOptions.appScopeProvider = {
            toggleRow: function (row, evt) {
                uiGridTreeBaseService.toggleRowTreeState(vm.gridApi.grid, row, evt);
            },
            showErrors: function () {
                return vm.data.isSourceError;
            },
            showTargetErrors: function () {
                return vm.data.isSourceTargetError;
            },
        };
    }

    var setGridTarget = function () {
        vm.data.gridTargetOptions = {
            rowHeight: 25,
            enableSorting: true,
            enableColumnMenus: false,
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
            //isRowSelectable: function (row) {
            //    // every row that has an entity with the name "Grid" is selectable
            //    //return row.entity.$$treeLevel !== 0;
            //},
            columnDefs: [
              {
                  headerCellClass: 'T_ProductUniqueCode',
                  name: 'T_ProductUniqueCode',
                  width: '70%',
                  displayName: $filter('translate')('features.transaction.tabs.order.targetName'),
                  cellTemplate: 'ui-grid/treeBaseRowHeaderButtons-withName-error'
              },
               {
                   name: 'Status',
                   width: '30%',
                   displayName: $filter('translate')('features.transaction.tabs.order.statusName'),
                   defaultValue: 'New'
               },
            ],
        };
    }
    var setGridTargetFunctions = function () {
        vm.data.gridTargetOptions.onRegisterApi = function (gridApi) {
            vm.gridTargetApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                var type = row.entity.$$treeLevel ? vm.viewsInfo.targetProduct : vm.viewsInfo.targetOrder;
                vm.targetSelected = row.entity;
                vm.changeView(type, row.entity)
            });
            gridApi.grid.registerDataChangeCallback(function () {
                gridApi.treeBase.expandAllRows();
                var errors = _setTreeErrors(gridApi.grid.treeBase.tree);
                _setIsTargetError(errors);
            });
            var rowsRenderedoff = gridApi.core.on.rowsRendered(null, function (gridApi) {
                rowsRenderedoff();
                if (angular.isNumber(vm.data.targetSelected) && vm.data.targetSelected > -1) {
                    gridApi.selection.selectRow(vm.data.gridTargetOptions.data[vm.data.targetSelected]);
                }
            });

        }
        vm.data.gridTargetOptions.appScopeProvider = {
            toggleRow: function (row, evt) {
                uiGridTreeBaseService.toggleRowTreeState(vm.gridTargetApi.grid, row, evt);
            },
            //flaf if keep place to the error icon or not
            showErrors: function () {
                return vm.data.isTargetError;
            },
            //flaf if keep place to the target error icon or not
            showTargetErrors: function () {
                return false;
            },
        };
    }

    /*
     * @description: get tree of grid and sets '$$hasError' to the parents of row with error
     * @param: tree {tree of ui-grid treebase}
     * @returns number of errors
     */
    function _setTreeErrors(tree) {
        var Errors = 0;
        _.forEach(tree, function (treeRow) {
            var errorsToTree = _setTreeErrors(treeRow.children);
            if (treeRow.row.entity.$$isTargetError) errorsToTree++;

            if (treeRow.row.entity.$$isError) errorsToTree++;
            else treeRow.row.entity.$$hasError = errorsToTree > 0;

            Errors += errorsToTree;
        });
        return Errors;
    }

    function _setIsTargetError(numTargetError) {
        vm.data.isTargetError = numTargetError > 0;
    }

    /*
     * @description: sets flag if there is  error in tree and how much
     * @param:{numErrors} number of errors in source
     * @param:{numTargetErrorInSource} number of rows of source who has target error(not number target error)
     * @param: {allTargetError} number of all rows with error of target
     */
    function _setIsError(numSourceErrors, numTargetErrorInSource, allTargetError) {
        vm.data.isSourceError = numSourceErrors > 0 || numTargetErrorInSource > 0;
        vm.data.isSourceTargetError = numTargetErrorInSource > 0;
        transactionTab.data.isError = numSourceErrors || allTargetError;
        currentTab.isTriangle = numSourceErrors || allTargetError;
        currentTab.numberTriangle = numSourceErrors + allTargetError;
    }

    function isErrorRow(row) {
        row.Attributes = row.Attributes || {};
        return row.Attributes.ErrorCode && _.trim(row.Attributes.ErrorCode) != '';
    }

    function _setTreeViewData() {
        vm.data.targetTreeViewData = _getTargetTreeView();
        //vm.data.gridTargetOptions.data = vm.data.targetTreeViewData;
        vm.data.gridSourceOptions.data = _getSourcetDataTreeView();
    }

    function _getTargetTreeView() {
        var TargetData = [];
        var data = _.concat(vm.data.transactionCDM.Order.TargetOrder || []);

        _.forEach(data, function (obj) {
            var TargetErrors = 0;
            var productsList = Helper.sortArrayLikeInTreeOrder(_.concat(obj.Product || []), "ProductID", "ParentProductID", 1,
                 function () {
                     //set row.$$isError
                     if (this.data.$$isError = isErrorRow(this.data))
                         TargetErrors++;
                 });
            obj.T_ProductUniqueCode = obj.Name
            obj.$$treeLevel = 0;
            obj.$$hasError = (TargetErrors > 0);
            TargetData.push(obj);
            TargetData = _.concat(TargetData, productsList);
        });
        return TargetData;
    }

    function _getSourcetDataTreeView() {
        var SourceErrors = 0;
        var TargetErrors = 0;
        var titleKey = "ProductUniqueCode";
        var productsData=_.concat(vm.data.transactionCDM.Order.Product || [])
        var SourcetData =
            Helper.sortArrayLikeInTreeOrder(productsData, "ProductID", "ParentProductID", 1,
                                        //set $$targetData, $$isTargetError, $$isError to every row
                                        function () {
                                            var row = this.data;
                                            row.$$targetData = _getTargetDataToRow(row);
                                            if (_.findIndex(row.$$targetData, ['$$isError', true]) >= 0) {
                                                row.$$isTargetError = true;
                                                TargetErrors++;
                                            }
                                            if (isErrorRow(row)) {
                                                row.$$isError = true;
                                                SourceErrors++;
                                            }
                                        });

        var title=_setTitleOfTree(titleKey, "features.transaction.tabs.order.views.ProductsTreeTitle")
        SourcetData.unshift(title);

        var allTargetError = _.filter(vm.data.targetTreeViewData, ['$$isError', true]).length;
        _setIsError(SourceErrors, TargetErrors, allTargetError);

        //add protion data to tree
        var PortingData = _getPortingInfo(titleKey);
        SourcetData = _.concat(SourcetData, PortingData);

        return SourcetData;
    }

    function _getPortingInfo(titleKey) {
        var PortingData = _.concat(vm.data.transactionCDM.Order.PortingInfo || []);

        _.forEach(PortingData, function (data) {
            data[titleKey] = data.CarrierID;
            data.$$treeLevel = 1;
            data.$$viewType = vm.viewsInfo.portingInfo
        });
        if (PortingData.length) 
            PortingData.unshift(_setTitleOfTree(titleKey, "features.transaction.tabs.order.views.PortingInfoTreeTitle"));
        
        return PortingData;
    }

    function _getTargetDataToRow(row) {
        return _.filter(vm.data.targetTreeViewData, function (targetProduct) {
            if (targetProduct.$$treeLevel == 0)
                return true;
            else
                return _.indexOf(_.concat(targetProduct.ProductUniqueCode || []), row.ProductUniqueCode) >= 0
        });
    }

    function _refreshTargetData(row) {
        if (!row) {
            vm.data.gridTargetOptions.data = vm.data.targetTreeViewData;
        }
        else {
            var targetData;
            vm.data.gridTargetOptions.data = row.$$targetData;
        }
    }

    function _removeSelectedTarget() {
        if (vm.gridTargetApi) {
            vm.gridTargetApi.selection.clearSelectedRows()
            delete vm.targetSelected;
        }
    }

    function _removeSelectedSource() {
        if (vm.gridApi) {
            vm.gridApi.selection.clearSelectedRows();
            delete vm.sourceSelected;
        }
    }

    function _setTitleOfTree(titleKey, name) {
        var title = { $$treeLevel: 0, notSelectable: true };
        title[titleKey] = $filter('translate')(name);
        return title;
    }
    /*
       * @description: set data on vm.data from currentTab.data
       * to save the data globaly between the tabs
       */
    function getTitleByType(product, type) {
        switch (type) {
            case vm.viewsInfo.general:
                return $filter('translate')(vm.data.views.general.title);
            case vm.viewsInfo.sourceProduct:
                return product.ProductUniqueCode + ' - ' +
                    $filter('translate')(vm.data.views.sourceProduct.title) + ': ' +
                    product.ProductID;
            case vm.viewsInfo.portingInfo:
                return $filter('translate')(vm.data.views.portingInfo.title) + ': ' +
                    product.CarrierID;
            case vm.viewsInfo.targetOrder:
                return product.Name + ' - ' +
                    $filter('translate')(vm.data.views.targetOrder.title);
                return product.Name;
            case vm.viewsInfo.targetProduct:
                return product.T_ProductUniqueCode + ' - ' +
                    $filter('translate')(vm.data.views.targetProduct.title) + ': ' +
                    product.ProductID;
        }
        return '';
    }

    /*
   * @description:get data of view according to screenType and ProductID
   * @param: {screenType} ,{ProductID}
   */
    function getDataOfType(screenType, product) {
        switch (screenType) {
            case vm.viewsInfo.general:
                return vm.data.transactionCDM;
            case vm.viewsInfo.sourceProduct:
                return _.filter(vm.data.transactionCDM.Order.Product, { ProductID: product.ProductID })[0];
            case vm.viewsInfo.portingInfo:
                return _.filter(vm.data.transactionCDM.Order.PortingInfo, { CarrierID: product.CarrierID })[0];
            case vm.viewsInfo.targetOrder:
                return _.filter(vm.data.transactionCDM.Order.TargetOrder, { Name: product.Name })[0];
            case vm.viewsInfo.targetProduct:
                var products = _.flatMap(vm.data.transactionCDM.Order.TargetOrder, 'Product');
                return _.filter(products, { ProductID: product.ProductID })[0];
        }
        return {};
    }

   
    /*****************************************************
     *                  METHODS                          *
     *****************************************************/
    vm.changeView = function (type, entity) {
        var ProductID = entity ? entity.ProductID : 0;
        if (type == vm.viewsInfo.general) {
            _removeSelectedTarget();
            _removeSelectedSource();
            _refreshTargetData();
        }
        else if (type == vm.viewsInfo.sourceProduct ||
                   type == vm.viewsInfo.portingInfo) {
            _removeSelectedTarget();
            _refreshTargetData(entity);
        }
        vm.data.currentView = {
            type: type,
            data: entity? entity : vm.data.transactionCDM,
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
        //save the row selected to the moving between tabs
        vm.data.sourceSelected = _.indexOf(vm.data.gridSourceOptions.data, vm.sourceSelected);
        vm.data.targetSelected = _.indexOf(vm.data.gridTargetOptions.data, vm.targetSelected);
    });


};

module.exports = transactionOrderController;