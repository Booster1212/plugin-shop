import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api';

import { ShopEvents } from '@AthenaPlugins/open-source-shop/shared/enums/ShopEvents';
import { CurrencyTypes } from '../../../../shared/enums/currency';
import { ShopTranslations } from '@AthenaPlugins/open-source-shop/shared/enums/Translations';
import { ShopType } from '@AthenaPlugins/open-source-shop/shared/enums/ShopType';

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
        if (type === ShopType.BUY) {
            if (totalPrice > funds) {
                Athena.player.emit.notification(player, ShopTranslations.notEnoughFunds);
                return;
            }

            const isAdded = await Athena.player.inventory.add(player, {
                dbName: baseItemFound.dbName,
                data: baseItemFound.data,
                quantity: amount,
            });

            if (!isAdded) {
                Athena.player.emit.notification(player, `Can't add item. Inventory full?`);
                return;
            }

            Athena.player.currency.sub(player, moneyType, totalPrice);

            Athena.player.emit.notification(player, `You've bought ${shopItem.name} x${amount} for ${totalPrice}$!`);
        } else if (type === ShopType.SELL) {
            const isRemoved = await Athena.player.inventory.sub(player, {
                dbName: baseItemFound.dbName,
                quantity: amount,
            });

            if (!isRemoved) {
                Athena.player.emit.notification(player, `You don't have x${amount} of ${baseItemFound.name}!`);
                return;
            }

            Athena.player.currency.add(player, moneyType, totalPrice);

            Athena.player.emit.notification(player, `You've sold ${baseItemFound.name} x${amount} for ${totalPrice}$!`);
        }
    },
);
