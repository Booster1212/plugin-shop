import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api/index.js';
import { ShopEvents } from '@AthenaPlugins/plugin-shop/shared/enums/ShopEvents.js';
import { icons } from '@AthenaPlugins/plugin-notifications/shared/config.js';

alt.onClient(ShopEvents.BUY_ITEMS_FROM_CART, async (player: alt.Player, cartItems: Array<any>) => {
    const Notify = await Athena.systems.plugins.useAPI('notify');

    const playerData = Athena.document.character.get(player);
    const cartData = Object.values(cartItems);

    if (cartData.length === 0) {
        Notify.send(player, icons['icon-warning'], 10, 'Open Source Shop', 'There are no items in your cart.');
        return;
    }

    let totalPrice = 0;

    for (const item of cartData) {
        const itemTotalPrice = item.quantity * item.price;
        totalPrice += itemTotalPrice;

        if (totalPrice > playerData.cash) {
            Notify.send(player, icons['icon-dangerous'], 10, "Open Source Shop", `You dont have enough money.`);
            return;
        }
    }

    if (!Athena.player.currency.sub(player, 'cash', totalPrice)) return;

    for (const item of cartData) {
        const baseItemFound = item;

        const isAdded = await Athena.player.inventory.add(player, {
            dbName: baseItemFound.dbName,
            data: baseItemFound.data,
            quantity: item.quantity,
        });

        if (!isAdded) {
            Athena.player.emit.notification(player, `Can't add item. Inventory full?`);
            return;
        }
    }

    Athena.webview.emit(player, ShopEvents.RESET_CART);
    Notify.send(
        player,
        icons['icon-info2'],
        10,
        'Open Source Shop',
        `Successfully purchased items. Total: $${totalPrice}`,
    );
});

alt.onClient(ShopEvents.SELL_ITEMS_FROM_CART, async (player: alt.Player, cartItems: Array<any>) => {
    const playerData = Athena.document.character.get(player);
    const cartData = Object.values(cartItems);

    let totalPrice = 0;
    let allItemsRemoved = true;

    for (const item of cartData) {
        const baseItemFound = item;
        const isRemoved = await Athena.player.inventory.sub(player, {
            dbName: baseItemFound.dbName,
            quantity: baseItemFound.quantity,
        });

        if (!isRemoved) {
            allItemsRemoved = false;
        }

        const itemTotalPrice = item.quantity * item.price;
        totalPrice += itemTotalPrice;
    }

    if (allItemsRemoved && totalPrice > 0) {
        console.log(`Sold items for a total of $${totalPrice}`);
        console.log(`All items sold successfully.`);
        Athena.player.currency.add(player, 'cash', totalPrice);
    } else {
        Athena.player.emit.notification(player, `Can't sell items. Something went wrong.`);
        return false;
    }
    return true;
});
