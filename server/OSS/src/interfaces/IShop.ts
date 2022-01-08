import * as alt from 'alt-server';
export default interface IShop {
    _id?: string;
    buyerIndex?: number; // Used to change price ingame instead of relaying on database/file action.
    sellerIndex?: number; // Used to change price ingame instead of relaying on database/file action.
    shopType?: string; // Buy || sell
    data: {
        items?: {}[]
    },
    blipData?: {
        sprite: number;
        scale: number;
        shortRange: boolean;
        color: number;
    }
    position: alt.Vector3,
}