// Holds all of the utility functions that are widely used in the application
'use strict';
var Helper = function ($filter) {
    'ngInject';

    // Receives a parent node & a child node, checks whether the child node is contained within the parent node
    this.isDescendant = function (parent, child) {
        var node = child.parentNode;
        while (node !== null) {
            if (node == parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    };

    /*
     * @description: sort to elements, alpha and nums , suit to .sort algorithm
     */
    this.sortAlphaNum = function sortAlphaNum(a, b) {
        var AInt = parseInt(a, 10);
        var BInt = parseInt(b, 10);

        if (_.isNumber(a) == false && _.isNumber(b) == false) {
            var aA = a
            var bA = b;
            return aA > bA ? 1 : -1;
        } else if (_.isNumber(a) == false) {  // A is not an Int
            return 1;    // to make alphanumeric sort first return -1 here
        } else if (_.isNumber(b) == false) {  // B is not an Int
            return -1;   // to make alphanumeric sort first return 1 here
        } else {
            return AInt > BInt ? 1 : -1;
        }
    }

    /*
     * @description: set tree node with flattern data by parentID column
     */
    function TreeNode(data) {
        this.data = data;
        this.parent = null;
        this.children = [];
    }
    TreeNode.prototype.walk = function (f, recursive, level) {
        if (level == undefined) level = 0;
        for (var i = 0, l = this.children.length; i < l; i++) {
            var child = this.children[i];
            child.level = level;
            f.apply(child, Array.prototype.slice.call(arguments, 2));
            if (recursive) child.walk(f, recursive, level + 1);
        }
    };
    function toTree(data, keyField, parentField) {
        var nodeById = {}, i, l = data.length, node;
        nodeById[0] = new TreeNode();
        for (i = 0; i < l; i++) {
            nodeById[data[i][keyField]] = new TreeNode(data[i]);
        }

        for (i = 0; i < l; i++) {
            node = nodeById[data[i][keyField]];
            var parentId = node.data[parentField] || 0;
            node.parent = nodeById[parentId];
            node.parent.children.push(node);
        }
        return nodeById[0];
    }
    function sortArrayLikeInTreeOrder(data, keyField, parentField, level, doInRowTree) {
        var newdata = [];
        level = level || 0;
        toTree(data, keyField, parentField)
          .walk(function () {
              this.data.$$treeLevel = this.level;
              newdata.push(this.data);
              doInRowTree.apply(this);
          }, true, level);
        return newdata;
    }
    this.sortArrayLikeInTreeOrder = sortArrayLikeInTreeOrder;

};

module.exports = Helper;

