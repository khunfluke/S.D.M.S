import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { MapStatus } from '../enum/MapStatus';
import { defaultOfflineOpts, defaultOpts } from '../defaults';
import { loader } from '../Loader';
import { reCenter, reZoom, redrawMarkers, createInstance } from '../CoreOperations';
var BaiduMap = (function () {
    function BaiduMap(el) {
        this.el = el;
        this.onMapLoaded = new EventEmitter();
        this.onMarkerClicked = new EventEmitter();
        this.onClicked = new EventEmitter();
        this.previousMarkers = [];
    }
    BaiduMap.prototype.ngOnInit = function () {
        var offlineOpts = Object.assign({}, defaultOfflineOpts, this.offlineOpts);
        this.offlineWords = offlineOpts.txt;
        loader(this.ak, offlineOpts, this._draw.bind(this), this.protocol);
    };
    BaiduMap.prototype.ngOnChanges = function (changes) {
        var baiduMap = window['baiduMap'];
        if (!baiduMap || baiduMap.status !== MapStatus.LOADED) {
            return;
        }
        if (changes['options'].isFirstChange() && !this.map) {
            return;
        }
        var opts = changes['options'].currentValue;
        reCenter(this.map, opts);
        reZoom(this.map, opts);
        redrawMarkers.bind(this)(this.map, this.previousMarkers, opts);
    };
    BaiduMap.prototype._draw = function () {
        var _this = this;
        var options = Object.assign({}, defaultOpts, this.options);
        this.map = createInstance(options, this.el.nativeElement);
        this.map.addEventListener('click', function (e) {
            _this.onClicked.emit(e);
        });
        this.onMapLoaded.emit(this.map);
        redrawMarkers.bind(this)(this.map, this.previousMarkers, options);
    };
    return BaiduMap;
}());
export { BaiduMap };
BaiduMap.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'baidu-map',
                styles: ["\n        .offlinePanel{\n            width: 100%;\n            height: 100%;\n            background-color: #E6E6E6;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            opacity: 0;\n        }\n    ", "\n        .offlineLabel{\n            font-size: 30px;\n        }\n    "],
                template: "\n        <div class=\"offlinePanel\">\n            <label class=\"offlineLabel\">{{ offlineWords }}</label>\n        </div>\n    "
            },] },
];
/** @nocollapse */
BaiduMap.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
BaiduMap.propDecorators = {
    'ak': [{ type: Input },],
    'protocol': [{ type: Input },],
    'options': [{ type: Input },],
    'offlineOpts': [{ type: Input, args: ['offline',] },],
    'onMapLoaded': [{ type: Output },],
    'onMarkerClicked': [{ type: Output },],
    'onClicked': [{ type: Output },],
};
