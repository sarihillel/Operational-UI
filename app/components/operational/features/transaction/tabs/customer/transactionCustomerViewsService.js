var TRANSACTION_CUSTOMER_VIEWS = function (INPUT_TYPES, INPUT_OPTIONS, cdmService, $log) {
    'ngInject';

    return {
        customer: {
            title: 'features.transaction.tabs.customer.views.customer',
            viewDetails: [
                {
                    title: 'features.transaction.tabs.titleGroups.generalDetails',
                    IsExpandable: true,
                    fields: [
                        {
                            title: 'features.transaction.tabs.customer.fields.sourceCustomerId',
                            name: 'S_CustomerID',
                            type: INPUT_TYPES.LABEL,
                        },
                        {
                            title: 'features.transaction.tabs.customer.fields.dunsNum',
                            name: 'DunsNum',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.customer.fields.customerType',
                            name: 'Type',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.customer.fields.internetAddress',
                            name: 'InternetAddress',
                            type: INPUT_TYPES.STRING
                        }
                    ]
                },
                cdmService.PhoneType('features.transaction.tabs.titleGroups.customerPhone', "features.transaction.tabs.customer.fields.customerPhone", "features.transaction.tabs.customer.fields.customerAdditionalPhone"),
                cdmService.AddressListType('features.transaction.tabs.titleGroups.customerAddress'),
                {
                    title: 'features.transaction.tabs.titleGroups.individualDetails',
                    IsExpandable: true,
                    fields: [
                        {
                            title: 'features.transaction.tabs.customer.fields.title',
                            name: 'Individual.Title',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.customer.fields.salutation',
                            name: 'Individual.Salutation',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.customer.fields.maritalStatus',
                            name: 'Individual.MaritalStatus',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.customer.fields.birthDate',
                            name: 'Individual.BirthDate',
                            type: INPUT_TYPES.DATE
                        },
                        {
                            title: 'features.transaction.tabs.customer.fields.firstName',
                            name: 'Individual.FirstName',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.customer.fields.lastName',
                            name: 'Individual.LastName',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.customer.fields.idCard',
                            name: 'Individual.IdCard',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.customer.fields.profession',
                            name: 'Individual.Profession',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.customer.contact.fields.email',
                            name: 'Individual.Email',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.customer.contact.fields.nationality',
                            name: 'Individual.Nationality',
                            type: INPUT_TYPES.STRING
                        }
                    ]
                },
                {
                    title: 'features.transaction.tabs.titleGroups.link',
                    IsExpandable: true,
                    fields: [
                        {
                            type: 'grid',
                            colSpan: 2,
                            gridOptions: {
                                name: 'Link',
                                columnDefs: [
                                    { name: "SystemName", type: INPUT_TYPES.STRING, displayName: "System Name" },
                                    { name: "CustomerID", type: INPUT_TYPES.STRING, displayName: "Customer ID" }
                                ],
                                rowTemplate: 'ui-grid/ui-grid-row-custom',
                            }
                        }]
                },
                cdmService.CommissionType(),
                cdmService.TargetType(),
                cdmService.AttributeType(),
            ]
        },
        contact: {
            title: 'features.transaction.tabs.customer.views.contact',
            viewDetails: [
                 {
                     title: 'features.transaction.tabs.titleGroups.generalDetails',
                     IsExpandable: true,
                     fields: [
                         {
                             title: 'features.transaction.tabs.customer.contact.fields.sourceContactId',
                             name: 'S_ContactID',
                             type: INPUT_TYPES.LABEL,
                         },
                         {
                             title: 'features.transaction.tabs.customer.contact.fields.targetContactId',
                             name: 'T_ContactID',
                             type: INPUT_TYPES.LABEL
                         },
                         {
                             title: 'features.transaction.tabs.customer.contact.fields.title',
                             name: 'PersonalDetails.Title',
                             type: INPUT_TYPES.STRING
                         },
                         {
                             title: 'features.transaction.tabs.customer.contact.fields.salutation',
                             name: 'PersonalDetails.Salutation',
                             type: INPUT_TYPES.STRING
                         },
                         {
                             title: 'features.transaction.tabs.customer.contact.fields.firstName',
                             name: 'PersonalDetails.FirstName',
                             type: INPUT_TYPES.STRING
                         },
                         {
                             title: 'features.transaction.tabs.customer.contact.fields.lastName',
                             name: 'PersonalDetails.LastName',
                             type: INPUT_TYPES.STRING
                         },
                         {
                             title: 'features.transaction.tabs.customer.contact.fields.maritalStatus',
                             name: 'PersonalDetails.MaritalStatus',
                             type: INPUT_TYPES.STRING
                         },
                         {
                             title: 'features.transaction.tabs.customer.contact.fields.profession',
                             name: 'PersonalDetails.Profession',
                             type: INPUT_TYPES.STRING
                         },
                         {
                             title: 'features.transaction.tabs.customer.contact.fields.idCard',
                             name: 'PersonalDetails.IdCard',
                             type: INPUT_TYPES.STRING
                         },
                         {
                             title: 'features.transaction.tabs.customer.contact.fields.birthDate',
                             name: 'PersonalDetails.BirthDate',
                             type: INPUT_TYPES.DATE
                         },
                         {
                             title: 'features.transaction.tabs.customer.contact.fields.prefferedLang',
                             name: 'PreferedLanguage',
                             type: INPUT_TYPES.STRING
                         },
                         {
                             title: 'features.transaction.tabs.customer.contact.fields.email',
                             name: 'PersonalDetails.Email',
                             type: INPUT_TYPES.STRING
                         }
                     ]
                 },
                 cdmService.PhoneType('features.transaction.tabs.titleGroups.customerPhone', "features.transaction.tabs.customer.fields.customerPhone", "features.transaction.tabs.customer.fields.customerAdditionalPhone"),
                 cdmService.AddressListType('features.transaction.tabs.titleGroups.customerAddress'),
                 {
                     title: 'features.transaction.tabs.titleGroups.role',
                     IsExpandable: true,
                     fields: [{
                         type: 'grid',
                         colSpan: 2,
                         gridOptions: {
                             name: 'Role',
                             columnDefs: [
                                 { name: "References", type: INPUT_TYPES.STRING, displayName: "Role Object", enableCellEdit: true }
                             ],
                             rowTemplate: 'ui-grid/ui-grid-row-custom',
                         }
                     }]
                 },
                cdmService.AttributeType(),
            ]
        },
        location: {
            title: 'features.transaction.tabs.customer.views.location',
            viewDetails: [
                    {
                        title: 'features.transaction.tabs.titleGroups.generalDetails',
                        IsExpandable: true,
                        fields: [
                            {
                                title: 'features.transaction.tabs.customer.fields.customerName',
                                name: 'Name',
                                type: INPUT_TYPES.STRING,
                                colSpan: 2
                            },
                        ]
                    },
                    cdmService.PhoneType('features.transaction.tabs.titleGroups.customerPhone', "features.transaction.tabs.customer.fields.customerPhone", "features.transaction.tabs.customer.fields.customerAdditionalPhone"),
                    cdmService.AddressListType('features.transaction.tabs.titleGroups.customerAddress'),
                    cdmService.TargetType()
            ]
        },
        subscriber: {
            title: 'features.transaction.tabs.customer.views.subscriber',
            viewDetails: [
                {
                    title: 'features.transaction.tabs.titleGroups.generalDetails',
                    IsExpandable: true,
                    fields: [
                        {
                            title: 'features.transaction.tabs.customer.fields.sourceCustomerId',
                            name: 'S_SubscriberID',
                            type: INPUT_TYPES.LABEL,
                        },
                    ]
                },
                cdmService.TargetType(),
                cdmService.CommissionType(),
                cdmService.ContractType()
            ]
        },
        contract: {
            title: 'features.transaction.tabs.customer.views.contract',
            viewDetails: [
                {
                    title: 'features.transaction.tabs.titleGroups.generalDetails',
                    IsExpandable: true,
                    fields: [
                        {
                            title: 'features.transaction.tabs.customer.fields.contractID',
                            name: 'ContractID',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.customer.fields.s_ContractID',
                            name: 'S_ContractID',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.customer.fields.s_SubscriberID',
                            name: 'S_SubscriberID',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.customer.fields.s_ProductID',
                            name: 'S_ProductID',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.customer.fields.cancellationNoticePeriod',
                            name: 'CancellationNoticePeriod',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.customer.fields.contractStartDate',
                            name: 'ContractStartDate',
                            type: INPUT_TYPES.DATE,
                        },
                        {
                            title: 'features.transaction.tabs.customer.fields.contractEndDate',
                            name: 'ContractEndDate',
                            type: INPUT_TYPES.DATE,
                        },
                        {
                            title: 'features.transaction.tabs.customer.fields.firstActivationDate',
                            name: 'FirstActivationDate',
                            type: INPUT_TYPES.DATE,
                        },
                        {
                            title: 'features.transaction.tabs.customer.fields.nextPossibleCancellationDate',
                            name: 'NextPossibleCancellationDate',
                            type: INPUT_TYPES.DATE,
                        },
                        {
                            title: 'features.transaction.tabs.customer.fields.type',
                            name: 'Type',
                            type: INPUT_TYPES.STRING,
                        },
                    ]
                },
                cdmService.AttributeType()
            ]
        }
    };
}

module.exports = TRANSACTION_CUSTOMER_VIEWS;