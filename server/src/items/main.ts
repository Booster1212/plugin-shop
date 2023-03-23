import * as Athena from '@AthenaServer/api';

import { shopFood } from './shop_food';
import { shopDrinks } from './shop_drinks';

const itemsToAdd = [...shopFood, ...shopDrinks];

async function registerShopItems() {
    for (const item of itemsToAdd) {
        await Athena.systems.inventory.factory.upsertAsync(item);
    }
}

registerShopItems();
