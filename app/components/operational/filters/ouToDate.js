'use strict';

var ouToDate = function (DATE_FORMAT, moment) {
    'ngInject';
    /*
     * @description: convert string of custom date format to date object
     * @param {date}: string of date format
     * @param {isServer}: -true/false - flag if defualt format will be server or client 
     * @param {format}: format of the date, if format is not suplied defualt will be client/server
     * 
     * @examples:
     * DATE_FORMAT.server: 'YYYYMMDD'
     * DATE_FORMAT.client: 'DD/MM/YY'
     * $filter('ouToDate')('25/12/16')->Sun Dec 25 2016 00:00:00..
     * $filter('ouToDate')('20161225',true) -> Sun Dec 25 2016 ..
     * $filter('ouToDate')('08/25/16',false,'MM/DD/YY')->Thu Aug 25 2016 00:00:00
     * $filter('ouToDate')('08/25/16',true,'MM/DD/YY')->Thu Aug 25 2016 00:00:00.. //format is supplied so not put attation to isServer flag
     */
    return function (date, isServer, format) {
        var mformat = format;
        if (!format)
            if (isServer)
                mformat = DATE_FORMAT.server;
            else mformat = DATE_FORMAT.client;

        return date?moment(date, mformat).toDate():'';
    };
};

module.exports = ouToDate;