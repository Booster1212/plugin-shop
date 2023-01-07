import { ShopEvents } from '@AthenaPlugins/open-source-shop/shared/enums/ShopEvents';
import { OSS_TRANSLATIONS } from '@AthenaPlugins/open-source-shop/shared/enums/Translations';
import * as alt from 'alt-server';
import { Athena } from '../../../../server/api/athena';
import { ItemFactory } from '../../../../server/systems/item';
import { CurrencyTypes } from '../../../../shared/enums/currency';

alt.onClient(
    ShopEvents.HANDLE_SHOP,
    async (player: alt.Player, shopItem: any, amount: number, type: string, usingCash: boolean) => {
        const itemToAdd = await ItemFactory.get(shopItem.dbName);

        if (!itemToAdd) {
            return;
        }

        if (amount < 1) {
            Athena.player.emit.notification(player, `How do you think this would be possible?`);
            return;
        }

        const funds = usingCash ? player.data.cash : player.data.bank;
        const moneyType = usingCash ? CurrencyTypes.CASH : CurrencyTypes.BANK;

        if (type === 'buy') {
            if (shopItem.price * amount > funds) {
                Athena.player.emit.notification(player, OSS_TRANSLATIONS.notEnoughFunds);
                return;
            }

            const itemsLeftToStoreInInventory = await Athena.player.inventory.addAmountToInventoryReturnRemainingAmount(
                player,
                shopItem.dbName,
                amount,
            );

            if (amount === itemsLeftToStoreInInventory) {
                Athena.player.emit.notification(player, `Your inventory is full!`);
                return;
            }

            const totalPrice = (amount - itemsLeftToStoreInInventory) * shopItem.price;
            Athena.player.currency.sub(player, moneyType, totalPrice);
            Athena.player.emit.notification(
                player,
                `You've bought ${itemToAdd.name} x${amount - itemsLeftToStoreInInventory} for ${totalPrice}$!`,
            );
            Athena.player.save.save(player, 'inventory', player.data.inventory);
            Athena.player.sync.inventory(player);
        } else {
            const amountLeft = await Athena.player.inventory.removeAmountFromInventoryReturnRemainingAmount(
                player,
                shopItem.dbName,
                amount,
            );
            if (amount === amountLeft) {
                Athena.player.emit.notification(player, `You dont have any of this item!`);
                return;
            }

            const totalPrice = (amount - amountLeft) * shopItem.price;
            Athena.player.save.save(player, 'inventory', player.data.inventory);
            Athena.player.sync.inventory(player);
            Athena.player.currency.add(player, moneyType, totalPrice);
            Athena.player.emit.notification(
                player,
                `You've sold ${itemToAdd.name} x${amount - amountLeft} for ${totalPrice}$`,
            );
        }
    },
);
