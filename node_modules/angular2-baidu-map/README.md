angular2-baidu-map
=====================

[![NPM version][npm-image]][npm-url]
![][david-url]
![][dt-url]
![][license-url]

Angular2 component for Baidu map

## Install via npm ##

```bash
npm install angular2-baidu-map
```

## Usage ##

```javascript
import {Component, OnInit} from '@angular/core';
import {BaiduMap, OfflineOptions, ControlAnchor, NavigationControlType} from 'angular2-baidu-map';

@Component({
    selector: 'map-presentation',
    template: `
        <h1>Test Baidu-Map<h1>
        <baidu-map ak="put your ak here" [options]="opts" [offline]="offlineOpts" (onMapLoaded)="loadMap($event)" (onMarkerClicked)="clickMarker($event)"></baidu-map>
    `,
    styles: [`
        baidu-map{
            width: 500px;
            height: 400px;
            display: block;
        }
    `]
})
export class MainApp implements OnInit {

    opts: any;
    offlineOpts: OfflineOptions;

    ngOnInit() {
        this.opts = {
            center: {
                longitude: 121.506191,
                latitude: 31.245554
            },
            zoom: 17,
            markers: [{
                longitude: 121.506191,
                latitude: 31.245554,
                title: 'Where',
                content: 'Put description here',
                autoDisplayInfoWindow: true,
                enableDragging: true
            }],
            geolocationCtrl: {
                anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_RIGHT
            },
            scaleCtrl: {
                anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_LEFT
            },
            overviewCtrl: {
                isOpen: true
            },
            navCtrl: {
                type: NavigationControlType.BMAP_NAVIGATION_CONTROL_LARGE
            }
        };

        this.offlineOpts = {
            retryInterval: 5000,
            txt: 'NO-NETWORK'
        };
    }

    loadMap(e: any) {
        console.log(e);//e here is the instance of BMap.Map
    }

    clickMarker(marker: any){
        console.log('The clicked marker is', marker.getPosition());
    }

}
```

For more information, see [documentation](http://leftstick.github.io/angular2-baidu-map/)


## LICENSE ##

[MIT License](https://raw.githubusercontent.com/leftstick/angular2-baidu-map/master/LICENSE)


[npm-url]: https://npmjs.org/package/angular2-baidu-map
[npm-image]: https://img.shields.io/npm/v/angular2-baidu-map.svg
[david-url]: https://david-dm.org/leftstick/angular2-baidu-map.png
[dt-url]:https://img.shields.io/npm/dt/angular2-baidu-map.svg
[license-url]:https://img.shields.io/npm/l/angular2-baidu-map.svg
