import * as alt from 'alt-server';
import { Athena } from '../../../../server/api/athena';
import { ItemFactory } from '../../../../server/systems/item';
import { CurrencyTypes } from '../../../../shared/enums/currency';

import { iShopItem } from '../../shared/interfaces/IShopItem';
import { OSS_TRANSLATIONS } from '../index';

const PAGENAME = 'ShopUI';
alt.onClient(
    `${PAGENAME}:Server:HandleShop`,
    async (player: alt.Player, shopItem: iShopItem, amount: number, type: string) => {
        const itemToAdd = await ItemFactory.get(shopItem.dbName);
        if (!itemToAdd) return;
        if (amount < 1) {
            Athena.player.emit.notification(player, `How do you think this would be possible?`);
            return;
        }
        const itemIsInInventory = Athena.player.inventory.isInInventory(player, { name: itemToAdd.name });
        const emptySlot = Athena.player.inventory.getFreeInventorySlot(player);
        if (type === 'buy') {
            if (!itemIsInInventory) {
                if (shopItem.price * amount > player.data.cash) {
                    Athena.player.emit.notification(player, OSS_TRANSLATIONS.notEnoughCash);
                    return;
                }
                itemToAdd.quantity = amount;
                Athena.player.inventory.inventoryAdd(player, itemToAdd, emptySlot.slot);
                Athena.player.save.field(player, 'inventory', player.data.inventory);
                Athena.player.sync.inventory(player);
                Athena.player.currency.sub(player, CurrencyTypes.CASH, amount * shopItem.price);
                Athena.player.emit.notification(
                    player,
                    `You've bought ${itemToAdd.name} x${amount} for ${shopItem.price * amount}$!`,
                );
                return;
            } else if (itemIsInInventory) {
                if (shopItem.price * amount > player.data.cash) {
                    Athena.player.emit.notification(player, OSS_TRANSLATIONS.notEnoughCash);
                    return;
                }
                player.data.inventory[itemIsInInventory.index].quantity += amount;
                Athena.player.save.field(player, 'inventory', player.data.inventory);
                Athena.player.sync.inventory(player);
                Athena.player.currency.sub(player, CurrencyTypes.CASH, amount * shopItem.price);
                Athena.player.emit.notification(
                    player,
                    `You've bought ${itemToAdd.name} for ${shopItem.price * amount}$`,
                );
                return;
            }
        } else {
            if (itemIsInInventory) {
                if (amount > player.data.inventory[itemIsInInventory.index].quantity) {
                    Athena.player.emit.notification(player, `Invalid action.`);
                    return;
                }
                player.data.inventory[itemIsInInventory.index].quantity -= amount;
                if (player.data.inventory[itemIsInInventory.index].quantity <= 1) {
                    Athena.player.inventory.findAndRemove(player, player.data.inventory[itemIsInInventory.index].name);
                }
                Athena.player.save.field(player, 'inventory', player.data.inventory);
                Athena.player.sync.inventory(player);
                Athena.player.emit.notification(player, `You've sold ${itemToAdd.name} for ${shopItem.price * amount}$`);
                Athena.player.currency.add(player, CurrencyTypes.CASH, shopItem.price * amount);
                return;
            }
        }
    },
);
