import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api/index.js';

import { ShopRegistry } from './registry.js';
import { ShopType } from '@AthenaPlugins/plugin-shop/shared/enums/ShopType.js';
import { ShopEvents } from '@AthenaPlugins/plugin-shop/shared/enums/ShopEvents.js';
import { IShop } from '@AthenaPlugins/plugin-shop/shared/interfaces/IShop.js';
import { IShopLocation } from '@AthenaPlugins/plugin-shop/shared/interfaces/IShopLocation.js';
import { shopConfig } from './config/index.js';
import { ShopTranslations } from '@AthenaPlugins/plugin-shop/shared/enums/Translations.js';

export async function loadShops() {
    ShopRegistry.forEach((shop) => {
        if (
            (shopConfig.randomizeSellers && shop.shopType === ShopType.SELL) ||
            (shopConfig.randomizeBuyers && (!shop.shopType || shop.shopType === ShopType.BUY))
        ) {
            shop.data.items.forEach((item) => {
                const registryItem = shop.data.items.find((itemToFind) => itemToFind.dbName === item.dbName);
                if (registryItem) {
                    item.price = getRandomInt(1, registryItem.price);
                }
            });
        }

        shop.locations.forEach(async (location, i) => {
            if (location.isBlip && shop.data.blip) {
                Athena.controllers.blip.append({
                    pos: new alt.Vector3(location.x, location.y, location.z),
                    shortRange: shop.data.blip.shortRange,
                    sprite: shop.data.blip.sprite,
                    color: shop.data.blip.color,
                    text: shop.name,
                    scale: shop.data.blip.scale,
                    uid: `OSS-Shop-${shop.name}-${i}`,
                });
            }

            if (location.ped) {
                Athena.controllers.staticPed.append({
                    model: location.ped.model,
                    pos: location.ped.pos,
                    rotation: location.ped.heading,
                    maxDistance: 100,
                    animations: location.ped.animations,
                    dimension: 0,
                    uid: `OSS-PED-${shop.name}-${i}`,
                });
            }

            Athena.controllers.interaction.append({
                position: new alt.Vector3(location.x, location.y, location.z),
                description: ShopTranslations.openShop,
                range: shop.data.interactionRange,
                uid: `OSS-IC-${shop.name}-${i}`,
                debug: false,
                callback: (player: alt.Player) => createShopCallback(player, shop, location),
            });
        });
    });
}

export function createShopCallback(player: alt.Player, shop: IShop, location: IShopLocation) {
    let currentShop = shop;
    let dataItems = [];
    let acceptsCard = location.shopAcceptsCard || false;

    for (const item of currentShop.data.items) {
        const currentItem = Athena.systems.inventory.factory.getBaseItem(item.dbName);
        let states = {
            name: currentItem.name,
            dbName: item.dbName,
            price: item.price,
        };

        dataItems.push({
            name: states.name,
            dbName: states.dbName,
            price: states.price,
            image: currentItem.icon,
            quantity: 1,
        });
    }

    alt.emitClient(player, ShopEvents.OPEN_SHOP);

    alt.onClient(ShopEvents.REQUEST_SHOP_ITEMS, (player: alt.Player) => {
        Athena.webview.emit(player, ShopEvents.SET_ITEMS, dataItems, shop.shopType, shop.name, acceptsCard);
    });
}

export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export function foodEffect(player: alt.Player, slot: number, type: 'inventory' | 'toolbar') {
    const propertyName = String(type);
    const data = Athena.document.character.get(player);
    const item = Athena.player.inventory.getAt(player, slot);

    if (typeof data === 'undefined' || typeof data[propertyName] === 'undefined' || typeof item === 'undefined') return;

    item.quantity = 1;
    Athena.player.inventory.sub(player, item);

    data.food += 25;
}

export function drinkEffect(player: alt.Player, slot: number, type: 'inventory' | 'toolbar') {
    const propertyName = String(type);
    const data = Athena.document.character.get(player);
    const item = Athena.player.inventory.getAt(player, slot);

    if (typeof data === 'undefined' || typeof data[propertyName] === 'undefined' || typeof item === 'undefined') return;

    item.quantity = 1;
    Athena.player.inventory.sub(player, item);
    data.water += 25;
}

export function drinkEffectAlcoholic(player: alt.Player, slot: number, type: 'inventory' | 'toolbar') {
    const propertyName = String(type);
    const data = Athena.document.character.get(player);
    const item = Athena.player.inventory.getAt(player, slot);

    if (typeof data === 'undefined' || typeof data[propertyName] === 'undefined' || typeof item === 'undefined') return;

    item.quantity = 1;
    Athena.player.inventory.sub(player, item);

    Athena.player.emit.setTimeCycleEffect(player, 'Drunk', 30000);
}
