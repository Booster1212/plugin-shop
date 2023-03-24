import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api';

import { ShopRegistry } from './registry';
import { ShopType } from '@AthenaPlugins/open-source-shop/shared/enums/ShopType';
import { OSS_TRANSLATIONS } from '@AthenaPlugins/open-source-shop/shared/enums/Translations';
import { ShopEvents } from '@AthenaPlugins/open-source-shop/shared/enums/ShopEvents';
import { IShop } from '@AthenaPlugins/open-source-shop/shared/interfaces/IShop';
import { IShopLocation } from '@AthenaPlugins/open-source-shop/shared/interfaces/IShopLocation';
import { shopConfig } from './config';

export async function loadShops() {
    ShopRegistry.forEach(async (shop) => {
        if (
            (shopConfig.randomizeSellers && shop.shopType === ShopType.SELL) ||
            (shopConfig.randomizeBuyers && (!shop.shopType || shop.shopType === ShopType.BUY))
        ) {
            shop.data.items.forEach((item) => {
                const registryPrice = shop.data.items.find((itemToFind) => itemToFind.dbName === item.dbName).price;
                item.price = getRandomInt(1, registryPrice);
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
                    uid: `OSS-Shop-${shop.name}-${i}`,
                });
            }
            if (location.ped) {
                Athena.controllers.staticPed.append({
                    model: location.ped.model,
                    pos: location.ped.pos,
                    heading: location.ped.heading,
                    maxDistance: 100,
                    animations: location.ped.animations,
                    dimension: 0,
                    uid: `OSS-PED-${shop.name}-${i}`,
                });
            }

            Athena.controllers.interaction.append({
                position: new alt.Vector3(location.x, location.y, location.z),
                description: OSS_TRANSLATIONS.openShop,
                range: shop.interactionRange || shopConfig.interactionRange,
                uid: `OSS-IC-${shop.name}-${i}`,
                debug: false,
                callback: (player: alt.Player) => createShopCallback(player, shop, location),
            });
        });
    });
}

export async function createShopCallback(player: alt.Player, shop: IShop, location: IShopLocation) {
    let currentShop = shop;
    let dataItems = [];
    let acceptsCard = location.shopAcceptsCard || false;

    for (const item of currentShop.data.items) {
        const currentItem = Athena.systems.inventory.factory.getBaseItem(item.dbName);
        let states = {
            icon: item.icon || 'crate',
            name: currentItem.name,
            dbName: item.dbName,
            price: item.price,
        };

        dataItems.push({ name: states.name, dbName: states.dbName, price: states.price, image: states.icon });
    }

    alt.emitClient(player, ShopEvents.OPEN_SHOP, dataItems, shop.shopType, shop.name, acceptsCard);
}

export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export * from './controller';
