import { ShopType } from '@AthenaPlugins/open-source-shop/shared/enums/ShopType';
import { IShop } from '@AthenaPlugins/open-source-shop/shared/interfaces/IShop';
import { ammunationLocations } from './shopLists/ammunation';
import { bahamaMamasLocations } from './shopLists/bahamaMamas';
import { coreShopLocations } from './shopLists/coreShops';
import { juiceLocations } from './shopLists/juice';
import { liquorAceLocations } from './shopLists/liquorAce';
import { ltdLocations } from './shopLists/ltd';
import { robsLiquorLocations } from './shopLists/robsLiquor';
import { sellerExampleLocations } from './shopLists/sellerExample';
import { tequiLaLaLocations } from './shopLists/tequiLaLa';
import { toolShopLocations } from './shopLists/toolShop';
import { vanillaUnicornLocations } from './shopLists/vanillaUnicorn';

export const ShopRegistry: IShop[] = [
    {
        name: '24/7 Shop',
        blipSprite: 59,
        blipColor: 2,
        blipScale: 1,
        data: {
            items: [
                { dbName: 'shop-bread', price: 75 },
                { dbName: 'shop-hotdog', price: 375 },
                { dbName: 'shop-water', price: 250, icon: 'waterbottle' },
                { dbName: 'shop-cola', price: 250 },
                { dbName: 'shop-energy', price: 300 },
            ],
        },
        locations: coreShopLocations,
    },
    {
        name: 'Seller Example',
        shopType: ShopType.SELL,
        blipSprite: 52,
        blipColor: 1,
        blipScale: 1,
        data: {
            items: [{ dbName: 'burger', price: 330 }],
        },
        locations: sellerExampleLocations,
    },
    {
        name: 'LTD',
        blipSprite: 59,
        blipColor: 2,
        blipScale: 1,
        data: {
            items: [
                { dbName: 'burger', price: 20 },
                { dbName: 'bread', price: 20 },
                // {dbName: 'repair-kit', price: 20}
            ],
        },
        locations: ltdLocations,
    },
    {
        name: 'Robs Liquor',
        blipSprite: 59,
        blipColor: 2,
        blipScale: 1,
        data: {
            items: [
                // {dbName: 'burger', price: 20},
                // {dbName: 'bread', price: 20},
                // {dbName: 'repair-kit', price: 20}
            ],
        },
        locations: robsLiquorLocations,
    },
    {
        name: 'Juice',
        blipSprite: 59,
        blipColor: 2,
        blipScale: 1,
        data: {
            items: [
                // {dbName: 'burger', price: 20},
                // {dbName: 'bread', price: 20},
                // {dbName: 'repair-kit', price: 20}
            ],
        },
        locations: juiceLocations,
    },
    {
        name: 'Liquor ACE',
        blipSprite: 59,
        blipColor: 2,
        blipScale: 1,
        data: {
            items: [
                // {dbName: 'burger', price: 20},
                // {dbName: 'bread', price: 20},
                // {dbName: 'repair-kit', price: 20}
            ],
        },
        locations: liquorAceLocations,
    },
    {
        name: 'Tool Shop',
        blipSprite: 59,
        blipColor: 2,
        blipScale: 1,
        data: {
            items: [
                // {dbName: 'burger', price: 20},
                // {dbName: 'bread', price: 20},
                // {dbName: 'repair-kit', price: 20}
            ],
        },
        locations: toolShopLocations,
    },
    {
        name: 'Ammunation',
        blipSprite: 110,
        blipColor: 2,
        blipScale: 1,
        data: {
            items: [
                { dbName: 'appistol', price: 50000 },
                { dbName: 'assaultrifle', price: 500000 },
            ],
        },
        locations: ammunationLocations,
    },
    {
        name: 'Tequi-la-la',
        blipSprite: 93,
        blipColor: 48,
        blipScale: 1,
        data: {
            items: [
                // {dbName: 'burger', price: 20},
                // {dbName: 'bread', price: 20},
                // {dbName: 'repair-kit', price: 20}
            ],
        },
        locations: tequiLaLaLocations,
    },
    {
        name: 'Bahama Mamas',
        blipSprite: 93,
        blipColor: 48,
        blipScale: 1,
        data: {
            items: [
                // {dbName: 'burger', price: 20},
                // {dbName: 'bread', price: 20},
                // {dbName: 'repair-kit', price: 20}
            ],
        },
        locations: bahamaMamasLocations,
    },
    {
        name: 'Vanilla Unicorn',
        blipSprite: 93,
        blipColor: 48,
        blipScale: 1,
        data: {
            items: [
                // {dbName: 'burger', price: 20},
                // {dbName: 'bread', price: 20},
                // {dbName: 'repair-kit', price: 20}
            ],
        },
        locations: vanillaUnicornLocations,
    },
];
