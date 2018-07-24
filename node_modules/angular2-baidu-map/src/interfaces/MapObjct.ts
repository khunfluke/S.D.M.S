import {MapStatus} from '../enum/MapStatus';

export interface MapObjct {
    status: MapStatus,
    callbacks: Function[]
};
