// This module includes UI functions. 

define(function(require, exports, module) {
    var _w = _.isEmpty(global) ? window : global;
    module.exports = {
        getBodyView: function() {
            return $('body', _w);
        },
        getAppContainer: function() {
            return $('.cxm-app-mobile-view-wrapper', _w);
        },
        getPullDownToRefreshArea: function() {
            return $('.cxm-pull-down-to-refresh-wrapper', _w);
        }
    }
});