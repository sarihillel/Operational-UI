var cdmService = function (INPUT_TYPES, INPUT_OPTIONS, $filter, ouDynamicFormGroupService) {
    'ngInject';
    var AddressGroups = function (prefix) {
        prefix = typeof (prefix) == 'undefined' ? 'Address.' : prefix;

        return [{
            title: 'features.search.fields.transactionInfo',
            IsExpandable: false,
            fields: [
                {
                    title: 'features.transaction.tabs.address.sourceAddressID',
                    name: prefix + 'S_AddressID',
                    type: INPUT_TYPES.STRING,
                },
            {
                title: 'features.transaction.tabs.address.targetAddressID',
                name: prefix + 'T_AddressID',
                type: INPUT_TYPES.STRING,
            },
            {
                title: 'features.transaction.tabs.address.streetAddress1',
                name: prefix + 'StreetAddress1',
                type: INPUT_TYPES.STRING,
            },
            {
                title: 'features.transaction.tabs.address.streetAddress2',
                name: prefix + 'StreetAddress2',
                type: INPUT_TYPES.STRING
            },
            {
                title: 'features.transaction.tabs.address.streetNumber',
                name: prefix + 'StreetNumber',
                type: INPUT_TYPES.STRING,
            },
            {
                title: 'features.transaction.tabs.address.poBox',
                name: prefix + 'PoBox',
                type: INPUT_TYPES.STRING,
            },
            {
                title: 'features.transaction.tabs.address.zip',
                name: prefix + 'Zip',
                type: INPUT_TYPES.STRING,
            },
            {
                title: 'features.transaction.tabs.address.city',
                name: prefix + 'City',
                type: INPUT_TYPES.STRING
            },
            {
                title: 'features.transaction.tabs.address.state',
                name: prefix + 'State',
                type: INPUT_TYPES.STRING,
            },
            {
                title: 'features.transaction.tabs.address.country',
                name: prefix + 'Country',
                type: INPUT_TYPES.STRING
            }
            ]
        }
        ]
    };
    var AddressValues = function (prefix) {
        prefix = typeof (prefix) == 'undefined' ? 'Address.' : prefix;

        return [
        {
            name: prefix + 'PoBox',
            charBefore: 'PO Box ',
            charAfter: ','
        },
        {
            name: prefix + 'City',
            charBefore: ' ',
            charAfter: ','
        },
        {
            name: prefix + 'State',
            charBefore: ' ',
            charAfter: ' '
        },
        {
            name: prefix + 'Zip',
            charBefore: '',
            charAfter: ','
        },
        {
            name: prefix + 'Country',
            charBefore: ' ',
            charAfter: ''
        }
        ];
    };
    var AttributeType = function (prefix) {
        prefix = typeof (prefix) == 'undefined' ? 'Attributes.' : prefix;
        return {
            title: 'features.transaction.tabs.titleGroups.attributes',
            IsExpandable: true,
            fields: [{
                type: 'grid',
                colSpan: 2,
                gridOptions: {
                    name: prefix + "Attribute",
                    columnDefs: [
                        { name: "Code", type: INPUT_TYPES.STRING, displayName: "Attribute Name" },
                        { name: "Value", type: INPUT_TYPES.STRING, displayName: "Attribute Value" },
                        { name: "AdditionalValue", type: INPUT_TYPES.STRING, displayName: "Additional Value" }
                    ],
                    rowTemplate: 'ui-grid/ui-grid-row-custom',
                }
            }]
        }
    };

    return {
        AttributeType: AttributeType,
        AddressType: AddressGroups,
        AddressValues: AddressValues,
        AddressListType: function (title, addressTitle) {
            return {
                title: title || 'features.transaction.tabs.titleGroups.Address',
                IsExpandable: true,
                fields: [
                    {
                        type: 'grid',
                        colSpan: 2,
                        gridOptions: {
                            name: 'Address',
                            columnDefs: [
                                {
                                    name: 'edit',
                                    displayName: "",
                                    enableCellEdit: false,
                                    cellTemplate: 'ui-grid/popup-cell',
                                    width: '2%',
                                    popupOptions: {
                                        title: $filter('translate')(title || 'features.transaction.tabs.titleGroups.Address'),
                                        templateUrl: 'ui-grid/ou-dynamic-form-group',
                                        showModal: false,
                                        okButton: 'Save',
                                        modalScope: {
                                            options: {
                                                chunkGroups: 1,
                                                chunkFields: 2,
                                            },
                                            groupsFields: AddressGroups()
                                        },
                                        onRegisterApi: function (modalApi) {
                                            modalApi.on.open(function (popupOptions, $scope) {
                                                var data = {
                                                    Address: $scope.row.entity
                                                };
                                                ouDynamicFormGroupService.setGroupsValues(data, popupOptions.modalScope.groupsFields);
                                            });

                                            modalApi.on.ok(function (popupData, $scope) {
                                                var data = {
                                                    Address: $scope.row.entity
                                                };
                                                ouDynamicFormGroupService.setDataValues(data, popupData.modalScope.groupsFields);
                                            });
                                        }
                                    }

                                },
                                {
                                    displayName: $filter('translate')(addressTitle || 'features.transaction.tabs.titleGroups.Address'),
                                    name: 'address',
                                    enableCellEdit: false,
                                    cellTemplate: '<span>PO Box {{row.entity.PoBox}}, {{row.entity.Zip}}, {{row.entity.City}} {{row.entity.State}},{{row.entity.Country}}</span>',
                                }
                            ],
                            rowTemplate: 'ui-grid/ui-grid-row-custom',
                        }
                    }
                ]
            }
        },
        CommissionType: function (prefix) {
            prefix = typeof (prefix) == 'undefined' ? prefix + '' : prefix;

            return {
                title: 'features.transaction.tabs.titleGroups.commission',
                IsExpandable: true,
                fields: [
                     {
                         title: 'features.transaction.tabs.fields.commission.eShopCode',
                         name: prefix + 'eShopCode',
                         type: INPUT_TYPES.LABEL
                     },
                    {
                        type: 'grid',
                        colSpan: 2,
                        gridOptions: {
                            name: prefix + 'SalesOrganization',
                            columnDefs: [
                                {
                                    name: "Type",
                                    editableCellTemplate: 'ui-grid/dropdownEditor',
                                    editDropdownOptionsArray: _.map(INPUT_OPTIONS.SalesOrganization_TYPE, function (k, v) { return { id: k, value: v } }),
                                    editDropdownIdLabel: 'id',
                                    editDropdownValueLabel: 'value',
                                    displayName: $filter('translate')('features.transaction.fields.commission.salesOrganizationType'),
                                },
                                { name: "Number", type: INPUT_TYPES.STRING, displayName: $filter('translate')('features.transaction.fields.commission.salesOrganizationNumber') },
                                { name: "Name", type: INPUT_TYPES.STRING, displayName: $filter('translate')('features.transaction.fields.commission.salesOrganizationName') }
                            ],
                            rowTemplate: 'ui-grid/ui-grid-row-custom',
                        }
                    }]
            }
        },
        PhoneType: function (title, phoneTitle, additionalTitle) {

            return {
                title: $filter('translate')(title || 'features.transaction.fields.phone.name'),
                IsExpandable: true,
                fields: [
                   {
                       type: 'grid',
                       colSpan: 2,
                       gridOptions: {
                           name: 'Phone',
                           RowHeight: 32,
                           columnDefs: [
                               {
                                   name: 'phone',
                                   type: INPUT_TYPES.STRING,
                                   displayName: $filter('translate')(phoneTitle || 'features.transaction.fields.phone.name'),
                                   enableCellEdit: false,
                                   cellTemplate: '<ou-input-phone phone-model="row.entity"  is-additional="false" >',
                               },
                               {
                                   name: 'additionalPhone',
                                   type: INPUT_TYPES.STRING,
                                   displayName: $filter('translate')(additionalTitle || 'features.transaction.fields.phone.additional'),
                                   enableCellEdit: false,
                                   cellTemplate: '<ou-input-phone phone-model="row.entity"  is-additional="true" >',
                               }
                           ],
                           rowTemplate: 'ui-grid/ui-grid-row-custom',
                       }
                   }]
            }
        },
        TargetType: function () {
            var attributesGroup = AttributeType();
            attributesGroup.IsExpandable = false;
            return {
                title: 'features.transaction.tabs.titleGroups.target',
                IsExpandable: true,
                fields: [
                    {
                        type: 'grid',
                        colSpan: 2,
                        gridOptions: {
                            name: 'Target',
                            columnDefs: [
                                { name: "EntityID", type: INPUT_TYPES.STRING, displayName: "Entity ID" },
                                { name: "T_EntityID", type: INPUT_TYPES.STRING, displayName: "Target Entity ID", width: '17%' },
                                { name: "Name", type: INPUT_TYPES.STRING, displayName: "Target Name" },
                                { name: "Status", type: INPUT_TYPES.STRING, displayName: "Status" },
                                { name: "Message.Code", type: INPUT_TYPES.STRING, displayName: "Code" },
                                { name: "Message.Description", type: INPUT_TYPES.STRING, displayName: "Description" },
                                 {
                                     name: 'edit',
                                     displayName: $filter('translate')('features.transaction.tabs.titleGroups.attributes'),
                                     enableCellEdit: false,
                                     cellTemplate: 'ui-grid/popup-cell',
                                     popupOptions: {
                                         title: $filter('translate')('features.transaction.tabs.titleGroups.attributes'),
                                         templateUrl: 'ui-grid/ou-dynamic-form-group',
                                         showModal: false,
                                         okButton: 'Save',
                                         modalScope: {
                                             options: {
                                                 chunkGroups: 1,
                                                 chunkFields: 2,
                                             },
                                             groupsFields: [attributesGroup]
                                         },
                                         onRegisterApi: function (modalApi) {
                                             modalApi.on.open(function (popupOptions, $scope) {
                                                 var data = $scope.row.entity;
                                                 ouDynamicFormGroupService.setGroupsValues(data, popupOptions.modalScope.groupsFields);
                                             });

                                             modalApi.on.ok(function (popupData, $scope) {
                                                 var data = $scope.row.entity;
                                                 ouDynamicFormGroupService.setDataValues(data, popupData.modalScope.groupsFields);
                                             });
                                         }
                                     }

                                 }
                            ],

                            rowTemplate: 'ui-grid/ui-grid-row-custom',
                        }
                    }]
            }
        },
        ContractType: function () {

            return {
                title: 'features.transaction.tabs.titleGroups.contracts',
                IsExpandable: true,
                fields: [
                    {
                        type: 'grid',
                        colSpan: 2,
                        gridOptions: {
                            name: 'ContractRef',
                            columnDefs: [
                                {
                                    name: "References",
                                    displayName: $filter('translate')('features.transaction.tabs.customer.fields.contractID'),
                                    type: INPUT_TYPES.STRING
                                },
                            ],
                            rowTemplate: 'ui-grid/ui-grid-row-custom',
                        }
                    }]
            }
        },
    };
}

module.exports = cdmService;