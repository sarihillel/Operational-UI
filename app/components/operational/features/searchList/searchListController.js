'use strict';
var searchListController = function ($log, $scope, $timeout, $window, $filter, localStorageService, $state, ouTabsService, transactionsService, Helper, searchListFieldsService, ouDynamicFormGroupService) {
    'ngInject';

    /* ***************************************************
                      VARIABLES
     **************************************************** */
    var tabsApi = ouTabsService.findTabListApi('mainTabs');
    var currentTab = ouTabsService.getCurrentTab('mainTabs') || {};

    var vm = this;

    var transactionGridApi = {};
    var advancedApi = {};


    /*****************************************************
    *               METHODS - PRIVATE                   *
    *****************************************************/
    var initialize = function () {
        // set data on vm.data from currentTab.data to save the data globaly between the tabs
        vm.data = currentTab.data = currentTab.data || {};

        if (!vm.data.initData) {
            vm.data.initData = true;
            _initAdvancedFields();

            /*filters for grid*/
            vm.data.filterData = {
                searchText: '',
                filters: []
            };
            vm.data.showGridData = false;
            _initGridOptions();
        }

        _initGridFunctions();
        _initAdvancedFunctions();
    };


    function _initGridOptions() {
        vm.data.gridOptions = {
            enableSorting: true,
            enableHorizontalScrollbar: 0,
            enableGridMenu: true,
            paginationPageSizes: [25, 50, 75, 100],
            paginationPageSize: 25,
            minRowsToShow: 20,
            RowHeight: 32,
            //data: transactionData,
            columnDefs: [{
                name: "transactionID", type: "numberStr", displayName: "Transaction ID",
                sortingAlgorithm: Helper.sortAlphaNum
                },
                { name: "operationName", type: "string" },
                { name: "sourceCustomerID", type: "numberStr", displayName: "Source Customer ID" },
                { name: "receivedDate", type: "date", cellFilter: 'date:"longDate"' },
                { name: "customerName", type: "string" },
                { name: "customerPhone", type: "string" },
                {
                    name: 'expandableButtons', width: 40,
                    displayName: '',
                    exporterSuppressExport: true,
                    enableColumnResizing: false,
                    enableColumnMenu: false,
                    enableHiding: false,
                    cellTemplate: 'ui-grid/expandableRowHeaderCustom',
                    headerCellTemplate: 'ui-grid/expandableTopRowHeaderCustom'
                },

            ],
            rowTemplate: 'ui-grid/ui-grid-row-custom',
            /*Expandable*/
            //enableVerticalScrollbar :0,
            enableExpandable: true,
            expandableRowTemplate: './components/operational/templates/ui-grid-extend-row-view.html',
            expandableRowHeight: 60,
            enableExpandableRowHeader: false,
            //columnDefs will be available in subGrid scope
            expandableRowScope: {
                columnDefs: [{ field: "sourceSystem", type: "number", displayName: "Source System" },
                { field: "sourceEntityID", displayName: "Source Entity ID", type: "string" },
               // { field: "targetSystem", type: "string", displayName: "Target System" },
                { field: "sourceTransactionID", type: "string", displayName: "Source Transaction ID" },
                { field: "entityType", displayName: "Entity Type", type: "string" },
                { field: "customerDUNSNumber", displayName: "Customer DUNS Number", type: "string" }]
            },
            /*end Expandable*/
        };
    }

    /*
     * @description: to avoid to point at old vm at function ,needs to reinit every initiatin
     */
    function _initGridFunctions() {
        vm.data.gridOptions.onRegisterApi = function (gridApi) {
            transactionGridApi = gridApi;
            //fired on refresh data
            transactionGridApi.core.on.rowsRendered(null, function (gridApi) {
                vm.data.rowsLength = gridApi.grid.rows.length;
            });
            vm.gridApi = gridApi;
            restoreState();
        };
        vm.data.gridOptions.appScopeProvider = {
            onDblClick: onDblClick,
        };
    }

    /*
     * @description: save state of gridOptions
     */
    function saveState() {
        if (vm.gridApi) {
            var state = vm.gridApi.saveState.save();
            vm.data.state = state;
            localStorageService.set('gridState:searchList', angular.toJson(state));
        }
    }

    function restoreState() {
        $timeout(function () {
            var state = {};
            if (vm.data.state)
                state = vm.data.state
            else
                state = localStorageService.get('gridState:searchList');
            if (state) vm.gridApi.saveState.restore($scope, angular.fromJson(state));
        });
    }

    function _initAdvancedFields() {
        /*advanced fields/inputs and data*/
        var groupsFields = searchListFieldsService;

        vm.data.advancedOptions = {
            title: $filter('translate')('features.search.advanced.title'),
            template: '<ou-dynamic-form-group ng-init=\'showModal=true\' groups=\'modalScope.groupsFields\' options=\'modalScope.options\'></ou-dynamic-form-group>',
            showModal: false,
            okButton: $filter('translate')('features.search.buttons.search'),
            modalScope: {
                groupsFields: groupsFields,
                options: {
                    chunkGroups: 2,
                    chunkFields: 1
                }
            },

        };
    }

    function _initAdvancedFunctions() {
        vm.data.advancedOptions.onRegisterApi = function (modalApi) {
            advancedApi = modalApi;
            advancedApi.on.ok(function (data) {
                var filters = ouDynamicFormGroupService.getAllFieldsWithValue(data.modalScope.groupsFields)
                _setAdvancedFilters(filters);
                _refreshData();
            });
        };
    }

    /*
    * @description: set current filters-list 
    * @event: fire on ok modal- search advanced
    * @param: {filtersWithData} 
    */
    function _setAdvancedFilters(filtersWithData) {
        vm.data.filterData.filters = filtersWithData;

        //if filters not empty clean search text
        if (filtersWithData.length) {
            vm.data.filterData.searchText = '';
        }
    }

    /*
    * @description: clear all advanced filters and values
    * @event: on click search and searchText not empty 
    */
    function _removeAllAdvancedfilters() {
        _.forEach(vm.data.filterData.filters, function (filter) {
            ouDynamicFormGroupService.clearFieldValue(filter);
        });
        vm.data.filterData.filters = [];
    }

    /*
    * @description: refesh data by terms, gets data from server side
    */
    function _refreshData() {
        var term = {
            searchText: vm.data.filterData.searchText,
            filters: []
        }
        term.filters = ouDynamicFormGroupService.toDictionary(vm.data.filterData.filters);

        transactionsService.getTransactionsData(term).then(function (response) {
            vm.data.gridOptions.data = transactionsService.transactions;
            vm.data.showGridData = true;
        });

    };

    /*
    //for test if all is from databse..not in use
    function checkDataDefs() {
        var colomunsNames = _.map(vm.data.gridOptions.columnDefs, 'name');
        colomunsNames = _.concat(colomunsNames, _.map(vm.data.gridOptions.expandableRowScope.columnDefs, 'field'));
        _.pull(colomunsNames, 'expandableButtons');

        var keysOfFirstRow = _.keys(vm.data.gridOptions.data[0]);
        var difference = _.difference(colomunsNames, keysOfFirstRow);
        $log.debug('difference:', difference, keysOfFirstRow);
    }*/

    /*
     * @description: redirect to transaction tab
     * @event: dblClick in row of grid
     * @param: {row} ui-grid row data
     */
    function onDblClick(row) {
        var tab = {
            heading: _.trim((row.entity.operationName || '') + ' ' + row.entity.transactionID.toString()),
            route: 'operational.home.search.transaction',
            params: { transactionID: row.entity.transactionID.toString() },
            isClose: true
        };

        tabsApi.addTab(tab);
        $state.go(tab.route, tab.params);
    };

    /*****************************************************
     *                  METHODS                          *
     *****************************************************/

    /*
     * @description: search by searchText
     * @event: on click search in search section
     */
    vm.searchData = function () {
        //clear the other filters
        if (vm.data.filterData.searchText)
            _removeAllAdvancedfilters();

        _refreshData();
    }

    /*
     * @description: remove one filter from the list filters
     * @event: on click on x in filters list
     * @param: {filter} current filter object to remove
     */
    vm.removeFilter = function (filter) {
        var index = vm.data.filterData.filters.indexOf(filter);
        ouDynamicFormGroupService.clearFieldValue(filter);
        vm.data.filterData.filters.splice(index, 1);

        _refreshData();
    }
    vm.getFilterValue = ouDynamicFormGroupService.getFieldValue;

    /*****************************************************
     *                  EXECUTIONS                       *
     *****************************************************/
    initialize();

    $window.onbeforeunload = function (e) {
        saveState();
    }

    $scope.$on('$destroy', function () {
        saveState();
    })


};

module.exports = searchListController;