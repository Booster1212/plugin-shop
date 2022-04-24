import Database from '@stuyk/ezmongodb';
import * as alt from 'alt-server';

import { ServerBlipController } from '../../../../server/systems/blip';
import { InteractionController } from '../../../../server/systems/interaction';
import { ItemFactory } from '../../../../server/systems/item';
import { SYSTEM_EVENTS } from '../../../../shared/enums/system';
import { deepCloneObject } from '../../../../shared/utility/deepCopy';
import { OSS, OSS_TRANSLATIONS } from '../index';
import IShop, { ShopType } from './interfaces/IShop';
import { ShopRegistry } from './shopRegistry';


const PAGENAME = 'ShopUI';

alt.on(SYSTEM_EVENTS.BOOTUP_ENABLE_ENTRY, async () => {
    ShopRegistry.forEach(async (shop, index) => {
        const fetchedShop = await Database.fetchData<IShop>('dbName', shop.dbName, OSS.collection);
        let dbShop: IShop = await Database.fetchAllByField<IShop>('dbName', shop.dbName, OSS.collection)[0];
        if (!dbShop) {
            dbShop = deepCloneObject(shop);
        }

        if (
            (OSS.randomizeSellers && shop.ShopType === ShopType.SELL) ||
            (OSS.randomizeBuyers && (!shop.ShopType || shop.ShopType === ShopType.BUY))
        ) {
            dbShop.data.items.forEach((item) => {
                let registryPrice = shop.data.items.find((itemToFind) => itemToFind.dbName === item.dbName).price;
                item.price = getRandomInt(1, registryPrice);
            });
        }

        if (fetchedShop !== null && fetchedShop !== undefined) {
            await Database.updatePartialData(fetchedShop._id, dbShop, OSS.collection);
        } else if (!fetchedShop) {
            await Database.insertData(dbShop, OSS.collection, false);
        }

        for (let i = 0; i < dbShop.locations.length; i++) {
            let location = dbShop.locations[i];
            if (location.isBlip) {
                ServerBlipController.append({
                    pos: new alt.Vector3(location.x, location.y, location.z),
                    shortRange: true,
                    sprite: dbShop.blipSprite,
                    color: dbShop.blipColor,
                    text: dbShop.name,
                    scale: dbShop.blipScale,
                    uid: `Shop-${dbShop.dbName}-${i}`,
                });
            }
            InteractionController.add({
                position: new alt.Vector3(location.x, location.y, location.z),
                description: OSS_TRANSLATIONS.openShop,
                range: dbShop.interactionRange ? dbShop.interactionRange : OSS.interactionRange,
                uid: `IC-${dbShop.dbName}-${i}`,
                debug: false,
                callback: (player: alt.Player) => initShopCallback(player, dbShop),
            });
        }
    });
});

// Thanks to developer docs of mozilla.
function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

async function initShopCallback(player: alt.Player, shop: IShop) {
    let currentShop = shop;
    let dbShop: IShop = await Database.fetchAllByField<IShop>('dbName', shop.dbName, OSS.collection)[0];
    if (dbShop) {
        currentShop = dbShop;
    }
    let dataItems = [];
    for (const item of currentShop.data.items) {
        let factoryItem = await ItemFactory.get(item.dbName);
        if (!factoryItem) {
            alt.log(`~lr~${OSS.name} ${OSS.version}: Item ${item.dbName} is not in your ItemFactory!`);
        } else {
            let itemIcon: string;
            let itemName: string;
            let itemDbName = item.dbName;
            let itemPrice = item.price;
            if (!item.icon || !item.name) {
                itemIcon = item.icon ? item.icon : factoryItem.icon;
                itemName = item.name ? item.name : factoryItem.name;
            } else {
                itemIcon = item.icon;
                itemName = item.name;
            }
            dataItems.push({ name: itemName, dbName: itemDbName, price: itemPrice, image: itemIcon });
        }
    }
    alt.emitClient(player, `${PAGENAME}:Client:OpenShop`, dataItems, shop.ShopType);
}
