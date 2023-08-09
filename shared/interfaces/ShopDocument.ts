export interface ShopDocument {
    _id?: string;
    name: string;
    isClosed: boolean;
    storageId: string;
    owner: string;
    price: number;
    bank: number;
}
