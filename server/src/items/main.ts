import * as Athena from '@AthenaServer/api/index.js';
import * as Shop from '@AthenaPlugins/plugin-shop/server/src/controller.js';

import { shopFood } from './shop_food.js';
import { shopDrinks } from './shop_drinks.js';
import { shopDrinksAlcoholic } from './shop_drinks_alcoholic.js';
import { ShopEvents } from '@AthenaPlugins/plugin-shop/shared/enums/ShopEvents.js';

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
