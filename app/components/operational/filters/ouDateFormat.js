'use strict';

var ouDateFormat = function ($filter, DATE_FORMAT, moment) {
    'ngInject';
    /*
     * @description: return date from one fomrmat to another format
     * @param: {date} -date object/string format, input date to format
     * @param: {isServer} -boolean, flag if defualt {toFormat, fromFormat} will reverse, 
     *              cause only if (toFormat,fromFormat}=undefined
     * @param:{toFormat} - string, the converting format 
     * @param:{fromFormat} - string,  input format (of date param)
     * 
     * @examples:
     * DATE_FORMAT.server: 'YYYYMMDD'
     * DATE_FORMAT.client: 'DD/MM/YY'
     * $filter("ouDateFormat")(new Date())->"08/09/16" (today date)
     * $filter("ouDateFormat")('20161203') ->"03/12/16"
     * $filter("ouDateFormat")("03/12/16",true)->"20161203"
     * $filter("ouDateFormat")("")->''
     * $filter("ouDateFormat")("03/25/16")-> false
     * $filter("ouDateFormat")("03/25/16",false,'','MM/DD/YYYY')->"25/03/16"
     * $filter("ouDateFormat")("03/25/16",true,'','MM/DD/YYYY')->"25/03/16"
     */
    return function (date, isServer, toFormat, fromFormat) {
        var format = toFormat;
        var currentFormat = fromFormat;

        if (typeof (format) == 'undefined' && typeof (currentFormat) == 'undefined') {
            if (isServer) {
                format = DATE_FORMAT.server;
                currentFormat = DATE_FORMAT.client;
            }
            else {
                format = DATE_FORMAT.client;
                currentFormat = DATE_FORMAT.server;
            }
        }
        else {
            if (!format)
                format = DATE_FORMAT.client;
            if (!currentFormat)
                currentFormat = DATE_FORMAT.server;
        }        

        if (_.isDate(date)) {
            return date ? $filter("amDateFormat")(date, format) : '';
        }
        //timezone of comuter of client
        // var timezone = new Date().toString().match(/([-\+][0-9]+)\s/)[1];
        var timezone = '';
        return date ? $filter("amDateFormat")(date, format, 'utc', timezone, currentFormat) : '';
    };
};

module.exports = ouDateFormat;