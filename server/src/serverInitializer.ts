import { PedController } from '../../../../server/streamers/ped';
import * as alt from 'alt-server';

import { ServerBlipController } from '../../../../server/systems/blip';
import { InteractionController } from '../../../../server/systems/interaction';
import { ItemFactory } from '../../../../server/systems/item';
import { OSS, OSS_TRANSLATIONS } from '../index';
import IShop, { ShopType } from './interfaces/IShop';
import { ShopRegistry } from './shopRegistry';

const PAGENAME = 'ShopUI';

export class ShopInitializer {
    static async startupShop() {
        ShopRegistry.forEach(async (shop) => {
            if (
                (OSS.randomizeSellers && shop.shopType === ShopType.SELL) ||
                (OSS.randomizeBuyers && (!shop.shopType || shop.shopType === ShopType.BUY))
            ) {
                shop.data.items.forEach((item) => {
                    let registryPrice = shop.data.items.find((itemToFind) => itemToFind.dbName === item.dbName).price;
                    item.price = ShopInitializer.getRandomInt(1, registryPrice);
                });
            }
            for (let i = 0; i < shop.locations.length; i++) {
                let location = shop.locations[i];
                if (location.isBlip) {
                    ServerBlipController.append({
                        pos: new alt.Vector3(location.x, location.y, location.z),
                        shortRange: true,
                        sprite: shop.blipSprite,
                        color: shop.blipColor,
                        text: shop.name,
                        scale: shop.blipScale,
                        uid: `Shop-${shop.dbName}-${i}`,
                    });
                }
                let isPed = location.ped;
                if (isPed) {
                    PedController.append({
                        model: location.ped.model,
                        pos: location.ped.pos,
                        heading: location.ped.heading,
                        maxDistance: 100,
                        animations: location.ped.animations,
                        dimension: 0,
                        uid: `PED-${shop.dbName}-${i}`,
                    });
                }
                InteractionController.add({
                    position: new alt.Vector3(location.x, location.y, location.z),
                    description: OSS_TRANSLATIONS.openShop,
                    range: shop.interactionRange ? shop.interactionRange : OSS.interactionRange,
                    uid: `IC-${shop.dbName}-${i}`,
                    debug: false,
                    callback: (player: alt.Player) => ShopInitializer.initShopCallback(player, shop),
                });
            }
        });
    }

    static async initShopCallback(player: alt.Player, shop: IShop) {
        let currentShop = shop;
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
        alt.emitClient(player, `${PAGENAME}:Client:OpenShop`, dataItems, shop.shopType);
    }

    // Thanks to developer docs of mozilla.
    static getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
