'use strict';
/*
 * @description:
 * set functionallity of data tabs and ui-router
 * 
 * @example:
 *  <ou-tabs options="tabsOptions" justified="true" vertical="false" class='tabs'></ou-tabs>
 * 
 * on scope:
 * // defualtTabs,tabName is required
     scope.tabsOptions:{
        //required
        //defualtTabs that will show in the tabs list     
        defualtTabs: [{ 
            //heading title on the tab
            heading: 'tab 1',
            //route of state to direct to body  
            route: 'project.tab1'
        }],
        //required
        //unique tabs list name to that list so you can call and get it from the 'ouTabsService' service by this name
        tabListName: 'examplesTabList',
        //limit how much to show ,
        //defualt is 9
        limitTo: 3,
        //defualt index tab to active ,
        //defualt is 0
        defualtTabActive: 1,
     }
 * 
 * 
 * to call add/remove/go , you can get listApi by it's name:
 *  inject ouTabsService on ctrl and call it:
    listApi= ouTabsService.findTabListApi('examplesTabList'); //'examplesTabList'

    use for example:
    listApi.addTab()
 * 
 *  remark: to see listApi options go to ouTabsService
 * 
 * 
 * to get and set currentTab data:
       currentTab = ouTabsService.getCurrentTab('examplesTabList') || {}; 
 * and set data on the controller:
       scope.data =currentTab.data = currentTab.data || {};
       if (!if (!scope.data.initData)//check if not init data
       {
            scope.data.initData=true;
            scope.data.somthing ='try';
            ...
       }
 * 
 */
var tabsView = function ($rootScope, ouTabsService, $log, $state) {
    'ngInject';

    return {
        restrict: 'E',
        require: '?^^ouTabs',
        scope: {
            options: '<?',
            type: '@',
            justified: '@',
            vertical: '@',
            class: '@'
        },
        controller: 'ouTabsController',
        templateUrl: function (element, attributes) {
            return attributes.templateUrl || './components/operational/directives/ou-tabs/ou-tabs.html';
        },
        link: {
            post: function (scope, element, attributes, ctrl) {
                var isInitState = true;
                if (ctrl && angular.isDefined(ctrl.TabListApi.active)) {
                    var activeParentTab = ctrl.TabListApi.getActiveTab();
                    if (activeParentTab) {
                        ctrl.TabListApi.addChild(activeParentTab, scope.options.tabListName);
                        scope.TabListApi.addParent(activeParentTab);
                        if (angular.isDefined(scope.TabListApi.active))
                            scope.TabListApi.go(activeParentTab);
                    }
                }
                
                //extend remove_list to do unbind
                var remove_list = scope.TabListApi.remove_list;
                scope.TabListApi.remove_list = function () {
                    remove_list.apply(this, arguments)
                    unbind();
                }

                //if current state not init force to go to current state again and init it
                if (!angular.isDefined(scope.TabListApi.active)) {
                    var currentTab = scope.TabListApi.tabs[scope.options.defualtTabActive];
                    var isInitState = false;
                    scope.TabListApi.go(currentTab);
                }

                var updateTabs = function () {
                    scope.TabListApi.update_tabs();
                };

                scope.removeTab = function (tab, evt) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    scope.TabListApi.remove_tab(tab);
                }

                scope.go = function (tab) {
                    scope.TabListApi.go(tab);
                }

                var unbindStateChangeSuccess = $rootScope.$on('$stateChangeSuccess', function () { updateTabs(); });
                var unbindStateChangeError = $rootScope.$on('$stateChangeError', function () { updateTabs(); });
                var unbindStateChangeCancel = $rootScope.$on('$stateChangeCancel', function () { updateTabs(); });
                var unbindStateNotFound = $rootScope.$on('$stateNotFound', function () { updateTabs(); });
                var unbindStateChangeStart = $rootScope.$on('$stateChangeStart', function (evt, to, params) {
                    if (!isInitState && !ctrl) {
                        isInitState = true;
                        scope.TabListApi.rootState = $state.$current.parent.self;
                    }

                    var tabSearch = { route: to.name, params: params };
                    var tab = (!scope.TabListApi.is_child_state(to) || scope.TabListApi.is_exsits(tabSearch) || scope.TabListApi.is_exsits_children_or_parent(tabSearch));
                    if (!tab) {
                        evt.preventDefault();
                        console.log("this tab " + to.name + " not exsits ");
                    }
                });

                function unbind() {
                    unbindStateChangeSuccess();
                    unbindStateChangeError();
                    unbindStateChangeCancel();
                    unbindStateNotFound();
                    unbindStateChangeStart();
                }

                scope.$on('$destroy', function () {
                    unbind();
                    //TODO: add to local storage
                });
            },
        }
    }


};

module.exports = tabsView;