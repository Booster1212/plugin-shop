import * as alt from 'alt-server';
import {OSS_TRANSLATIONS} from '..';
import {playerFuncs} from '../../../server/extensions/extPlayer';
import {ItemFactory} from '../../../server/systems/item';
import {CurrencyTypes} from '../../../shared/enums/currency';

const PAGENAME = 'ShopUI';

alt.onClient(
    `${PAGENAME}:Server:HandleShop`,
    async (player: alt.Player, shopItem: any, amount: number, type: string) => {
        const itemToAdd = await ItemFactory.get(shopItem.dbName);
        if (!itemToAdd) return;
        if (amount < 1) {
            playerFuncs.emit.notification(player, `How do you think this would be possible?`);
            return;
        }
        if (type === 'buy') {
            //Buying here
            if (shopItem.price * amount > player.data.cash) {
                playerFuncs.emit.notification(player, OSS_TRANSLATIONS.notEnoughCash);
                return;
            }

            let itemsLeftToStoreInInventory = await playerFuncs.inventory.addAmountToInventoryReturnRemainingAmount(player, shopItem.dbName, amount);
            //Let's calc the price, because maybe we still have something left wich doesnt fit into Inventory
            if (amount === itemsLeftToStoreInInventory) {
                playerFuncs.emit.notification(
                    player,
                    `Your inventory is full!`);
            } else {
                let totalPrice = (amount - itemsLeftToStoreInInventory) * shopItem.price;
                playerFuncs.currency.sub(player, CurrencyTypes.CASH, totalPrice);
                playerFuncs.emit.notification(
                    player,
                    `You've bought ${itemToAdd.name} x${amount - itemsLeftToStoreInInventory} for ${totalPrice}$!`);
                //Save everything
                playerFuncs.save.field(player, 'inventory', player.data.inventory);
                playerFuncs.sync.inventory(player);

                return;
            }
        } else {
            //Selling here
            let amountLeft = await playerFuncs.inventory.removeAmountFromInventoryReturnRemainingAmount(player, shopItem.dbName, amount);
            if (amount === amountLeft) {
                //Might not happen, but better safe than sorry
                playerFuncs.emit.notification(
                    player,
                    `You dont have any of this item!`);
            } else {
                let totalPrice = (amount - amountLeft) * shopItem.price;
                playerFuncs.save.field(player, 'inventory', player.data.inventory);
                playerFuncs.sync.inventory(player);
                playerFuncs.currency.add(player, CurrencyTypes.CASH, totalPrice);
                playerFuncs.emit.notification(player, `You've sold ${itemToAdd.name} x${amount - amountLeft} for ${totalPrice}$`);
                return;
            }
        }
    }
);
