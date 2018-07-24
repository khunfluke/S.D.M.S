import { MapOptions, MarkerOptions } from './interfaces/Options';
import { PreviousMarker } from './interfaces/PreviousMarker';
export declare const reCenter: (map: any, opts: MapOptions) => void;
export declare const reZoom: (map: any, opts: MapOptions) => void;
export declare const createInstance: (opts: MapOptions, element: any) => any;
export declare const createMarker: (marker: MarkerOptions, pt: any) => any;
export declare const redrawMarkers: (map: any, previousMarkers: PreviousMarker[], opts: MapOptions) => void;
