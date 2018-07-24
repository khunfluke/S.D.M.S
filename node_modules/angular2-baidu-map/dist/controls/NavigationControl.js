export var setNavigationCtrl = function (map, opts) {
    var BMap = window['BMap'];
    //enable NavigationControl
    var navOpts = {};
    if (typeof opts.navCtrl !== 'boolean') {
        var ctrl = opts.navCtrl;
        if (ctrl.anchor) {
            navOpts.anchor = ctrl.anchor;
        }
        if (ctrl.offset) {
            navOpts.offset = new BMap.Size(ctrl.offset.width, ctrl.offset.height);
        }
        if (typeof ctrl.type !== 'undefined') {
            navOpts.type = ctrl.type;
        }
        if (typeof ctrl.showZoomInfo !== 'undefined') {
            navOpts.showZoomInfo = ctrl.showZoomInfo;
        }
        if (typeof ctrl.enableGeolocation !== 'undefined') {
            navOpts.enableGeolocation = ctrl.enableGeolocation;
        }
        map.addControl(new BMap.NavigationControl(navOpts));
    }
    else if (opts.navCtrl) {
        map.addControl(new BMap.NavigationControl());
    }
};
;
