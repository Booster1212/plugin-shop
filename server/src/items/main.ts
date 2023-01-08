import * as alt from 'alt-server';
import { ItemFactory } from '@AthenaServer/systems/item';

import { shopFood } from './shop_food';
import { shopDrinks } from './shop_drinks';

const itemsToAdd = [...shopFood, ...shopDrinks];

function addAllItems() {
    itemsToAdd.forEach((item) => {
        ItemFactory.add(item);
        alt.log(`[OSS] Added ${item.name} Items to the ItemFactory`);
    });
}

addAllItems();
