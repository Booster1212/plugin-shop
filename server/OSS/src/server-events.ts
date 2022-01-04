import * as alt from 'alt-server'; 
import { playerFuncs } from '../../../server/extensions/Player';
import { ItemFactory } from '../../../server/systems/item';

alt.onClient('OSS:Server:HandleShop', async (player: alt.Player, shopItem: any, index: number, amount: number) => {
    const emptySlot = playerFuncs.inventory.getFreeInventorySlot(player);
    const addedItem = await ItemFactory.get(shopItem.dbName);
    alt.log(JSON.stringify(shopItem));
    alt.log(JSON.stringify(shopItem.name))
    alt.log(JSON.stringify(addedItem));
    alt.log(emptySlot);
    // playerFuncs.inventory.inventoryAdd(player, addedItem, emptySlot.slot);
});