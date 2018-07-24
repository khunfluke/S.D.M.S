export var setOverviewMapCtrl = function (map, opts) {
    var BMap = window['BMap'];
    //enable OverviewMapControl
    var overviewOpts = {};
    if (typeof opts.overviewCtrl !== 'boolean') {
        var ctrl = opts.overviewCtrl;
        if (ctrl.anchor) {
            overviewOpts.anchor = ctrl.anchor;
        }
        if (ctrl.offset) {
            overviewOpts.offset = new BMap.Size(ctrl.offset.width, ctrl.offset.height);
        }
        if (ctrl.size) {
            overviewOpts.size = new BMap.Size(ctrl.size.width, ctrl.size.height);
        }
        if (typeof ctrl.isOpen !== 'undefined') {
            overviewOpts.isOpen = ctrl.isOpen;
        }
        map.addControl(new BMap.OverviewMapControl(overviewOpts));
    }
    else if (opts.overviewCtrl) {
        map.addControl(new BMap.OverviewMapControl());
    }
};
;
