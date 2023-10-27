import * as ShopLocations from '@AthenaPlugins/plugin-shop/server/src/config/locations.js';
import * as Interface from '../../shared/interface/Shop.js';
import { coreItems } from './items/24-7Shops/itemlist.js';

export const ShopRegistry: Interface.Shop[] = [
    {
        name: '24/7 Shop',
        type: 'Buy',
        data: {
            blip: {
                sprite: 59,
                color: 2,
                scale: 1,
                shortRange: true,
            },
            items: [...coreItems],
            interactionRange: 2,
        },
        locations: ShopLocations.coreShopLocations,
    },
    {
        name: 'Example Selling Store',
        type: 'Sell',
        data: {
            blip: {
                sprite: 52,
                color: 1,
                scale: 1,
                shortRange: true,
            },
            items: [],
            interactionRange: 2,
        },
        locations: ShopLocations.sellerExampleLocations,
    },
    {
        name: 'LTD',
        type: 'Buy',
        data: {
            blip: {
                sprite: 59,
                color: 2,
                scale: 1,
                shortRange: true,
            },
            items: [],
            interactionRange: 2,
        },
        locations: ShopLocations.ltdLocations,
    },
    {
        name: 'Robs Liquor',
        type: 'Buy',
        data: {
            blip: {
                sprite: 59,
                color: 2,
                scale: 1,
                shortRange: true,
            },
            items: [],
            interactionRange: 2,
        },
        locations: ShopLocations.robsLiquorLocations,
    },
    {
        name: 'Juice',
        type: 'Buy',
        data: {
            blip: {
                sprite: 59,
                color: 2,
                scale: 1,
                shortRange: true,
            },
            items: [],
            interactionRange: 2,
        },
        locations: ShopLocations.juiceLocations,
    },
    {
        name: 'Liquor ACE',
        type: 'Buy',
        data: {
            blip: {
                sprite: 59,
                color: 2,
                scale: 1,
                shortRange: true,
            },
            items: [],
            interactionRange: 2,
        },
        locations: ShopLocations.liquorAceLocations,
    },
    {
        name: 'Tool Shop',
        type: 'Buy',
        data: {
            blip: {
                sprite: 59,
                color: 2,
                scale: 1,
                shortRange: true,
            },
            items: [],
            interactionRange: 2,
        },
        locations: ShopLocations.toolShopLocations,
    },
    {
        name: 'Ammunation',
        type: 'Buy',
        data: {
            blip: {
                sprite: 110,
                color: 2,
                scale: 1,
                shortRange: true,
            },
            items: [],
            interactionRange: 2,
        },
        locations: ShopLocations.ammunationLocations,
    },
    {
        name: 'Tequi-la-la',
        type: 'Buy',
        data: {
            blip: {
                sprite: 93,
                color: 48,
                scale: 1,
                shortRange: true,
            },
            items: [],
            interactionRange: 2,
        },
        locations: ShopLocations.tequiLaLaLocations,
    },
    {
        name: 'Bahama Mamas',
        type: 'Buy',
        data: {
            blip: {
                sprite: 93,
                color: 48,
                scale: 1,
                shortRange: true,
            },
            items: [],
            interactionRange: 2,
        },
        locations: ShopLocations.bahamaMamasLocations,
    },
    {
        name: 'Vanilla Unicorn',
        type: 'Buy',
        data: {
            blip: {
                sprite: 93,
                color: 48,
                scale: 1,
                shortRange: true,
            },
            items: [],
            interactionRange: 2,
        },
        locations: ShopLocations.vanillaUnicornLocations,
    },
    {
        name: 'Vending Machine',
        type: 'Buy',
        data: {
            items: [],
            interactionRange: 2,
        },
        locations: ShopLocations.vendingMachinesShop,
    },
];
