import * as alt from 'alt-server';

import { ItemFactory } from '../../../../server/systems/item';
import { OSS } from '../index';
import { Athena } from '../../../../server/api/athena';
import { ShopRegistry } from './shopRegistry';
import { ShopType } from '@AthenaPlugins/open-source-shop/shared/enums/ShopType';
import { OSS_TRANSLATIONS } from '@AthenaPlugins/open-source-shop/shared/enums/Translations';
import { ShopEvents } from '@AthenaPlugins/open-source-shop/shared/enums/ShopEvents';
import { IShop } from '@AthenaPlugins/open-source-shop/shared/interfaces/IShop';
import { IShopLocation } from '@AthenaPlugins/open-source-shop/shared/interfaces/IShopLocation';

const PAGENAME = 'OSS_ShopUI';

export class ShopInitializer {
    static async startupShop() {
        ShopRegistry.forEach(async (shop) => {
            if (
                (OSS.randomizeSellers && shop.shopType === ShopType.SELL) ||
                (OSS.randomizeBuyers && (!shop.shopType || shop.shopType === ShopType.BUY))
            ) {
                shop.data.items.forEach((item) => {
                    const registryPrice = shop.data.items.find((itemToFind) => itemToFind.dbName === item.dbName).price;
                    item.price = ShopInitializer.getRandomInt(1, registryPrice);
                });
            }
            shop.locations.forEach((location, i) => {
                if (location.isBlip) {
                    Athena.controllers.blip.append({
                        pos: new alt.Vector3(location.x, location.y, location.z),
                        shortRange: true,
                        sprite: shop.blipSprite,
                        color: shop.blipColor,
                        text: shop.name,
                        scale: shop.blipScale,
                        uid: `OSS-Shop-${shop.dbName}-${i}`,
                    });
                }
                if (location.ped) {
                    Athena.controllers.ped.append({
                        model: location.ped.model,
                        pos: location.ped.pos,
                        heading: location.ped.heading,
                        maxDistance: 100,
                        animations: location.ped.animations,
                        dimension: 0,
                        uid: `OSS-PED-${shop.dbName}-${i}`,
                    });
                }

                Athena.controllers.interaction.add({
                    position: new alt.Vector3(location.x, location.y, location.z),
                    description: OSS_TRANSLATIONS.openShop,
                    range: shop.interactionRange || OSS.interactionRange,
                    uid: `OSS-IC-${shop.dbName}-${i}`,
                    debug: false,
                    callback: (player: alt.Player) => ShopInitializer.initShopCallback(player, shop, location),
                });
            });
        });
    }

    static async initShopCallback(player: alt.Player, shop: IShop, location: IShopLocation) {
        let currentShop = shop;
        let dataItems = [];
        let acceptsCard = location.shopAcceptsCard || false;
        let currentFactoryItems = ItemFactory.getAllItems();

        for (const item of currentShop.data.items) {
            const factoryItem = currentFactoryItems.find((x) => x.dbName === item.dbName);
            if (!factoryItem) {
                alt.log(`${OSS.name} ${OSS.version}: Item ${item.dbName} is not in your ItemFactory!`);
                continue;
            }

            let states = {
                icon: item.icon || 'crate',
                name: item.name || factoryItem.name,
                dbName: item.dbName,
                price: item.price,
            };

            dataItems.push({ name: states.name, dbName: states.dbName, price: states.price, image: states.icon });
        }

        alt.emitClient(player, ShopEvents.OPEN_SHOP, dataItems, shop.shopType, shop.name, acceptsCard);
    }

    // Thanks to developer docs of mozilla.
    static getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
