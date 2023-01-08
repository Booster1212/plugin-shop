import * as alt from 'alt-client';

import { AthenaClient } from '@AthenaClient/api/athena';
import { WebViewController } from '../../../client/extensions/view2';
import ViewModel from '../../../client/models/viewModel';
import { isAnyMenuOpen } from '../../../client/utility/menus';
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
        if (isAnyMenuOpen()) {
            return;
        }

        await WebViewController.setOverlaysVisible(false);

        AthenaClient.webview.on(`${PAGE_NAME}:Ready`, InternalFunctions.ready);
        AthenaClient.webview.open([PAGE_NAME], true, InternalFunctions.close);

        WebViewController.openPages([PAGE_NAME]);
        WebViewController.focus();
        WebViewController.showCursor(true);

        alt.toggleGameControls(false);

        alt.Player.local.isMenuOpen = true;
    }

    static async close() {
        alt.toggleGameControls(true);
        WebViewController.setOverlaysVisible(true);

        WebViewController.closePages([PAGE_NAME]);
        WebViewController.unfocus();
        WebViewController.showCursor(false);

        alt.Player.local.isMenuOpen = false;
    }

    static async ready() {
        AthenaClient.webview.emit(ShopEvents.SET_ITEMS, state.items, state.action, state.shopName, state.cardAccepted);
    }
}

alt.onServer(ShopEvents.OPEN_SHOP, (shopItems, type, name, acceptsCard) => {
    state.items = shopItems;
    state.action = type;
    state.shopName = name;
    state.cardAccepted = acceptsCard;
    InternalFunctions.open();
});

AthenaClient.webview.on(ShopEvents.CLOSE_SHOP, () => {
    InternalFunctions.close();
});
