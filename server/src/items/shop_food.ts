import effects from '@AthenaShared/enums/effects';
import { ITEM_TYPE } from '@AthenaShared/enums/itemTypes';
import { Item } from '@AthenaShared/interfaces/item';

export const shopFood: Array<Item> = [
    {
        name: 'Hotdog',
        description: 'Feeling hungry?',
        icon: 'crate',
        quantity: 1,
        behavior: ITEM_TYPE.CAN_TRADE | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_DROP | ITEM_TYPE.CONSUMABLE,
        data: {
            amount: 25,
            event: effects.EFFECT_FOOD,
            sound: 'item_eat',
        },
        dbName: 'Shophotdog',
        version: 2,
    },
];
