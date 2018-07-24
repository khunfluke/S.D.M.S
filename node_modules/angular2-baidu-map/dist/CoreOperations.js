import { setGeoCtrl } from './controls/GeoControl';
import { setScaleCtrl } from './controls/ScaleControl';
import { setOverviewMapCtrl } from './controls/OverviewMapControl';
import { setNavigationCtrl } from './controls/NavigationControl';
export var reCenter = function (map, opts) {
    var BMap = window['BMap'];
    if (opts.center) {
        map.setCenter(new BMap.Point(opts.center.longitude, opts.center.latitude));
    }
};
export var reZoom = function (map, opts) {
    if (opts.zoom) {
        map.setZoom(opts.zoom);
    }
};
export var createInstance = function (opts, element) {
    var BMap = window['BMap'];
    // create map instance
    var map = new BMap.Map(element);
    // init map, set central location and zoom level
    map.centerAndZoom(new BMap.Point(opts.center.longitude, opts.center.latitude), opts.zoom);
    setNavigationCtrl(map, opts);
    setScaleCtrl(map, opts);
    setOverviewMapCtrl(map, opts);
    if (opts.enableScrollWheelZoom) {
        //enable scroll wheel zoom
        map.enableScrollWheelZoom();
    }
    setGeoCtrl(map, opts);
    return map;
};
export var createMarker = function (marker, pt) {
    var BMap = window['BMap'];
    var opts = {};
    if (marker.icon) {
        var icon = new BMap.Icon(marker.icon, new BMap.Size(marker.width, marker.height));
        opts['icon'] = icon;
    }
    if (marker.enableDragging) {
        opts['enableDragging'] = true;
    }
    return new BMap.Marker(pt, opts);
};
export var redrawMarkers = function (map, previousMarkers, opts) {
    var BMap = window['BMap'];
    var self = this;
    previousMarkers.forEach(function (_a) {
        var marker = _a.marker, listeners = _a.listeners;
        listeners.forEach(function (listener) { marker.removeEventListener('click', listener); });
        map.removeOverlay(marker);
    });
    previousMarkers.length = 0;
    if (!opts.markers) {
        return;
    }
    opts.markers.forEach(function (marker) {
        var marker2 = createMarker(marker, new BMap.Point(marker.longitude, marker.latitude));
        // add marker to the map
        map.addOverlay(marker2);
        var previousMarker = { marker: marker2, listeners: [] };
        previousMarkers.push(previousMarker);
        var onMarkerClickedListener = function () {
            self.onMarkerClicked.emit(marker2);
        };
        marker2.addEventListener('click', onMarkerClickedListener);
        previousMarker.listeners.push(onMarkerClickedListener);
        if (!marker.title && !marker.content) {
            return;
        }
        var msg = "<p>" + (marker.title || '') + "</p><p>" + (marker.content || '') + "</p>";
        var infoWindow2 = new BMap.InfoWindow(msg, {
            enableMessage: !!marker.enableMessage
        });
        if (marker.autoDisplayInfoWindow) {
            marker2.openInfoWindow(infoWindow2);
        }
        var openInfoWindowListener = function () {
            this.openInfoWindow(infoWindow2);
        };
        previousMarker.listeners.push(openInfoWindowListener);
        marker2.addEventListener('click', openInfoWindowListener);
    });
};
