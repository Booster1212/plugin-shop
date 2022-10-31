import * as alt from 'alt-server';

import { ItemFactory } from '../../../../server/systems/item';
import { OSS } from '../index';
import { OSS_TRANSLATIONS } from '../../shared/enums';
import { IShop, IShopLocation } from '../../shared/interfaces';
import { ShopType } from '../../shared/enums';
import { ShopRegistry } from './shopRegistry';
import { Athena } from '../../../../server/api/athena';

const PAGENAME = 'OSS_ShopUI';

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
                let location: IShopLocation = shop.locations[i];
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
                let isPed = location.ped;
                if (isPed) {
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
                    range: shop.interactionRange ? shop.interactionRange : OSS.interactionRange,
                    uid: `OSS-IC-${shop.dbName}-${i}`,
                    debug: false,
                    callback: (player: alt.Player) => ShopInitializer.initShopCallback(player, shop, location),
                });
            }
        });
    }

    static async initShopCallback(player: alt.Player, shop: IShop, location: IShopLocation) {
        let currentShop = shop;
        let dataItems = [];
        let acceptsCard: boolean = location.shopAcceptsCard ? location.shopAcceptsCard : false;

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
        alt.emitClient(player, `${PAGENAME}:Client:OpenShop`, dataItems, shop.shopType, shop.name, acceptsCard);
    }

    // Thanks to developer docs of mozilla.
    static getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
