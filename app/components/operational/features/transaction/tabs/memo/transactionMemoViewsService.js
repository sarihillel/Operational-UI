var TRANSACTION_MEMO_VIEWS = function (INPUT_TYPES, cdmService, $log) {
    'ngInject';

    return {
        memo: {
            title: 'features.transaction.tabs.memo.views.memo',
            viewDetails: [
                {
                    title: 'features.transaction.tabs.titleGroups.generalDetails',
                    IsExpandable: true,
                    fields: [
                        {
                            title: 'features.transaction.tabs.memo.fields.memoID',
                            name: 'MemoID',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.memo.fields.memoStatus',
                            name: 'MemoStatus',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.memo.fields.t_CustomerID',
                            name: 'T_CustomerID',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.memo.fields.enteredBy',
                            name: 'EnteredBy',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.memo.fields.enteredDate',
                            name: 'EnteredDate',
                            type: INPUT_TYPES.DATE,
                        },
                        {
                            title: 'features.transaction.tabs.memo.fields.memoText',
                            name: 'MemoText',
                            type: INPUT_TYPES.STRING,
                        },
                    ]
                },
                cdmService.TargetType(),

            ]
        },
    };
}

module.exports = TRANSACTION_MEMO_VIEWS;