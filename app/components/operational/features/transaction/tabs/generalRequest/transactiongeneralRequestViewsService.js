var TRANSACTION_GENERAL_REQUEST_VIEWS = function (INPUT_TYPES, cdmService, $log) {
    'ngInject';

    return {
        generalRequest: {
            title: 'features.transaction.tabs.generalRequest.views.general',
            viewDetails: [
                {
                    title: 'features.transaction.tabs.titleGroups.generalDetails',
                    IsExpandable: true,
                    fields: [
                          {
                              title: 'features.transaction.tabs.generalRequest.fields.requestData1',
                              name: 'RequestData1',
                              type: INPUT_TYPES.TEXTAREA,
                              colSpan: 2,
                              rows: 20
                          },
                          {
                              title: 'features.transaction.tabs.generalRequest.fields.requestData2',
                              name: 'RequestData2',
                              type: INPUT_TYPES.TEXTAREA,
                              colSpan: 2,
                              rows: 20
                          },
                          {
                              title: 'features.transaction.tabs.generalRequest.fields.status',
                              name: 'Status',
                              type: INPUT_TYPES.LABEL,
                          },
                    ]
                },
                cdmService.AttributeType(),
            ]
        },
    };
}

module.exports = TRANSACTION_GENERAL_REQUEST_VIEWS;