import { ShopEvents } from '@AthenaPlugins/plugin-shop/shared/enums/ShopEvents';
import { BaseItem } from '@AthenaShared/interfaces/item';

const drinkBehavior = { canDrop: true, canStack: true, canTrade: true };
export const shopDrinksAlcoholic: Array<BaseItem> = [
    {
        name: 'Beer',
        icon: '@AthenaPlugins/icons/plugin-shop/beer.png',
        behavior: drinkBehavior,
        data: {
            amount: 25,
        },
        dbName: 'shop-beer',
        weight: 1,
        consumableEventToCall: ShopEvents.DRINK_EFFECT_ALCOHOLIC,
    },
];
