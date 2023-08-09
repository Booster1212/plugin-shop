import * as Athena from '@AthenaServer/api';
import { IShop } from '@AthenaPlugins/open-source-shop/shared/interfaces/IShop';
import { IShopLocation } from '@AthenaPlugins/open-source-shop/shared/interfaces/IShopLocation';
import { ShopDocument } from '@AthenaPlugins/open-source-shop/shared/interfaces/ShopDocument';
import Database from '@stuyk/ezmongodb';
import { shopConfig } from './config';

export class PlayerShops {
    static async handleDatabase(shop: IShop, location: IShopLocation) {
        if (shopConfig.useDatabase && !location.isVendingMachine) {
            const shopDocument: ShopDocument = {
                name: `${shop.name}`,
                isClosed: true,
                storageId: '', // Empty Storage on Creation.
                owner: 'SERVER',
                price: 2500000,
                bank: 0,
            };

            const existingShop = await Database.fetchData<ShopDocument>('name', `${shop.name}`, shopConfig.collection);

            if (!existingShop) {
                await Database.insertData(shopDocument, shopConfig.collection, true);
                console.log('Shop document inserted.');
            } else {
                console.log('Shop document already exists.');
            }

            Athena.controllers.textLabel.append({
                pos: { x: location.x, y: location.y, z: location.z },
                text: `Owner: ${shopDocument.owner}\nPrice: ~lg~${shopDocument.price}~w~$`,
            });
        }
    }

    static async buildStorages() {
        const allShops = await Database.fetchAllData<ShopDocument>(shopConfig.collection);

        allShops.forEach(async (shop, index) => {
            if (shop.storageId === '' || shop.storageId === null) {
                const newStorageId = await Athena.systems.storage.create([]);
                const isUpdated = await Database.updatePartialData(
                    shop._id,
                    { storageId: newStorageId },
                    shopConfig.collection,
                );
                console.log(`Updated => ${isUpdated}`);
                return true;
            } else {
                return false;
            }
        });
    }
}
