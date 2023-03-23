import effects from '@AthenaShared/enums/effects';
import { BaseItem } from '@AthenaShared/interfaces/item';

const foodBehavior = { canDrop: true, canStack: true, canTrade: true };

export const shopFood: Array<BaseItem> = [
    {
        name: 'Bread',
        weight: 0.25,
        icon: 'crate',
        behavior: foodBehavior,
        data: {
            amount: 25,
            event: effects.EFFECT_FOOD,
            sound: 'item_eat',
        },
        dbName: 'shop-bread',
    },
    {
        name: 'Hotdog',
        weight: 1,
        icon: 'crate',
        behavior: foodBehavior,
        data: {
            amount: 25,
            event: effects.EFFECT_FOOD,
            sound: 'item_eat',
        },
        dbName: 'shop-hotdog',
    },
];
