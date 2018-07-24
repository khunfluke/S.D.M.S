import { ScaleControlOptions } from '../controls/ScaleControl';
import { GeolocationControlOptions } from '../controls/GeoControl';
import { OverviewMapControlOptions } from '../controls/OverviewMapControl';
import { NavigationControlOptions } from '../controls/NavigationControl';
export interface MarkerOptions {
    longitude: number;
    latitude: number;
    icon?: string;
    width?: number;
    height?: number;
    title?: string;
    content?: string;
    enableMessage?: boolean;
    autoDisplayInfoWindow?: boolean;
    enableDragging?: boolean;
}
export interface MapDefaultOptions {
    navCtrl?: boolean | NavigationControlOptions;
    scaleCtrl?: boolean | ScaleControlOptions;
    overviewCtrl?: boolean | OverviewMapControlOptions;
    enableScrollWheelZoom?: boolean;
    geolocationCtrl?: boolean | GeolocationControlOptions;
    zoom?: number;
}
export interface MapOptions extends MapDefaultOptions {
    center: {
        longitude: number;
        latitude: number;
    };
    markers?: MarkerOptions[];
}
export interface OfflineOptions {
    retryInterval?: number;
    txt?: string;
}
