import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api';
import { ShopEvents } from '@AthenaPlugins/open-source-shop/shared/enums/ShopEvents';

alt.onClient(ShopEvents.BUY_ITEMS_FROM_CART, async (player: alt.Player, cartItems: Array<any>) => {
    const playerData = Athena.document.character.get(player);
    const cartData = Object.values(cartItems);

    let totalPrice = 0;

    for (const item of cartData) {
        const itemTotalPrice = item.quantity * item.price;
        totalPrice += itemTotalPrice;

        if (totalPrice > playerData.cash) {
            Athena.player.emit.notification(player, `Not enough money`);
            return;
        }
    }

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

    console.log(`All items added successfully.`);
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
        playerData.cash += totalPrice;

        console.log(`Sold items for a total of $${totalPrice}`);
        console.log(`All items sold successfully.`);
    } else {
        Athena.player.emit.notification(player, `Can't sell items. Something went wrong.`);
        return false;
    }
    return true;
});
