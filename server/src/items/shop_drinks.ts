import { ShopEvents } from '@AthenaPlugins/plugin-shop/shared/enums/ShopEvents';
import { BaseItem } from '@AthenaShared/interfaces/item';

const drinkBehavior = { canDrop: true, canStack: true, canTrade: true };

export const shopDrinks: Array<BaseItem> = [
    {
        name: 'Waterbottle',
        icon: '@AthenaPlugins/icons/plugin-shop/waterbottle.png',
        behavior: drinkBehavior,
        data: {
            amount: 25,
        },
        dbName: 'shop-water',
        weight: 1,
        consumableEventToCall: ShopEvents.DRINK_EFFECT,
    },
    {
        name: 'Energy Drink',
        icon: '@AthenaPlugins/icons/plugin-shop/energydrink.png',
        behavior: drinkBehavior,
        data: {
            amount: 10,
        },
        dbName: 'shop-energy',
        weight: 0.25,
        consumableEventToCall: ShopEvents.DRINK_EFFECT,
    },
    {
        name: 'Cola',
        icon: '@AthenaPlugins/icons/plugin-shop/cola.png',
        behavior: drinkBehavior,
        data: {
            amount: 5,
        },
        dbName: 'shop-cola',
        weight: 0.75,
        consumableEventToCall: ShopEvents.DRINK_EFFECT,
    },
];
