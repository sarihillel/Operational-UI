
/**
 * application configuration properties
 */
var config = {
    environment : 'dev',
    dev: {
        apiUrl:'',
        defaultRowsToShow: 50, //tableDisplayParams
        rowsToShowArray: [5, 10, 20, 50, 100, 200],
        paginationDisplayLength: 5,
        sortOrder: ['ascending','descending'], //tableDisplayParams
        defaultSortOrder: 'ascending', // tableDisplayParams
        defaultSortColTitle: null, // tableDisplayParams
        initCurrentPage: 1, //tableDisplayParams
        initTotalPages: 1, //tableDisplayParams
        initMaxRows: 1, //tableDisplayParams
        initSortedCol: null, //tableDisplayParams
        taskUIUrl:'http://illin768:30310/'
    },

    release :{
        apiUrl:'http://localhost:57087/api/'
    },

    test :{
        apiUrl:'http://app1.msbitsoftware.com/api/'
    },

    stage :{
        apiUrl:'http://localhost:57087/api/'
    }
};

module.exports = config;