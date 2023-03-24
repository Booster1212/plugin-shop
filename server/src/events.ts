import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api';

import { ShopEvents } from '@AthenaPlugins/open-source-shop/shared/enums/ShopEvents';
import { OSS_TRANSLATIONS } from '@AthenaPlugins/open-source-shop/shared/enums/Translations';
import { CurrencyTypes } from '../../../../shared/enums/currency';
import { slot } from '@AthenaServer/systems/inventory';
import { modifyItemQuantity } from '@AthenaServer/systems/inventory/manager';

alt.onClient(
    ShopEvents.HANDLE_SHOP,
    async (player: alt.Player, shopItem: any, amount: number, type: string, usingCash: boolean) => {
        if (!shopItem || amount < 1) {
            return;
        }

        const playerData = Athena.document.character.get(player);
        const funds = usingCash ? playerData.cash : playerData.bank;
        const moneyType = usingCash ? CurrencyTypes.CASH : CurrencyTypes.BANK;
        const baseItemFound = await Athena.systems.inventory.factory.getBaseItemAsync(shopItem.dbName);
        const totalPrice = amount * shopItem.price;

        if (type === 'buy') {
            if (totalPrice > funds) {
                Athena.player.emit.notification(player, OSS_TRANSLATIONS.notEnoughFunds);
                return;
            }

            await Athena.player.inventory.add(player, {
                dbName: baseItemFound.dbName,
                data: baseItemFound.data,
                quantity: amount,
            });

            Athena.player.currency.sub(player, moneyType, totalPrice);

            Athena.player.emit.notification(player, `You've bought ${shopItem.name} x${amount} for ${totalPrice}$!`);
        } else {
            const hasAmountInInventory = Athena.player.inventory.has(player, baseItemFound.dbName, amount);

            if (!hasAmountInInventory) {
                Athena.player.emit.notification(
                    player,
                    `You don't have ${baseItemFound.name} x${amount} in your inventory.`,
                );
                return;
            }

            const inventoryItem = playerData.inventory.find((x) => x.dbName === baseItemFound.dbName);
            modifyItemQuantity(inventoryItem, amount, true);
            Athena.player.currency.add(player, moneyType, totalPrice);

            Athena.player.emit.notification(player, `You've sold ${shopItem} x${amount} for ${totalPrice}`);
        }
    },
);
