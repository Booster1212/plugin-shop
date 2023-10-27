import { BaseItem } from "@AthenaShared/interfaces/item.js";

export const ShopItems: Array<BaseItem> = [
    {
        name: 'Waterbottle',
        icon: '@AthenaPlugins/icons/plugin-shop/waterbottle.png',
        behavior: { canDrop: true },
        data: {},
        dbName: 'shop-water',
        weight: 1,
    },
];
