import { ShopEvents } from '@AthenaPlugins/open-source-shop/shared/enums/ShopEvents';
import { BaseItem } from '@AthenaShared/interfaces/item';

const drinkBehavior = { canDrop: true, canStack: true, canTrade: true };
export const shopDrinksAlcoholic: Array<BaseItem> = [
    {
        name: 'Beer',
        icon: '@AthenaPlugins/icons/open-source-shop/beer.png',
        behavior: drinkBehavior,
        data: {
            amount: 25,
        },
        dbName: 'shop-beer',
        weight: 1,
        consumableEventToCall: ShopEvents.DRINK_EFFECT_ALCOHOLIC,
    },
];
