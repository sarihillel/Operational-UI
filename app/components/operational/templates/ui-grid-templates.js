'use strict';

var searchListTemplate = function ($templateCache) {
    'ngInject';

    $templateCache.put('ui-grid/expandableTopRowHeaderCustom',
        "<div class=\"ui-grid-row-header-cell\" ></div>"
    );

    $templateCache.put('ui-grid/expandableRowHeaderCustom',
        "<div class=\"ui-grid-row-header-cell ui-grid-expandable-buttons-cell\" ng-click=\"grid.api.expandable.toggleRowExpansion(row.entity)\" ng-dblclick=\"$event.stopPropagation();\"><div class=\"ui-grid-cell-contents operatinal-color-icons pointer-cursor\"><i ng-if=\"!row.groupHeader==true\" ng-class=\"{ 'fa fa-sort-desc' : !row.isExpanded, 'fa fa-sort-asc' : row.isExpanded }\" ></i></div></div>"
    );

    $templateCache.put('ui-grid/ui-grid-row-custom',
        "<div ng-class=\"{'isExpanded':row.isExpanded }\" class='grid-row' ng-dblclick='grid.appScope.onDblClick(row)'><div ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.uid\" ui-grid-one-bind-id-grid=\"rowRenderIndex + '-' + col.uid + '-cell'\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" role=\"{{col.isRowHeader ? 'rowheader' : 'gridcell'}}\" ui-grid-cell></div></div>"
    );

    $templateCache.put('ui-grid/ui-grid-add-row',
    "<a ng-click='grid.appScope.AddRow('Billing')'>Add Row</a>"
    );

    $templateCache.put('ui-grid/phone',
        "<div ng-style=\"{'margin-left': '5px'}\" ><span>{{row.entity.CountryCode}}</span><span> - </span>" +
        "<span>{{row.entity.AreaCode}} </span>" +
        "<span>{{row.entity.COP}} </span>" +
        "<span>{{row.entity.LineNumber}}</span></div>"
    );

    $templateCache.put('ui-grid/additional-phone',
        "<div ng-style=\"{'margin-left': '5px'}\" ><span>{{row.entity.AddCountryCode}}</span><span> - </span>" +
        "<span>{{row.entity.AddAreaCode}} </span>" +
        "<span>{{row.entity.AddCOP}} </span>" +
        "<span>{{row.entity.AddLineNumber}}</span></div>"
    );

    $templateCache.put('ui-grid/popup-cell',
        "<a class=\"popup-link\"><ou-modal options=\"col.colDef.popupOptions\"><i class=\"fa fa-edit\"></i></ou-modal></a>"
    );

    $templateCache.put('ui-grid/ou-dynamic-form-group',
        "<ou-dynamic-form-group ng-init=\"showModal=true\" groups=\"modalScope.groupsFields\" options=\"modalScope.options\"></ou-dynamic-form-group>"
    );

    $templateCache.put('ui-grid/treeBaseRowHeaderButtons-withName-error',
       "<div class=\"ui-grid-tree-base-row-header-buttons\" ng-class=\"{'ui-grid-tree-base-header': row.treeLevel > -1  ,'selectable':!row.entity.notSelectable   }\" >" +
           "<i class='error' ng-if=\"grid.appScope.showErrors()\" " +
              "  popover-class=\"popover-error\"  " +
              "  popover-placement=\"top\"  " + 
              "  popover-append-to-body='true'  " +
              "  popover=\"{{row.entity.Attributes.ErrorDescription}}\"  " +
              "  popover-trigger=\"mouseenter\"  " +
              " ng-class=\"{'has-error': row.entity.$$hasError && !row.entity.$$isError ,'is-error': row.entity.$$isError }\" ></i>" +
           "<i class='isTargetError' ng-if=\"::grid.appScope.showTargetErrors()\" ng-style=\"{'visibility': row.entity.$$isTargetError? 'visible': 'hidden' }\"></i>" +
           "<i ng-click=\"grid.appScope.toggleRow(row, $event)\"  ng-class=\"{ 'ui-grid-icon-minus-squared':  row.treeNode.state === 'expanded', 'ui-grid-icon-plus-squared':  row.treeNode.state === 'collapsed'}\" ng-style=\"{'padding-left': grid.options.treeIndent * row.treeLevel + 'px' , 'visibility': (( grid.options.showTreeExpandNoChildren && row.treeLevel > -1 ) || ( row.treeNode.children && row.treeNode.children.length > 0 ) )? 'visible': 'hidden' }\"></i>" +
           "&nbsp;{{COL_FIELD CUSTOM_FILTERS}}" +
       "</div>"
   );
    $templateCache.put('ui-grid/treeBaseRowHeaderButtons-withName',
      "<div class=\"ui-grid-tree-base-row-header-buttons\" ng-class=\"{'ui-grid-tree-base-header': row.treeLevel > -1  ,'selectable':!row.entity.notSelectable   }\" >" +
          "<i ng-click=\"grid.appScope.toggleRow(row, $event)\"  ng-class=\"{ 'ui-grid-icon-minus-squared':  row.treeNode.state === 'expanded', 'ui-grid-icon-plus-squared':  row.treeNode.state === 'collapsed'}\" ng-style=\"{'padding-left': grid.options.treeIndent * row.treeLevel + 'px' , 'visibility': (( grid.options.showTreeExpandNoChildren && row.treeLevel > -1 ) || ( row.treeNode.children && row.treeNode.children.length > 0 ) )? 'visible': 'hidden' }\"></i>" +
          "&nbsp;{{COL_FIELD CUSTOM_FILTERS}}" +
      "</div>"
  );

};

module.exports = searchListTemplate;
