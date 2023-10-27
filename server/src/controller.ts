import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api/index.js';
import { ShopRegistry } from './registry.js';
import { Shop, ShopLocation } from '@AthenaPlugins/plugin-shop/shared/interface/Shop.js';
import { ShopEvents } from '@AthenaPlugins/plugin-shop/shared/enums/ShopEvents.js';

export function loadAllShops() {
    for (const shop of ShopRegistry) {
        for (const location of shop.locations) {
            if (location.isBlip) {
                Athena.controllers.blip.append({
                    pos: location.pos,
                    shortRange: shop.data.blip.shortRange,
                    sprite: shop.data.blip.sprite,
                    color: shop.data.blip.color,
                    text: shop.name,
                    scale: shop.data.blip.scale,
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
                });
            }

            Athena.controllers.interaction.append({
                position: location.pos,
                description: 'Open Shop',
                range: shop.data.interactionRange,
                callback: (player: alt.Player) => openShop(player, shop, location),
            });
        }
    }
}

function openShop(player: alt.Player, shop: Shop, location: ShopLocation): Promise<void> {
    return new Promise<void>((resolve) => {
      alt.emitClient(player, ShopEvents.OPEN_SHOP);
  
      const requestShopItemsHandler = (receivedPlayer: alt.Player) => {
        if (receivedPlayer === player) {
          Athena.webview.emit(player, ShopEvents.SET_ITEMS, shop, location);
          alt.offClient(ShopEvents.REQUEST_SHOP_ITEMS, requestShopItemsHandler);
          resolve();
        }
      };
  
      alt.onClient(ShopEvents.REQUEST_SHOP_ITEMS, requestShopItemsHandler);
    });
  }