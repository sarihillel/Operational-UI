'use strict';

var ouTabsService = function (localStorage, $state, $log) {
    'ngInject';
    /*****************************************************
     *                      PRIVATE                      *
     *****************************************************/
    var tabLists = [];
    var tabListApi = function (tabList, tabName, rootState) {
        var self = this;
        self.tabs = tabList.tabs;
        self.tabListName = tabName;
        self.rootState = rootState;

        var currentStateEqualTo = function (tab) {
            var isEqual = $state.is(tab.route, tab.params, tab.options);
            return isEqual;
        };

        var is_equal = function (tab1, tab2) {
            return tab1.route == tab2.route && JSON.stringify(tab1.params) == JSON.stringify(tab2.params);
        }

        /*
        * @description: move to state by tab params
        * @param: {tab} tab to move on
        * @param: {reload} flag if reload tabs
        */
        self.go = function (tab) {
            if (!tab.disable) {
                tab = self.getLastChildOfTab(tab);
                if (!currentStateEqualTo(tab)) {
                    $state.go(tab.route, tab.params, tab.options);
                }
            }
        };
        self.move_if_limited = function (tab) {
            var index = self.tabs.indexOf(tab);
            if (tabList.options.limit <= index) {
                self.move_tab(index, tabList.options.moveTo);
                return tabList.options.moveTo;
            }
            return index;
        }
        self.move_tab = function (from, to) {
            var tab = self.tabs.splice(from, 1)[0];
            self.tabs.splice(to, 0, tab);
        }
        self.addParent = function (tab) {
            tabList.parent = {
                tab: tab,
                tabList: tabLists[tab.tabListName]
            }
            self.rootState = tabLists[tab.tabListName].tabListApi.rootState;
        }
        self.addChild = function (tab, tabListNameOfChild) {
            tab.child = {
                tabList: tabLists[tabListNameOfChild],
            };
        }
        self.getActiveTab = function () {
            return self.tabs[angular.isNumber(self.active) ? self.active : (tabList.options.defualtTabActive || 0)];
        }
        /* whether to highlight given route as part of the current state */
        self.is_active = function (tab) {
            var isAncestorOfCurrentRoute = $state.includes(tab.route, tab.params, tab.options);
            return isAncestorOfCurrentRoute;
        };
        self.is_child_state = function (s) {
            var secondRouteOnlyRegex = new RegExp(self.rootState.name + "\.[a-z]", "i");
            return secondRouteOnlyRegex.test(s.name) && !s.abstract;
        }
        /*
         * @description: check if tab is exists by: route & params
         * @param: {tab} tab object to find if it exists
         * @returns if true: tab object  
         *          else: null
         */
        self.is_exsits = function (tabSearch) {
            var tabs = self.tabs.filter(function (tab, index) {
                return is_equal(tab, tabSearch)
            });
            if (tabs.length > 0) return true;
            else return false;
        }
        self.getTab = function (tabSearch) {
            var tabs = self.tabs.filter(function (tab, index) {
                return is_equal(tab, tabSearch)
            });
            if (tabs.length > 0) tabs[0];
            else return null;
        }

        self.getAllChildren = function () {
            var children = [];
            tabList.tabs.forEach(function (tab) {
                if (tab.child) {
                    children.push(tab.child);
                    children.concat(tab.child.tabList.tabListApi.getAllChildren())
                }
            });
            return children;
        }
        self.getLastChildOfTab = function (tab) {
            var lastChild = tab;
            if (tab.child) {
                lastChild = tab.child.tabList.tabListApi.getActiveTab()
                while (lastChild.child) {
                    lastChild = lastChild.child.tabList.tabListApi.getActiveTab()
                }
            }
            return lastChild;
        }
        self.getRootParents = function () {
            var rootTab = { tabList: tabList };
            var parentTab = tabList.parent;
            while (parentTab && parentTab.tabList) {
                rootTab = parentTab;
                parentTab = parentTab.tabList.tabListApi.parent;
            }
            return rootTab;
        }
        self.is_exsits_children_or_parent = function (tabSearch) {
            var is_exists = false;
            //var children = self.getAllChildren();
            //children.forEach(function (child) {
            //    if (child.tabList.tabListApi.is_exsits(tabSearch)) {
            //        is_exists = true;
            //        return;
            //    }
            //});
            //if (is_exists) return true;
            var parent = self.getRootParents();
            if (parent.tabList.tabListApi.is_exsits(tabSearch)) {
                is_exists = true;
            }
            else {
                var children = parent.tabList.tabListApi.getAllChildren();
                children.forEach(function (child) {
                    if (child.tabList.tabListApi.is_exsits(tabSearch)) {
                        is_exists = true;
                        return;
                    }
                });
            }
            if (is_exists) return true;
            return false;
        }

        self.update_tabs = function () {
            // sets which tab is active (used for highlighting)
            // delete self.active;
            angular.forEach(self.tabs, function (tab, index) {
                tab.active = self.is_active(tab);
                if (tab.active) {
                    self.active = index;
                }
            });
            if (self.active)
                self.active = self.move_if_limited(self.tabs[self.active]);

        };

        self.addTab = function (tab) {
            var isAdded = false;
            tab.data = tab.data || {};
            tab.params = tab.params || {};
            tab.options = tab.options || {};
            tab.class = tab.class || '';
            tab.isClose = tab.isClose || false;
            tab.isTriangle = tab.isTriangle || false;
            tab.numberTriangle = tab.numberTriangle || 0;
            tab.tabListName = tabName;
            tab.closeClass = tab.isClose ? (tab.closeClass || 'closeX') : '';

            if (!self.is_exsits(tab)) {
                self.tabs.push(tab);
                isAdded = true;
            }
            return isAdded;
        };
        self.getTabsList = function () {
            var tabs = _.map(self.tabs, function (tab) {
                // return _.pick(tab, ['heading', 'route', 'params', 'isClose', 'options', 'class', 'closeClass']);
                return {
                    heading: tab.heading,
                    route: tab.route,
                    params: tab.params,
                    isClose: tab.isClose,
                    options: tab.options,
                    class: tab.class,
                    closeClass: tab.closeClass,
                    isTriangle: tab.isTriangle,
                    numberTriangle: tab.numberTriangle,
                }
            });
            return tabs;
        }
        self.remove_list = function () {
            delete tabLists[tabName];
        }
        function destroy(obj) {
            for (var prop in obj) {
                delete obj[prop];
            }
        }
        self.remove_tab = function (tab) {
            var index = self.tabs.indexOf(tab);
            var tabremoved = self.tabs.splice(index, 1)[0];   //remove one tab
            if (tabremoved.child) {
                var children = tabremoved.child.tabList.tabListApi.getAllChildren();
                children.forEach(function (child) {
                    child.tabList.tabListApi.remove_list();
                });
                tabremoved.child.tabList.tabListApi.remove_list();
            }
            destroy(tabremoved);

            if (self.active == index && self.active - 1 < self.tabs.length)
                self.go(self.tabs[self.active - 1]);
            else
                self.update_tabs();
        };

    };

    var _initTablist = function _initTablist(tabName, options, rootState) {
        tabLists[tabName] = {
            tabs: [],
            options: options
        };

        tabLists[tabName].tabListApi = new tabListApi(tabLists[tabName], tabName, rootState);
    }


    return {
        findTabListApi: function (tabName) {
            if (!tabLists[tabName]) return null;
            return tabLists[tabName].tabListApi;
        },
        getTabListApi: function (tabName, options, rootState) {
            if (!tabLists[tabName]) {
                _initTablist(tabName, options, rootState);
            }
            return tabLists[tabName].tabListApi;
        },
        getCurrentTab: function (tabName) {
            if (!tabLists[tabName]) return null;
            return tabLists[tabName].tabs[tabLists[tabName].tabListApi.active];
        },
        isTabListExists: function (tabName) {
            return !!tabLists[tabName];
        },
        removeTabList: function (tabName) {
            //TODO: remove only parent tab and all of its child lists
            delete tabLists[tabName];
        },

    };




};

module.exports = ouTabsService;