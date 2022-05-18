import * as alt from 'alt-server';
import { Athena } from '../../../../server/api/athena';
import { ItemFactory } from '../../../../server/systems/item';
import { CurrencyTypes } from '../../../../shared/enums/currency';
import { OSS_TRANSLATIONS } from '../../shared/enums/ossTranslations';
import { ShopEvents } from '../../shared/events';

alt.onClient(ShopEvents.handleShop, async (player: alt.Player, shopItem: any, amount: number, type: string) => {
    const itemToAdd = await ItemFactory.get(shopItem.dbName);
    if (!itemToAdd) return;
    if (amount < 1) {
        Athena.player.emit.notification(player, `How do you think this would be possible?`);
        return;
    }
    if (type === 'buy') {
        //Buying here
        if (shopItem.price * amount > player.data.cash) {
            Athena.player.emit.notification(player, OSS_TRANSLATIONS.notEnoughCash);
            return;
        }

        let itemsLeftToStoreInInventory = await Athena.player.inventory.addAmountToInventoryReturnRemainingAmount(
            player,
            shopItem.dbName,
            amount,
        );
        //Let's calc the price, because maybe we still have something left wich doesnt fit into Inventory
        if (amount === itemsLeftToStoreInInventory) {
            Athena.player.emit.notification(player, `Your inventory is full!`);
        } else {
            let totalPrice = (amount - itemsLeftToStoreInInventory) * shopItem.price;
            Athena.player.currency.sub(player, CurrencyTypes.CASH, totalPrice);
            Athena.player.emit.notification(
                player,
                `You've bought ${itemToAdd.name} x${amount - itemsLeftToStoreInInventory} for ${totalPrice}$!`,
            );
            Athena.player.save.field(player, 'inventory', player.data.inventory);
            Athena.player.sync.inventory(player);
            return;
        }
    } else {
        let amountLeft = await Athena.player.inventory.removeAmountFromInventoryReturnRemainingAmount(
            player,
            shopItem.dbName,
            amount,
        );
        if (amount === amountLeft) {
            Athena.player.emit.notification(player, `You dont have any of this item!`);
        } else {
            let totalPrice = (amount - amountLeft) * shopItem.price;
            Athena.player.save.field(player, 'inventory', player.data.inventory);
            Athena.player.sync.inventory(player);
            Athena.player.currency.add(player, CurrencyTypes.CASH, totalPrice);
            Athena.player.emit.notification(
                player,
                `You've sold ${itemToAdd.name} x${amount - amountLeft} for ${totalPrice}$`,
            );
            return;
        }
    }
});
