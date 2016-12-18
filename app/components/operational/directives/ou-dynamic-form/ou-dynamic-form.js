'use strict';
var directive = function ($log) {
    'ngInject'

    var directive = {
        restrict: 'E',
        templateUrl: './components/operational/directives/ou-dynamic-form/ou-dynamic-form.html',
        scope: {
            model: '=',
            saveChanges: '&',
            dirtyFormFlag: '=?'
        },
        link: linkFunc
    };

    return directive;
    /*
       model structure:
        model = {
           //name: - form name - to be used for validation
           fields: [
               {
                   name:  - field name,
                   type: - one of INPUT_TYPE_ENUM ,
                   label: - input label,
                   placeholder: - input place holder (where possible) ,
                   minLength: - optional - for text input
                   maxLength: - optional - for text input
                   min: - optional - for number input
                   max: - optional - for number input
                   value: - the initial field value (will hold the value for the input)
                       selectOptions: - used for select only
                       [
                           value: - the option value
                           label: - tha option display
                       ]
                       radioGroup: - used for radio buttons group only
                       [
                        value: - the option value
                        label: - tha option display
                       ]
               }
           ]
        }
        */

    // $scope.model = {
    // 	fields: [
    // 		{
    // 			name: 'text_input',
    // 			type: 'text',
    // 			label: 'text_input label',
    // 			placeholder: 'text_input placeholder',
    // 			value: 'text_input value',
    // 			minLength: '0', //optional
    // 			maxLength: '10' //optional
    // 		},
    // 		{
    // 			name: 'number_input',
    // 			type: 'number',
    // 			label: 'number_input label',
    // 			placeholder: 'number_input placeholder',
    // 			value: 0,
    // 			min: '0', //optional
    // 			max: '9' //optional
    // 		},
    // 		{
    // 			name: 'email_input',
    // 			type: 'email',
    // 			label: 'email_input label',
    // 			placeholder: 'email_input placeholder',
    // 			value: 'email_input value'
    // 		},
    // 		{
    // 			name: 'checkbox_input',
    // 			type: 'checkbox',
    // 			label: 'checkbox_input label',
    // 			placeholder: 'checkbox_input placeholder',
    // 			value: 'checkbox_input value'
    // 		},
    // 		{
    // 			name: 'select_input',
    // 			type: 'select',
    // 			label: 'select_input label',
    // 			placeholder: 'select_input placeholder',
    // 			value: "select_input value",
    // 			selectOptions:
    // 				[
    // 					{
    // 						value: 'value 1',
    // 						label: 'label 1'
    // 					},
    // 					{
    // 						value: 'value 2',
    // 						label: 'label 2'
    // 					},
    // 					{
    // 						value: 'value 3',
    // 						label: 'label 3'
    // 					}
    // 				]
    // 		},
    // 		{
    // 			name: 'radio_group',
    // 			type: 'radio',
    // 			label: 'radio_group label',
    // 			placeholder: 'radio_group placeholder',
    // 			value: 'radio_group 1',
    // 			radioOptions:
    // 			[
    // 				{
    // 					value: 'value 1',
    // 					label: 'label 1'
    // 				},
    // 				{
    // 					value: 'value 2',
    // 					label: 'label 2'
    // 				},
    // 				{
    // 					value: 'value 3',
    // 					label: 'label 3'
    // 				}
    // 			]
    // 		}
    // 	]
    // }
    //
    // $scope.valueModel = [];

    // var getValueModel = function()
    // {
    // 	angular.forEach($scope.model.fields, function(field)
    // 	{
    // 		$scope.valueModel.push({(field.name + ""): field.value});
    // 	})
    function linkFunc(scope, elem, attrs) {

        /* ***************************************************
                  VARIABLES
         **************************************************** */






        /*****************************************************
        *               METHODS - PRIVATE                   *
        *****************************************************/

        var initialize = function () {
        };




        /*****************************************************
         *                  METHODS                          *
         *****************************************************/


        //raising a flag when form has changed 
        scope.$watch(function () { return scope.dynamicForm.$dirty; }, function () {
            scope.dirtyFormFlag = scope.dynamicForm.$dirty;
        });

        //after saving changes - we need to reset the form.
        //scope.$watch(function () { return scope.dirtyFormFlag; }, function () {
        //    if (!scope.dirtyFormFlag) {
        //        scope.dynamicForm.$setPristine();
        //    }
        //});

        /*****************************************************
         *                  EXECUTIONS                       *
         *****************************************************/

        initialize();
    }
}


module.exports = directive;