import { Animation } from '@AthenaShared/interfaces/animation.js';
import { Blip } from '@AthenaShared/interfaces/blip.js';
import * as alt from 'alt-shared';

export interface ShopItem {
    name: string;
    price: number;
    image: string;
    quantity: number;
    description?: string;
}

export interface ShopLocation {
    pos: alt.IVector3;
    isBlip?: boolean;
    shopAcceptsCard?: boolean; // default is false
    ped?: {
        model: string;
        heading: alt.Vector3;
        pos: alt.IVector3;
        animations?: Animation[];
    };
}

export interface Shop {
    name: string;
    type: 'Buy' | 'Sell';
    data: {
        items: ShopItem[];
        interactionRange?: number;
        blip?: Partial<Blip>;
    };

    locations: ShopLocation[];
}
