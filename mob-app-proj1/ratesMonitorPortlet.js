// This is a portlet of a mobile app created by jQuery UI Widget Factory. 

define(function(require, exports, module) {
    var __dataConverter = require('data/converter/commentaryPortletDataConverter'),
        // __uiUtils = require('data/utils/ui'),
        __sendUtils = require('common/send'),
        __portletTitle = requier('view/portlets/portletTitle');
    var __commonGridPortletView = require('view/portlets/commonGridPortlet');
    require('view/widgets/cxmSimpleGrid');
    $.widget( "cxm.ratesMonitorPortlet", __commonGridPortlet, {
        options: {
            portletCode: 'cxm-portlet-rates-monitor'
        },
        create: function() {
            this._super();
        },
        _render: function() {
            var self = this, defaultTab, props = this.portlet.properties, _portletData = this.portlet.sourceData;
            self.super();
            $(self.$portletBody.find('.cxm-content-area')).append(self._generateGrid());
            self.$tabs = $(self.$portletBody.find('.c-r-m-tab'));
            defaultTab = props['productType'] || _portletData.products[0].key;
            self._showOneTab(defaultTab);
        },
        _bindEvents: function() {
            var self = this;
            self._on({
                'click .c-r-m-tab-btn': self._switchTab
            });
        },
        _generateGrid: function() {
            var h = [], h2 = [], _portletData = this.portlet.sourceData;
            h.push('<div class="cxm-rates-monitor-grid">');
                h.push('<div class="c-r-m-tab-bar">');
                _.each(_portletData.products, function(prod) {
                    h.push('<div class="c-r-m-tab-btn" data-tabkey="');
                    h.push(prod.key);
                    h.push('" display="none"></div>');
                    h2.push('<div class="c-r-m-tab" data-tabname="');
                    h2.push(prod.key);
                    h2.push('"></div>')
                });
                h.push('</div>');
                h.push('<div class="c-r-m-content-tabs">');
                h.push(h2.join(''));
                h.push('</div>');
            h.push('</div>');
            return h.join('');
        },
        _switchTab: function(event) {
            var $tabBtn = $(event.target).closest('.c-r-m-tab-bar');
            var newTabName = $tabBtn.data('tabkey');
            this._showOneTab(newTabName);
        },
        _showOneTab: function(tabName) {
            this.$tabs.hide();
            $(this.$portletBody.find('.c-r-m-tab[data-tabname="'+tabName+'"]')).show();
        },
        _saveUserPrefrence: function(tabName) {
            var self = this, ts = (new Date()).getTime();
            __sendUtils.savePortletPreference({
                data: {
                    'productType': tabName,
                    'timeStamp': ts
                }
            });
        },
        getLibratorSubjects: function() {
            var r = [], _portletData = this.portlet.sourceData;
            _.each(_portletData.subscriptions, function(subc) {
                r.push((subc + '').trim());
            });
            return r;
        },
        destroy: function() {
            this.super();
        }
    });
    return $.cxm.ratesMonitorPortlet;
});