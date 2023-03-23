import * as alt from 'alt-client';
import * as Athena from '@AthenaClient/api';

import ViewModel from '../../../client/models/viewModel';
import { ShopEvents } from '../shared/enums/ShopEvents';
import { IShopItem } from '../shared/interfaces/IShopItem';

const PAGE_NAME = 'OSS_ShopUI';

const state = {
    items: [] as Array<IShopItem>,
    action: '',
    shopName: '',
    cardAccepted: false,
};

class InternalFunctions implements ViewModel {
    static async open() {
        Athena.webview.setOverlayVisible(PAGE_NAME, false);

        Athena.webview.on(`${PAGE_NAME}:Ready`, InternalFunctions.ready);
        Athena.webview.openPages([PAGE_NAME], true, InternalFunctions.close);

        Athena.webview.focus();
        Athena.webview.showCursor(true);

        alt.toggleGameControls(false);

        alt.Player.local.isMenuOpen = true;
    }

    static async close() {
        alt.toggleGameControls(true);
        Athena.webview.setOverlaysVisible(true);

        Athena.webview.closePages([PAGE_NAME]);
        Athena.webview.unfocus();
        Athena.webview.showCursor(false);

        alt.Player.local.isMenuOpen = false;
    }

    static async ready() {
        Athena.webview.emit(ShopEvents.SET_ITEMS, state.items, state.action, state.shopName, state.cardAccepted);
    }
}

alt.onServer(ShopEvents.OPEN_SHOP, (shopItems, type, name, acceptsCard) => {
    state.items = shopItems;
    state.action = type;
    state.shopName = name;
    state.cardAccepted = acceptsCard;

    InternalFunctions.open();
});

Athena.webview.on(ShopEvents.CLOSE_SHOP, () => {
    InternalFunctions.close();
});
