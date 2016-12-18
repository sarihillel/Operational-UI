var TRANSACTION_BILLING_VIEWS = function (INPUT_TYPES, cdmService) {
    'ngInject';

    return {
        billingAccount: {
            title: 'features.transaction.tabs.billing.views.generalDetails',
            viewDetails: [
                {
                    title: 'features.transaction.tabs.billing.titleGroups.generalDetails',
                    IsExpandable: true,
                    fields: [
                        {
                            title: 'features.transaction.tabs.billing.fields.sourceAccountId',
                            name: 'S_AccountID',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.billing.fields.targetAccountId',
                            name: 'TargetBillingAccountID',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.billing.fields.salutation',
                            name: 'PersonalDetails.Salutation',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.billing.fields.idCard',
                            name: 'PersonalDetails.IdCard',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.billing.fields.title',
                            name: 'PersonalDetails.Title',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.billing.fields.birthDate',
                            name: 'PersonalDetails.BirthDate',
                            type: INPUT_TYPES.DATE
                        },
                        {
                            title: 'features.transaction.tabs.billing.fields.firstName',
                            name: 'PersonalDetails.FirstName',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.billing.fields.lastName',
                            name: 'PersonalDetails.LastName',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.billing.fields.maritalStatus',
                            name: 'PersonalDetails.MaritalStatus',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.billing.fields.profession',
                            name: 'PersonalDetails.Profession',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.billing.fields.chargeCode',
                            name: 'ChargeCode',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.billing.fields.letterBill',
                            name: 'LetterBillInd',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.billing.fields.electronicBill',
                            name: 'ElectronicBillInd',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.billing.fields.taxType',
                            name: 'TaxType',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.billing.fields.email',
                            name: 'PersonalDetails.Email',
                            type: INPUT_TYPES.STRING
                        }

                    ]
                },
                cdmService.PhoneType(),
                cdmService.AddressListType('features.transaction.tabs.billing.fields.billingAddress'),
                {
                    title: 'features.transaction.tabs.billing.titleGroups.bankDetails',
                    IsExpandable: true,
                    fields: [
                        {
                            title: 'features.transaction.tabs.billing.fields.bankCode',
                            name: 'BankCode',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.billing.fields.bankAccountName',
                            name: 'BankAcctName',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.billing.fields.bankAccountNumber',
                            name: 'BankAcctNum',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.billing.fields.bankAccountType',
                            name: 'BankAcctType',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.billing.fields.billingOffer',
                            name: 'BillingOffer',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.billing.fields.totalAmount',
                            name: 'TotalAmount',
                            type: INPUT_TYPES.STRING
                        }
                    ]
                },
                {
                    title: 'features.transaction.tabs.billing.titleGroups.creditCardDetials',
                    IsExpandable: true,
                    fields: [
                        {
                            title: 'features.transaction.tabs.billing.fields.creditCardNumber',
                            name: 'CreditCardNum',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.billing.fields.creditCardType',
                            name: 'CreditCardType',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.billing.fields.creditCardExp',
                            name: 'CreditCardExpire',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.billing.fields.creditCardSecCode',
                            name: 'CreditCardSecurityCode',
                            type: INPUT_TYPES.STRING
                        },
                        {
                            title: 'features.transaction.tabs.billing.fields.creditCardAuth',
                            name: 'CreditCardAuth',
                            type: INPUT_TYPES.STRING
                        }
                    ]
                },
                cdmService.TargetType(),
                cdmService.AttributeType(),
            ]
        }
    };
}

module.exports = TRANSACTION_BILLING_VIEWS;