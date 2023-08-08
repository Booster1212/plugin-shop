import { ShopType } from '../enums/ShopType';
import { IShopItem } from './IShopItem';
import { IShopLocation } from './IShopLocation';

export interface IShop {
    _id?: string;
    name: string;
    shopType?: ShopType; // BUY || SELL - Default BUY
    shopImage?: string;

    data: {
        items?: IShopItem[];
        interactionRange?: number;
        blip?: {
            shortRange: boolean;
            sprite: number;
            color: number;
            scale: number;
        };
    };

    locations: IShopLocation[];
}
