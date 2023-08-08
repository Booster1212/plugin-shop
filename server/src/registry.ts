import * as ShopLocations from '@AthenaPlugins/open-source-shop/server/src/config/locations';
import * as ShopItems from '@AthenaPlugins/open-source-shop/server/src/items/shop_items';

import { ShopType } from '@AthenaPlugins/open-source-shop/shared/enums/ShopType';
import { IShop } from '@AthenaPlugins/open-source-shop/shared/interfaces/IShop';

export const ShopRegistry: IShop[] = [
    {
        name: '24/7 Shop',
        shopType: ShopType.BUY,
        data: {
            blip: {
                sprite: 59,
                color: 1,
                scale: 1,
                shortRange: true,
            },
            items: [...ShopItems.coreShops],
            interactionRange: 2,
        },
        locations: ShopLocations.coreShopLocations,
    },
    {
        name: 'Example Selling Store',
        shopType: ShopType.SELL,
        data: {
            blip: {
                sprite: 52,
                color: 2,
                scale: 1,
                shortRange: true,
            },
            items: [...ShopItems.sellingShops],
            interactionRange: 2,
        },
        locations: ShopLocations.sellerExampleLocations,
    },
    {
        name: 'LTD',
        shopType: ShopType.BUY,
        data: {
            blip: {
                sprite: 59,
                color: 1,
                scale: 1,
                shortRange: true,
            },
            items: [...ShopItems.ltdShops],
            interactionRange: 2,
        },
        locations: ShopLocations.ltdLocations,
    },
    {
        name: 'Robs Liquor',
        shopType: ShopType.BUY,
        data: {
            blip: {
                sprite: 59,
                color: 1,
                scale: 1,
                shortRange: true,
            },
            items: [...ShopItems.robsLiquorShops],
            interactionRange: 2,
        },
        locations: ShopLocations.robsLiquorLocations,
    },
    {
        name: 'Juice',
        shopType: ShopType.BUY,
        data: {
            blip: {
                sprite: 59,
                color: 1,
                scale: 1,
                shortRange: true,
            },
            items: [...ShopItems.juiceShops],
            interactionRange: 2,
        },
        locations: ShopLocations.juiceLocations,
    },
    {
        name: 'Liquor ACE',
        shopType: ShopType.BUY,
        data: {
            blip: {
                sprite: 59,
                color: 1,
                scale: 1,
                shortRange: true,
            },
            items: [...ShopItems.liquorAceShops],
            interactionRange: 2,
        },
        locations: ShopLocations.liquorAceLocations,
    },
    {
        name: 'Tool Shop',
        shopType: ShopType.BUY,
        data: {
            blip: {
                sprite: 59,
                color: 1,
                scale: 1,
                shortRange: true,
            },
            items: [...ShopItems.toolShops],
            interactionRange: 2,
        },
        locations: ShopLocations.toolShopLocations,
    },
    {
        name: 'Ammunation',
        shopType: ShopType.BUY,
        data: {
            blip: {
                sprite: 110,
                color: 1,
                scale: 1,
                shortRange: true,
            },
            items: [...ShopItems.ammunationShops],
            interactionRange: 2,
        },
        locations: ShopLocations.ammunationLocations,
    },
    {
        name: 'Tequi-la-la',
        shopType: ShopType.BUY,
        data: {
            blip: {
                sprite: 93,
                color: 48,
                scale: 1,
                shortRange: true,
            },
            items: [...ShopItems.tequilalaShops],
            interactionRange: 2,
        },
        locations: ShopLocations.tequiLaLaLocations,
    },
    {
        name: 'Bahama Mamas',
        shopType: ShopType.BUY,
        data: {
            blip: {
                sprite: 93,
                color: 48,
                scale: 1,
                shortRange: true,
            },
            items: [...ShopItems.bahamaMamasShops],
            interactionRange: 2,
        },
        locations: ShopLocations.bahamaMamasLocations,
    },
    {
        name: 'Vanilla Unicorn',
        shopType: ShopType.BUY,
        data: {
            blip: {
                sprite: 93,
                color: 48,
                scale: 1,
                shortRange: true,
            },
            items: [...ShopItems.vanillaUnicornShops],
            interactionRange: 2,
        },
        locations: ShopLocations.vanillaUnicornLocations,
    },
    {
        name: 'Vending Machine',
        shopType: ShopType.BUY,
        data: {
            items: [...ShopItems.vendingMachines],
            interactionRange: 2,
        },
        locations: ShopLocations.vendingMachinesShop,
    },
];
