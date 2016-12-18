'use strict';
var localStorage = function () {
	'ngInject';

    /*****************************************************/
    /*               PUBLIC                              */
    /*****************************************************/
    this.set = function (key, value) {
        if (typeof (value) != 'string')
            value = JSON.stringify(value);
        localStorage[key] = value;
    };

    this.get = function (key) {
        if (key)
            return localStorage[key];
        return undefined;
    };

    this.removeItem = function (key) {
        localStorage.removeItem(key);

    }
};

module.exports = localStorage;