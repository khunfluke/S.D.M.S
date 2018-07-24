import { Marker } from './marker';
export declare abstract class SpiderClusterMarker extends Marker {
    /** The parent pushpin in which the spider pushpin is derived from. */
    ParentMarker: Marker;
    /** The stick that connects the spider pushpin to the cluster. */
    Stick: any;
}
