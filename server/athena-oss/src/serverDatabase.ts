import * as alt from 'alt-server';
import Database from '@stuyk/ezmongodb';
import IShop, { shopType } from './interfaces/IShop';

import { OSS, OSS_TRANSLATIONS } from '../index';
import { InteractionController } from '../../../server/systems/interaction';
import { ServerBlipController } from '../../../server/systems/blip';
import { SYSTEM_EVENTS } from '../../../shared/enums/system';
import { ItemFactory } from '../../../server/systems/item';
import { ShopRegistry } from './shopRegistry';
import { deepCloneObject } from '../../../shared/utility/deepCopy';

const PAGENAME = 'ShopUI';

alt.on(SYSTEM_EVENTS.BOOTUP_ENABLE_ENTRY, async () => {
    ShopRegistry.forEach(async (shop, index) => {
        let dbShop: IShop = await Database.fetchAllByField<IShop>('dbName', shop.dbName, OSS.collection)[0];
        if (!dbShop) {
            dbShop = deepCloneObject(shop);
        }

        if (
            (OSS.randomizeSellers && shop.shopType === shopType.SELL) ||
            (OSS.randomizeBuyers && (!shop.shopType || shop.shopType === shopType.BUY))
        ) {
            dbShop.data.items.forEach((item) => {
                let registryPrice = shop.data.items.find((itemToFind) => itemToFind.dbName === item.dbName).price;
                item.price = getRandomInt(1, registryPrice);
            });
        }
        if (!dbShop._id) {
            await Database.insertData(dbShop, OSS.collection, false);
        } else {
            await Database.updatePartialData(dbShop._id, dbShop, OSS.collection);
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
            let itemIcon;
            let itemName;
            let itemDbName = item.dbName;
            let itemPrice = item.price;
            if (!item.icon || !item.name) {
                itemIcon = item.icon ? item.icon : factoryItem.icon;
                itemName = item.name ? item.name : factoryItem.name;
            } else {
                itemIcon = item.icon;
                itemName = item.name;
            }
            // alt.log(`Item ${itemName} ${itemIcon} ${itemDbName} ${itemPrice} ${factoryItem.icon} ${factoryItem.name}`);
            dataItems.push({ name: itemName, dbName: itemDbName, price: itemPrice, image: itemIcon });
        }
    }
    alt.emitClient(player, `${PAGENAME}:Client:OpenShop`, dataItems, shop.shopType);
}
