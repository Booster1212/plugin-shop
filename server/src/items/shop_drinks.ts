import effects from '@AthenaShared/enums/effects';
import { BaseItem } from '@AthenaShared/interfaces/item';

const drinkBehavior = { canDrop: true, canStack: true, canTrade: true };

export const shopDrinks: Array<BaseItem> = [
    {
        name: 'Waterbottle',
        icon: '@AthenaPlugins/icons/open-source-shop/waterbottle.png',
        behavior: drinkBehavior,
        data: {
            amount: 25,
            event: effects.EFFECT_WATER,
            sound: 'item_eat',
        },
        dbName: 'shop-water',
        weight: 1,
    },
    {
        name: 'Energy Drink',
        icon: 'crate',
        behavior: drinkBehavior,
        data: {
            amount: 10,
            event: effects.EFFECT_WATER,
            sound: 'item_eat',
        },
        dbName: 'shop-energy',
        weight: 0.25,
    },
    {
        name: 'Cola',
        icon: 'crate',
        behavior: drinkBehavior,
        data: {
            amount: 5,
            event: effects.EFFECT_WATER,
            sound: 'item_eat',
        },
        dbName: 'shop-cola',
        weight: 0.75,
    },
];
