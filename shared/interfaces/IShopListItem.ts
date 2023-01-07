export interface IShopListItem {
    dbName: string; // the dbName of the item, must be in ItemFactory
    price: number; // the price of the item, must be in ItemFactory
    name?: string; //Optional: The name of the Item. Default is name from Item-Factory
    icon?: string; //Optional: The icon of the Item. Default is icon from Item-Factory
}
