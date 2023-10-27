import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api/index.js';
import { ShopEvents } from '@AthenaPlugins/plugin-shop/shared/enums/ShopEvents.js';

alt.onClient(ShopEvents.REQUEST_SHOP_ITEMS, (player: alt.Player) => {
    console.log(`Requesting Shop Items..`);

    Athena.webview.emit(player, ShopEvents.SET_ITEMS);
});
