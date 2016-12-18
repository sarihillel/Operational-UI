var TRANSACTION_ORDER_VIEWS = function (INPUT_TYPES, INPUT_OPTIONS, cdmService, $filter, DATE_FORMAT) {
    'ngInject';
    var ADDRESS_MODAL = cdmService.AddressType('Attributes.InstallationAddress.');

    return {
        general: {
            title: 'features.transaction.tabs.order.views.generalDetails',
            viewDetails: [
                {
                    title: 'features.transaction.tabs.titleGroups.generalDetails',
                    IsExpandable: true,
                    fields: [
                        {
                            title: 'features.transaction.tabs.order.fields.OrderID',
                            name: 'Order.OrderID',
                            type: INPUT_TYPES.LABEL,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.orderStatus',
                            name: 'Order.OrderStatus',
                            type: INPUT_TYPES.LABEL,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.orderReceiveDate',
                            name: 'Info.ReceiveDate',
                            type: INPUT_TYPES.LABEL,
                            filter: function (value) {
                                return $filter('ouDateFormat')(value, false, DATE_FORMAT.time);
                            },
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.sourceOrderId',
                            name: 'Order.S_OrderID',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.sourceCustomerId',
                            name: 'Info.S_CustomerID',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.offer',
                            name: 'Order.OfferCode',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.actionType',
                            name: 'Order.ActionType',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.businessUnit',
                            name: 'Order.BusinessUnit',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.preferredLanguage',
                            name: 'Order.PreferedLanguage',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.comments',
                            name: 'Order.Comments',
                            type: INPUT_TYPES.TEXTAREA,
                            colSpan: 2
                        }
                    ]
                },
                {
                    title: 'features.transaction.tabs.titleGroups.billingAccountReferences',
                    IsExpandable: true,
                    fields: [{
                        type: 'grid',
                        colSpan: 2,
                        gridOptions: {
                            name: 'Order.BillingAccountRef',
                            RowHeight: 32,
                            columnDefs: [
                                { name: "References", type: INPUT_TYPES.STRING, displayName: "References", enableCellEdit: true },
                                {
                                    name: "delete",
                                    displayName: "",
                                    enableCellEdit: false,
                                    cellTemplate: '<a ng-click="grid.appScope.DeleteRow(row)" class="delete-link">X</a>'
                                }
                            ],
                            rowTemplate: 'ui-grid/ui-grid-row-custom',
                            enableSorting: true,
                            disableHorizontalScrollbar: true,
                            disableVerticalScrollbar: true,
                            rowEditWaitInterval: -1,
                        }
                    }]
                },
                {
                    title: 'features.transaction.tabs.titleGroups.errorInformation',
                    IsExpandable: true,
                    fields: [{
                        title: 'features.transaction.tabs.order.fields.error',
                        name: 'Order.ErrorCode',
                        type: INPUT_TYPES.LABEL,
                        IsEditable: false,
                        colSpan: 2,
                        cssClass: 'label-error'
                    },
                    {
                        title: 'features.transaction.tabs.order.fields.errorDescription',
                        name: 'Order.ErrorDescription',
                        type: INPUT_TYPES.LABEL,
                        IsEditable: false,
                        colSpan: 2,
                        cssClass: 'label-error'
                    }]
                },
                cdmService.AttributeType('Order.Attributes.'),
                cdmService.CommissionType('Order.Commission.')
            ]
        },
        sourceProduct: {
            title: 'features.transaction.tabs.order.views.sourceProduct',
            viewDetails: [
                {
                    title: 'features.transaction.tabs.titleGroups.generalDetails',
                    IsExpandable: true,
                    fields: [
                        {
                            title: 'features.transaction.tabs.order.fields.productId',
                            name: 'ProductID',
                            type: INPUT_TYPES.LABEL,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.sourceProductId',
                            name: 'S_ProductID',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.parentProductId',
                            name: 'ParentProductID',
                            type: INPUT_TYPES.LABEL
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.productType',
                            name: 'ProductType',
                            type: INPUT_TYPES.SELECT,
                            options: INPUT_OPTIONS.PRODUCT_TYPE,
                            required: true
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.sourceParentProductId',
                            name: 'S_ParentProductID',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.productUniqueCode',
                            name: 'ProductUniqueCode',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.productPath',
                            name: 'ProductPath',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.targetCustomerId',
                            name: 'T_CustomerID',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.targetSystem',
                            name: 'TargetSystem',
                            type: INPUT_TYPES.STRING
                        }
                    ]
                },
                {
                    title: 'features.transaction.tabs.titleGroups.errorInformation',
                    IsExpandable: true,
                    fields: [{
                        title: 'features.transaction.tabs.order.fields.error',
                        name: 'Attributes.ErrorCode',
                        type: INPUT_TYPES.LABEL,
                        IsEditable: false,
                        colSpan: 2,
                        cssClass: 'label-error'
                    },
                    {
                        title: 'features.transaction.tabs.order.fields.errorDescription',
                        name: 'Attributes.ErrorDescription',
                        type: INPUT_TYPES.LABEL,
                        IsEditable: false,
                        colSpan: 2,
                        cssClass: 'label-error'
                    }]
                },
                {
                    title: 'features.transaction.tabs.titleGroups.installationInformation',
                    IsExpandable: true,
                    fields: [{
                        title: 'features.transaction.tabs.order.fields.SiteId',
                        name: 'Attributes.InstallationSiteID',
                        type: INPUT_TYPES.STRING,
                    },
                    {
                        title: 'features.transaction.tabs.order.fields.installationEndTime',
                        name: 'Attributes.InstallationEndTime',
                        type: INPUT_TYPES.TIME
                    },
                    {
                        title: 'features.transaction.tabs.order.fields.date',
                        name: 'Attributes.InstallationDate',
                        type: INPUT_TYPES.DATE,
                        //type: INPUT_TYPES.DATE
                    },
                    {
                        title: 'features.transaction.tabs.order.fields.time',
                        name: 'Attributes.InstallationTime',
                        type: INPUT_TYPES.TIME

                    },
                    {
                        title: 'features.transaction.tabs.order.fields.location',
                        name: 'Attributes.InstallationLocation',
                        type: INPUT_TYPES.LABEL,
                        IsEditable: true,
                        colSpan: 2
                    },
                    {
                        title: 'features.transaction.tabs.order.fields.installationAddress',
                        //name: 'address',
                        type: INPUT_TYPES.LABEL_CONCATENATED,
                        values: [
                           {
                               name: 'Attributes.InstallationAddress.PoBox',
                               charBefore: 'PO Box ',
                               charAfter: ','
                           },
                           {
                               name: 'Attributes.InstallationAddress.City',
                               charBefore: ' ',
                               charAfter: ','
                           },
                           {
                               name: 'Attributes.InstallationAddress.State',
                               charBefore: ' ',
                               charAfter: ' '
                           },
                           {
                               name: 'Attributes.InstallationAddress.Zip',
                               charBefore: '',
                               charAfter: ','
                           },
                           {
                               name: 'Attributes.InstallationAddress.Country',
                               charBefore: ' ',
                               charAfter: ''
                           }
                        ],
                        IsEditable: true,
                        colSpan: 2,
                        cssClass: 'address-concat',
                        popupOptions: {
                            title: 'Customer Address',
                            template: 'ui-grid/ou-dynamic-form-group',
                            showModal: false,
                            okButton: 'Save',
                            modalScope: {
                                groupsFields: ADDRESS_MODAL,
                                options: {
                                    chunkGroups: 1,
                                    chunkFields: 2
                                }
                            },
                            onRegisterApi: function (modalApi) {
                                advancedApi = modalApi;
                                advancedApi.on.ok(function (data) {
                                    _setAddressFields(data.modalScope.groupsFields);
                                    _refreshData();
                                });
                            }
                        }
                    },
                    ]
                },
                {
                    title: 'features.transaction.tabs.titleGroups.additionalInformation',
                    IsExpandable: true,
                    fields: [
                        {
                            title: 'features.transaction.tabs.order.fields.groupId',
                            name: 'Attributes.GroupID',
                            type: INPUT_TYPES.LABEL,
                            IsEditable: false
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.lineOfBusiness',
                            name: 'Attributes.LineOfBusiness',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.activityType',
                            name: 'Attributes.ActivityType',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.offerId',
                            name: 'Attributes.OfferID',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.offerCode',
                            name: 'Attributes.OfferCode',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.actionCode',
                            name: 'Attributes.ActionCode',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.lastStatusDate',
                            name: 'Attributes.LastStatusDate',
                            type: INPUT_TYPES.DATE,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.previousStatus',
                            name: 'Attributes.PreviousStatus',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.productLevel',
                            name: 'Attributes.ProductLevel',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.totalRcAmmount',
                            name: 'Attributes.TotalRcAmount',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.totalOcAmmount',
                            name: 'Attributes.TotalOcAmount',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.familyCode',
                            name: 'Attributes.FamilyCode',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.relatedProductId',
                            name: 'Attributes.RelatedProductID',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.quantity',
                            name: 'Attributes.Quantity',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.comments',
                            name: 'Attributes.Comments',
                            type: INPUT_TYPES.TEXTAREA,
                            colSpan: 2
                        },

                    ]
                },
                {
                    title: 'features.transaction.tabs.titleGroups.billingAccountReferences',
                    IsExpandable: true,
                    fields: [{
                        type: 'grid',
                        colSpan: 2,
                        gridOptions: {
                            name: 'BillingAccountRef',
                            RowHeight: 32,
                            columnDefs: [
                                { name: "References", type: INPUT_TYPES.STRING, displayName: "References", enableCellEdit: true },
                                {
                                    name: "delete",
                                    displayName: "",
                                    enableCellEdit: false,
                                    cellTemplate: '<a ng-click="grid.appScope.DeleteRow(row,2)" class="delete-link">X</a>'
                                }
                            ],
                            rowTemplate: 'ui-grid/ui-grid-row-custom',
                            enableSorting: true,
                            disableHorizontalScrollbar: true,
                            disableVerticalScrollbar: true,
                            rowEditWaitInterval: -1,

                        }
                    }]
                },
                cdmService.AttributeType(),
                cdmService.CommissionType(),
                cdmService.ContractType()
            ]
        },
        targetOrder: {
            title: 'features.transaction.tabs.order.views.targetOrder',
            viewDetails: [
                 {
                     title: 'features.transaction.tabs.titleGroups.generalDetails',
                     IsExpandable: true,
                     fields: [
                         {
                             title: 'features.transaction.tabs.order.fields.name',
                             name: 'Name',
                             type: INPUT_TYPES.STRING,
                         },
                         {
                             title: 'features.transaction.tabs.order.fields.targetOrderId',
                             name: 'T_OrderID',
                             type: INPUT_TYPES.STRING
                         },
                         {
                             title: 'features.transaction.tabs.order.fields.targetCustomerId',
                             name: 'T_CustomerID',
                             type: INPUT_TYPES.STRING
                         },
                         {
                             title: 'features.transaction.tabs.order.fields.targetBillingId',
                             name: 'T_BillingID',
                             type: INPUT_TYPES.STRING
                         },
                     ]
                 },
                 cdmService.AttributeType(),
            ]
        },
        targetProduct: {
            title: 'features.transaction.tabs.order.views.targetProduct',
            viewDetails: [
                {
                    title: 'features.transaction.tabs.titleGroups.generalDetails',
                    IsExpandable: true,
                    fields: [
                        {
                            title: 'features.transaction.tabs.order.fields.productId',
                            name: 'ProductID',
                            type: INPUT_TYPES.LABEL,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.targetProductId',
                            name: 'T_ProductID',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.parentProductId',
                            name: 'ParentProductID',
                            type: INPUT_TYPES.LABEL
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.productType',
                            name: 'ProductType',
                            type: INPUT_TYPES.SELECT,
                            options: INPUT_OPTIONS.PRODUCT_TYPE,
                            required: true
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.targetParentProductId',
                            name: 'T_ParentProductID',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.targetProductUniqueId',
                            name: 'T_ProductUniqueCode',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.productUniqueId',
                            name: 'ProductUniqueCode',
                            type: INPUT_TYPES.LABEL_CONCATENATED
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.targetProductPath',
                            name: 'T_ProductPath',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.status',
                            name: 'Status',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.sentToVendorDate',
                            name: 'SentToTargetDate',
                            type: INPUT_TYPES.DATE
                        },
                    ]
                },
                {
                    title: 'features.transaction.tabs.titleGroups.errorInformation',
                    IsExpandable: true,
                    fields: [{
                        title: 'features.transaction.tabs.order.fields.error',
                        name: 'Attributes.ErrorCode',
                        type: INPUT_TYPES.LABEL,
                        IsEditable: false,
                        cssClass: 'label-error',
                        colSpan: 2
                    },
                    {
                        title: 'features.transaction.tabs.order.fields.errorDescription',
                        name: 'Attributes.ErrorDescription',
                        type: INPUT_TYPES.LABEL,
                        IsEditable: false,
                        cssClass: 'label-error',
                        colSpan: 2
                    }]
                },
                {
                    title: 'features.transaction.tabs.titleGroups.installationInformation',
                    IsExpandable: true,
                    fields: [{
                        title: 'features.transaction.tabs.order.fields.SiteId',
                        name: 'Attributes.InstallationSiteID',
                        type: INPUT_TYPES.STRING,
                    },
                    {
                        title: 'features.transaction.tabs.order.fields.installationEndTime',
                        name: 'Attributes.InstallationEndTime',
                        type: INPUT_TYPES.TIME
                    },
                    {
                        title: 'features.transaction.tabs.order.fields.date',
                        name: 'Attributes.InstallationDate',
                        type: INPUT_TYPES.DATE
                    },
                    {
                        title: 'features.transaction.tabs.order.fields.time',
                        name: 'Attributes.InstallationTime',
                        type: INPUT_TYPES.TIME
                    },
                    {
                        title: 'features.transaction.tabs.order.fields.location',
                        name: 'Attributes.InstallationLocation',
                        type: INPUT_TYPES.LABEL,
                        IsEditable: true,
                        colSpan: 2
                    },
                    {
                        title: 'features.transaction.tabs.order.fields.installationAddress',
                        //name: 'address',
                        type: INPUT_TYPES.LABEL_CONCATENATED,
                        values: [
                           {
                               name: 'Attributes.InstallationAddress.PoBox',
                               charBefore: 'PO Box ',
                               charAfter: ','
                           },
                           {
                               name: 'Attributes.InstallationAddress.City',
                               charBefore: ' ',
                               charAfter: ','
                           },
                           {
                               name: 'Attributes.InstallationAddress.State',
                               charBefore: ' ',
                               charAfter: ' '
                           },
                           {
                               name: 'Attributes.InstallationAddress.Zip',
                               charBefore: '',
                               charAfter: ','
                           },
                           {
                               name: 'Attributes.InstallationAddress.Country',
                               charBefore: ' ',
                               charAfter: ''
                           }
                        ],
                        IsEditable: true,
                        colSpan: 2,
                        cssClass: 'address-concat',
                        popupOptions: {
                            title: 'Customer Address',
                            template: 'ui-grid/ou-dynamic-form-group',
                            showModal: false,
                            okButton: 'Save',
                            modalScope: {
                                groupsFields: ADDRESS_MODAL,
                                options: {
                                    chunkGroups: 1,
                                    chunkFields: 2
                                }
                            },
                            onRegisterApi: function (modalApi) {
                                advancedApi = modalApi;
                                advancedApi.on.ok(function (data) {
                                    _setAddressFields(data.modalScope.groupsFields);
                                    _refreshData();
                                });
                            }
                        }
                    },
                    ]
                },
                {
                    title: 'features.transaction.tabs.titleGroups.additionalInformation',
                    IsExpandable: true,
                    fields: [
                        {
                            title: 'features.transaction.tabs.order.fields.groupId',
                            name: 'Attributes.GroupID',
                            type: INPUT_TYPES.LABEL,
                            IsEditable: false
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.lineOfBusiness',
                            name: 'Attributes.LineOfBusiness',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.activityType',
                            name: 'Attributes.ActivityType',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.offerId',
                            name: 'Attributes.OfferID',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.offerCode',
                            name: 'Attributes.OfferCode',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.actionCode',
                            name: 'Attributes.ActionCode',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.lastStatusDate',
                            name: 'Attributes.LastStatusDate',
                            type: INPUT_TYPES.DATE,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.previousStatus',
                            name: 'Attributes.PreviousStatus',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.productLevel',
                            name: 'Attributes.ProductLevel',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.totalOcAmmount',
                            name: 'Attributes.TotalOcAmount',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.totalRcAmmount',
                            name: 'Attributes.TotalRcAmount',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.familyCode',
                            name: 'Attributes.FamilyCode',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.relatedProductId',
                            name: 'Attributes.RelatedProductID',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.quantity',
                            name: 'Attributes.Quantity',
                            type: INPUT_TYPES.STRING,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.comments',
                            name: 'Attributes.Comments',
                            type: INPUT_TYPES.TEXTAREA,
                            colSpan: 2
                        }
                    ]
                },
               cdmService.AttributeType(),
            ]
        },
        portingInfo: {
            title: 'features.transaction.tabs.order.views.PortingInfo',
            viewDetails: [
                {
                    title: 'features.transaction.tabs.titleGroups.generalDetails',
                    IsExpandable: true,
                    fields: [
                        {
                            title: 'features.transaction.tabs.order.fields.CarrierID',
                            name: 'CarrierID',
                            type: INPUT_TYPES.LABEL,
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.CarrierCustomerID',
                            name: 'CarrierCustomerID',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.CarrierIdentificationPhone',
                            name: 'CarrierIdentificationPhone',
                            type: INPUT_TYPES.PHONE,
                            isAdditional: false
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.CarrierIdentificationPhoneAdditional',
                            name: 'CarrierIdentificationPhone',
                            type: INPUT_TYPES.PHONE,
                            isAdditional: true
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.EndOfTermDate',
                            name: 'EndOfTermDate',
                            type: INPUT_TYPES.DATE
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.EndOfTermMode',
                            name: 'EndOfTermMode',
                            type: INPUT_TYPES.CHECKBOX
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.HandIeDataLaterInd',
                            name: 'HandIeDataLaterInd',
                            type: INPUT_TYPES.CHECKBOX
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.CarrierContractCancelInd',
                            name: 'CarrierContractCancelInd',
                            type: INPUT_TYPES.CHECKBOX
                        },
                        {
                            title: 'features.transaction.tabs.order.fields.PortAllNumbersInd',
                            name: 'PortAllNumbersInd',
                            type: INPUT_TYPES.CHECKBOX
                        },

                    ]
                },
                cdmService.PhoneType('features.transaction.tabs.order.fields.PortingPhone'),
                cdmService.AttributeType(),
                cdmService.TargetType()
            ]
        }
    };
}

module.exports = TRANSACTION_ORDER_VIEWS;