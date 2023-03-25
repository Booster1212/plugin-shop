export interface IShopItem {
    dbName: string; // Database name of the item in the database items collection.
    price: number; // Price of the item.
    name?: string; // Optional: The name of the Item. Default is name from Item-Factory
}
