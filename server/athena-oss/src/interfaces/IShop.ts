import IShopListItem from "./IShopListItem";
export default interface IShop {
    _id?: string;
    name: string;
    dbName: string;
    buyerIndex?: number; // Used to change price ingame instead of relaying on database/file action.
    sellerIndex?: number; // Used to change price ingame instead of relaying on database/file action.
    shopType?: shopType; // BUY || SELL - Default BUY
    shopImage?: string;
    blipShortRange?: boolean,
    blipSprite: number,
    blipColor: number,
    blipScale: number,
    interactionRange?:number;
    data: {
        items?: IShopListItem[]
    },
    locations: IShopLocation[],
}

export interface IShopLocation {
    x: number,
    y: number,
    z: number,
    isBlip?: boolean; //Enable/Disable blip e.g. none for Vendors. Already defined from Athena in shared/information
}

export enum shopType {
    BUY='buy', //Players can buy stuff
    SELL='sell' //Players can sell stuff
}