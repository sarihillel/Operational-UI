var searchListFieldsService = function (INPUT_TYPES, INPUT_OPTIONS, $filter) {
    'ngInject';
    var transactionInfo = {
        title: $filter('translate')('features.search.fields.transactionInfo'),
        fields: [{
            name: 'transactionID',
            title: $filter('translate')('features.search.fields.transactionID'),
            type: INPUT_TYPES.STRING,
        },
        {
            title: $filter('translate')('features.search.fields.entityType'),
            name: 'entityType',
            type: INPUT_TYPES.SELECT,
            options: INPUT_OPTIONS.ENTITY_TYPE,
        },
        {
            title: $filter('translate')('features.search.fields.operationName'),
            name: 'operationName',
            type: INPUT_TYPES.SELECT,
            options: INPUT_OPTIONS.OPERATION_NAME,
        },
        {
            title:  $filter('translate')('features.search.fields.receivedDate'),
            name: 'date',
            type: INPUT_TYPES.DATE_RANGE
        }
        ]
    };
    var sourceInfo = {
        title: $filter('translate')('features.search.fields.sourceInfo'),
        fields: [{
            title: $filter('translate')('features.search.fields.sourceTransactionID'),
            name: 'sourceTransactionID',
            type: INPUT_TYPES.STRING
        },
        {
            title: $filter('translate')('features.search.fields.sourceSystem'),
            name: 'sourceSystem',
            type: INPUT_TYPES.SELECT,
            options: INPUT_OPTIONS.SOURCE_SYSTEM,
        },
        {
            title: $filter('translate')('features.search.fields.sourceEntityID'),
            name: 'sourceEntityID',
            type: INPUT_TYPES.STRING,
        },
        {
            title: $filter('translate')('features.search.fields.sourceCustomerID'),
            name: 'sourceCustomerID',
            type: INPUT_TYPES.STRING
        }
        ]
    };
    var customerInfo = {
        title: $filter('translate')('features.search.fields.customerInfo'),
        fields: [{
            title: $filter('translate')('features.search.fields.customerFirstName'),
            name: 'customerFirstName',
            type: INPUT_TYPES.STRING
        },
        {
            title: $filter('translate')('features.search.fields.customerLastName'),
            name: 'customerLastName',
            type: INPUT_TYPES.STRING,
        },
        {
            title: $filter('translate')('features.search.fields.customerPhoneNumber'),
            name: 'phoneNumber',
            type: INPUT_TYPES.STRING,
        },
         {
             title: $filter('translate')('features.search.fields.customerDUNSNumber'),
             name: 'customerDUNSNumber',
             type: INPUT_TYPES.STRING,
         }
        ]
    };
    //var targetInfo = {
    //    title: 'features.search.fields.targetInfo',
    //    fields: [{
    //        title: $filter('translate')('features.search.fields.targetSystem'),
    //        name: 'targetSystem',
    //        type: INPUT_TYPES.SELECT,
    //        options: INPUT_OPTIONS.TARGET_SYSTEM,
    //    }]
    //};

    return [transactionInfo, sourceInfo, customerInfo]

}

module.exports = searchListFieldsService;