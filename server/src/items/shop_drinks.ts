import effects from '@AthenaShared/enums/effects';
import { ITEM_TYPE } from '@AthenaShared/enums/itemTypes';
import { Item } from '@AthenaShared/interfaces/item';

export const shopDrinks: Array<Item> = [
    {
        name: 'Waterbottle',
        description: 'Feeling thirsty?',
        icon: 'crate',
        quantity: 0,
        behavior: ITEM_TYPE.CAN_TRADE | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_DROP | ITEM_TYPE.CONSUMABLE,
        data: {
            amount: 25,
            event: effects.EFFECT_WATER,
            sound: 'item_eat',
        },
        dbName: 'Shopwater',
        version: 2,
    },
    {
        name: 'Energy Drink',
        description: 'Feeling thirsty?',
        icon: 'crate',
        quantity: 0,
        behavior: ITEM_TYPE.CAN_TRADE | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_DROP | ITEM_TYPE.CONSUMABLE,
        data: {
            amount: 10,
            event: effects.EFFECT_WATER,
            sound: 'item_eat',
        },
        dbName: 'Shopenergy',
        version: 2,
    },
    {
        name: 'Cola',
        description: 'Feeling thirsty?',
        icon: 'crate',
        quantity: 0,
        behavior: ITEM_TYPE.CAN_TRADE | ITEM_TYPE.CAN_STACK | ITEM_TYPE.CAN_DROP | ITEM_TYPE.CONSUMABLE,
        data: {
            amount: 5,
            event: effects.EFFECT_WATER,
            sound: 'item_eat',
        },
        dbName: 'Shopcola',
        version: 2,
    },
];
