import { PedController } from '../../../../server/streamers/ped';
import * as alt from 'alt-server';

import { ServerBlipController } from '../../../../server/systems/blip';
import { InteractionController } from '../../../../server/systems/interaction';
import { ItemFactory } from '../../../../server/systems/item';
import IShop, { ShopType } from './interfaces/IShop';
import { ShopRegistry } from './shopRegistry';
import { ShopEvents } from '../../shared/events';
import { iShopItem } from '../../shared/interfaces/IShopItem';
import { ossConfig } from '../../shared/config';
import { OSS_TRANSLATIONS } from '../../shared/enums/ossTranslations';

const PAGENAME = 'ShopUI';

export class ShopInitializer {
    static async startupShop() {
        ShopRegistry.forEach(async (shop) => {
            if (
                (ossConfig.randomizeSellers && shop.shopType === ShopType.SELL) ||
                (ossConfig.randomizeBuyers && (!shop.shopType || shop.shopType === ShopType.BUY))
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
                    range: shop.interactionRange ? shop.interactionRange : ossConfig.interactionRange,
                    uid: `IC-${shop.dbName}-${i}`,
                    debug: false,
                    callback: (player: alt.Player) => ShopInitializer.initShopCallback(player, shop),
                });
            }
        });
    }

    static async initShopCallback(player: alt.Player, shop: IShop) {
        let dataItems = (await this.getDataItems(shop)) as unknown as Array<iShopItem>;
        alt.emitClient(player, ShopEvents.openShop, dataItems, shop.shopType);
    }

    static async getDataItems(shop: IShop) {
        let currentShop = shop;
        let dataItems = [];
        for (const item of currentShop.data.items) {
            let factoryItem = await ItemFactory.get(item.dbName);
            if (!factoryItem) {
                alt.log(`~lr~[PLUGIN] (OSS) ==> Item ${item.dbName} is not in your ItemFactory!`);
            }

            let current = {
                image: '',
                name: '',
                dbName: item.dbName,
                price: item.price,
            };

            if (!item.icon || !item.name) {
                current.image = item.icon ? item.icon : factoryItem.icon;
                current.name = item.name ? item.name : factoryItem.name;
            } else {
                current.image = item.icon;
                current.name = item.name;
            }

            dataItems.push({ ...current });
        }
        return dataItems;
    }
    
    static getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
