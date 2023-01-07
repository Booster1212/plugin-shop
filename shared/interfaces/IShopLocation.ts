import { Animation } from '@AthenaShared/interfaces/animation';
import * as alt from 'alt-shared';

export interface IShopLocation {
    x: number;
    y: number;
    z: number;
    isBlip?: boolean; //Enable/Disable blip e.g. none for Vendors. Already defined from Athena in shared/information
    shopAcceptsCard?: boolean; // default is false
    ped?: {
        model: string;
        heading: number;
        pos: alt.Vector3;
        animations?: Animation[];
    };
}
