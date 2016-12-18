'use strict';
var taskListController = function ($log, $scope, $filter, $state, localStorageService,config,$sce) {
    'ngInject';

    /* ***************************************************
                      VARIABLES
     **************************************************** */
    var vm = this;
    
    vm.ticket = localStorageService.get('access_token');
    vm.taskURL = config[config.environment].taskUIUrl + '#/tasklist/home?showHeader=false&ticket=' + vm.ticket;

    /*****************************************************
    *               METHODS - PRIVATE                   *
    *****************************************************/

    /*****************************************************
     *                  METHODS                          *
     *****************************************************/
    /*****************************************************
     *                  EXECUTIONS                       *
     *****************************************************/
};

module.exports = taskListController;