import * as alt from 'alt-server'; 
import { playerFuncs } from '../../../server/extensions/Player';
import { ItemFactory } from '../../../server/systems/item';
const PAGENAME = 'ShopUI';
alt.onClient(`${PAGENAME}:Server:HandleShop`, async (player: alt.Player, shopItem: any, amount: number, type: string) => {
    const itemToAdd = await ItemFactory.get(shopItem.dbName);
    const itemIsInInventory = playerFuncs.inventory.isInInventory(player, { name: itemToAdd.name });
    const emptySlot = playerFuncs.inventory.getFreeInventorySlot(player);
    alt.log(JSON.stringify(itemIsInInventory))
    if(!itemIsInInventory) {
        itemToAdd.quantity = amount;
        playerFuncs.inventory.inventoryAdd(player, itemToAdd, emptySlot.slot);
        playerFuncs.save.field(player, 'inventory', player.data.inventory);
        playerFuncs.sync.inventory(player);
        playerFuncs.emit.notification(player, `You've bought ${itemToAdd.name} x${amount} for ${shopItem.price * amount}$!`);
        return;
    } else if(itemIsInInventory) {
        player.data.inventory[itemIsInInventory.index].quantity += amount;
        playerFuncs.save.field(player, 'inventory', player.data.inventory);
        playerFuncs.sync.inventory(player);
        playerFuncs.emit.notification(player, `You've bought ${itemToAdd.name} for ${shopItem.price * amount}$`);
        return;
    }
}); 