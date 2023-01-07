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
        dbName: '24-7-Shop',
        blipSprite: 59,
        blipColor: 2,
        blipScale: 1,
        data: {
            items: [
                { dbName: 'bread', price: 75 },
                { dbName: 'Shophotdog', price: 375 },
                { dbName: 'Shopwater', price: 250 },
                { dbName: 'Shopcola', price: 250 },
                { dbName: 'Shopenergy', price: 300 },
            ],
        },
        locations: coreShopLocations,
    },
    {
        name: 'Seller Example',
        dbName: 'SellerExample',
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
        dbName: 'LTD',
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
        dbName: 'RobsLiquor',
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
        dbName: 'Juice',
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
        dbName: 'LiquorACE',
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
        dbName: 'ToolShop',
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
        dbName: 'Ammunation',
        blipSprite: 110,
        blipColor: 2,
        blipScale: 1,
        data: {
            items: [
                { dbName: 'Pistol', price: 50000 },
                { dbName: 'Railgun', price: 500000 },
            ],
        },
        locations: ammunationLocations,
    },
    {
        name: 'Tequi-la-la',
        dbName: 'Tequi-la-la',
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
        dbName: 'BahamaMamas',
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
        dbName: 'VanillaUnicorn',
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
