import IShopListItem from './IShopListItem';

export default interface IShop {
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
    pedModel?: string;
    pedHeading?: number;
    pedAnimations?: Animation[];
    pedInteractionOffset?: number | 1; // moves the interaction-point in heading-direction from ped. Default is 1 when ped used
}

export enum ShopType {
    BUY = 'buy', //Players can buy stuff
    SELL = 'sell', //Players can sell stuff
}
