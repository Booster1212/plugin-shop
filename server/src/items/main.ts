import * as Athena from '@AthenaServer/api';
import * as Shop from '@AthenaPlugins/open-source-shop/server/src/controller';

import { shopFood } from './shop_food';
import { shopDrinks } from './shop_drinks';
import { shopDrinksAlcoholic } from './shop_drinks_alcoholic';
import { ShopEvents } from '@AthenaPlugins/open-source-shop/shared/enums/ShopEvents';

const itemsToAdd = [...shopFood, ...shopDrinks, ...shopDrinksAlcoholic];

async function registerShopItems() {
    for (const item of itemsToAdd) {
        await Athena.systems.inventory.factory.upsertAsync(item);
    }
}

registerShopItems();

Athena.systems.inventory.effects.add(ShopEvents.FOOD_EFFECT, Shop.foodEffect);
Athena.systems.inventory.effects.add(ShopEvents.DRINK_EFFECT, Shop.drinkEffect);
Athena.systems.inventory.effects.add(ShopEvents.DRINK_EFFECT_ALCOHOLIC, Shop.drinkEffectAlcoholic);
