import { MapOptions } from '../interfaces/Options';
import { ControlAnchor } from '../enum/ControlAnchor';
import { Size } from '../interfaces/Size';
export declare const setScaleCtrl: (map: any, opts: MapOptions) => void;
export interface ScaleControlOptions {
    anchor?: ControlAnchor;
    offset?: Size;
}
