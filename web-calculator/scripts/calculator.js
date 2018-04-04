$(function() {
    var _c = {
        'str': '',
        'calculateFinishedFlag': false
    };
    var _cal = function(fnStr) {
        var r1;
        try {
            r1 = (new Function('return (' + fnStr + ');'))();
        } catch (error) {
            r1 = 0;
        }
        return r1;
    };
    window.jmlclt = _c;
    document.onselectstart = function(){
        return false;
    };
    _c.$monitor = $('.jml-ctl-monitor');
    _c.calculate = function() {
        var r = _cal(_c.str);
        return r;
    };
    _c.updateMonitor = function(text) {
        var t = ($.isEmptyObject(text)) ? _c.str : text;
        _c.$monitor.text(t);
    };
    _c.buttonClickHandler = function(btn) {
        var btnKey = btn.data('btnkey');
        switch(btnKey) {
            case 'c':
                _c.str = '';
                break;
            case '=':
                _c.str = _c.calculate() + '';
                _c.calculateFinishedFlag = true;
                break;
            case 'd':
                _c.str = _c.str.slice(0, _c.str.length - 1);
                break;
            default:
                if (_c.str.length >= 12) {return;}
                _c.str = (_c.str === '0') ? btnKey : (_c.str + btnKey);
                break;
        }
        _c.updateMonitor();
    };
    $('.jml-clt-btn').on('click', function(event) {
        var $btn = $(event.target);
        if (!$btn.is('.jml-clt-btn')) {
            return;
        }
        _c.buttonClickHandler($btn);
    });
});
