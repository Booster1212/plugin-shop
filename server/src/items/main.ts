import { ItemFactory } from '@AthenaServer/systems/item';
import { shopDrinks } from './shop_drinks';
import { shopFood } from './shop_food';

const addAllItems = async () => {
    const shopItems = {
        ...shopFood,
        ...shopDrinks,
    };

    for (const item in shopItems) {
        const itemToAdd = shopItems[item];
        await ItemFactory.add(itemToAdd);
        await ItemFactory.update(itemToAdd.dbName, itemToAdd);
    }
};

addAllItems();
