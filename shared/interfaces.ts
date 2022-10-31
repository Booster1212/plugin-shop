import { ShopType } from './enums';
import * as alt from 'alt-shared';
import { Animation } from '../../../shared/interfaces/animation';

export interface iShopItem {
    dbName: string;
    price: number;
    image: string;
    name: string;
}

export interface IShop {
    _id?: string;
    name: string;
    dbName: string;
    buyerIndex?: number; // Used to change price ingame instead of relaying on database/file action.
    sellerIndex?: number; // Used to change price ingame instead of relaying on database/file action.
    shopType?: ShopType; // BUY || SELL - Default BUY
    shopImage?: string;
    blipShortRange?: boolean;
    blipSprite: number;
    blipColor: number;
    blipScale: number;
    interactionRange?: number;
    data: {
        items?: IShopListItem[];
    };
    locations: IShopLocation[];
}

export interface IShopLocation {
    x: number;
    y: number;
    z: number;
    isBlip?: boolean; //Enable/Disable blip e.g. none for Vendors. Already defined from Athena in shared/information
    ped?: {
        model: string;
        heading: number;
        pos: alt.Vector3;
        animations?: Animation[];
    };
}

export interface IShopListItem {
    dbName: string; // the dbName of the item, must be in ItemFactory
    price: number; // the price of the item, must be in ItemFactory
    name?: string; //Optional: The name of the Item. Default is name from Item-Factory
    icon?: string; //Optional: The icon of the Item. Default is icon from Item-Factory
}
