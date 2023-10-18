import { ShopEvents } from '@AthenaPlugins/plugin-shop/shared/enums/ShopEvents.js';
import { BaseItem } from '@AthenaShared/interfaces/item.js';

const foodBehavior = { canDrop: true, canStack: true, canTrade: true };

export const shopFood: Array<BaseItem> = [
    {
        name: 'Bread',
        weight: 0.25,
        icon: '@AthenaPlugins/icons/plugin-shop/bread.png',
        behavior: foodBehavior,
        data: {
            amount: 25,
        },
        dbName: 'shop-bread',
        consumableEventToCall: ShopEvents.FOOD_EFFECT,
    },
    {
        name: 'Hotdog',
        weight: 1,
        icon: '@AthenaPlugins/icons/plugin-shop/hotdog.png',
        behavior: foodBehavior,
        data: {
            amount: 25,
        },
        dbName: 'shop-hotdog',
        consumableEventToCall: ShopEvents.FOOD_EFFECT,
    },
    {
        name: 'Pizza',
        weight: 2.5,
        icon: '@AthenaPlugins/icons/plugin-shop/pizza.png',
        behavior: foodBehavior,
        data: {
            amount: 25,
        },
        dbName: 'shop-pizza',
        consumableEventToCall: ShopEvents.FOOD_EFFECT,
    },
];
