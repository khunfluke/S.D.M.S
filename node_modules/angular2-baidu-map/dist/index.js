import { NgModule } from '@angular/core';
import { BaiduMap } from './components/map';
var BaiduMapModule = (function () {
    function BaiduMapModule() {
    }
    return BaiduMapModule;
}());
export { BaiduMapModule };
BaiduMapModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    BaiduMap
                ],
                exports: [
                    BaiduMap
                ]
            },] },
];
/** @nocollapse */
BaiduMapModule.ctorParameters = function () { return []; };
export { ControlAnchor } from './enum/ControlAnchor';
export * from './enum/NavigationControlType';
export { MapStatus } from './enum/MapStatus';
