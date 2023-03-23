import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api';

import { ShopEvents } from '@AthenaPlugins/open-source-shop/shared/enums/ShopEvents';
import { OSS_TRANSLATIONS } from '@AthenaPlugins/open-source-shop/shared/enums/Translations';
import { CurrencyTypes } from '../../../../shared/enums/currency';

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

        if (type === 'buy') {
            const totalPrice = amount * shopItem.price;

            if (totalPrice > funds) {
                Athena.player.emit.notification(player, OSS_TRANSLATIONS.notEnoughFunds);
                return;
            }

            const itemAdded = await Athena.player.inventory.add(player, {
                dbName: baseItemFound.dbName,
                data: baseItemFound.data,
                quantity: amount,
            });

            alt.logWarning(
                `Item was added? => ${itemAdded} | Base Item Search Found => ${JSON.stringify(baseItemFound)}`,
            );

            Athena.player.currency.sub(player, moneyType, totalPrice);

            Athena.player.emit.notification(player, `You've bought ${shopItem.name} x${amount} for ${totalPrice}$!`);
        }
        /* ELSE SELL MISSING */
    },
);
