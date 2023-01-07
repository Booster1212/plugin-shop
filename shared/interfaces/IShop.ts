import { ShopType } from '../enums/ShopType';
import { IShopListItem } from './IShopListItem';
import { IShopLocation } from './IShopLocation';

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
