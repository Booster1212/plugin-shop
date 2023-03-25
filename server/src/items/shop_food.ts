import { ShopEvents } from '@AthenaPlugins/open-source-shop/shared/enums/ShopEvents';
import { BaseItem } from '@AthenaShared/interfaces/item';

const foodBehavior = { canDrop: true, canStack: true, canTrade: true };

export const shopFood: Array<BaseItem> = [
    {
        name: 'Bread',
        weight: 0.25,
        icon: '@AthenaPlugins/icons/open-source-shop/bread.png',
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
        icon: '@AthenaPlugins/icons/open-source-shop/hotdog.png',
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
        icon: '@AthenaPlugins/icons/open-source-shop/pizza.png',
        behavior: foodBehavior,
        data: {
            amount: 25,
        },
        dbName: 'shop-pizza',
        consumableEventToCall: ShopEvents.FOOD_EFFECT,
    },
];
