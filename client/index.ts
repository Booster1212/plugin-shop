import * as alt from 'alt-client';
import { WebViewController } from '../../../client/extensions/view2';
import ViewModel from '../../../client/models/viewModel';
import { isAnyMenuOpen } from '../../../client/utility/menus';
import { ShopEvents } from '../shared/events';
import { iShopItem } from '../shared/interfaces/IShopItem';

const PAGE_NAME = 'ShopUI';
const shopView = await WebViewController.get();
let items: Array<iShopItem> = [];
let action: string;

class InternalFunctions implements ViewModel {
    static async open() {
        if (isAnyMenuOpen()) {
            return;
        }

        await WebViewController.setOverlaysVisible(false);

        const view = await WebViewController.get();
        view.on(`${PAGE_NAME}:Ready`, InternalFunctions.ready);
        view.on(`${PAGE_NAME}:Close`, InternalFunctions.close);

        WebViewController.openPages([PAGE_NAME]);
        WebViewController.focus();
        WebViewController.showCursor(true);

        alt.toggleGameControls(false);

        alt.Player.local.isMenuOpen = true;
    }

    static async close() {
        alt.toggleGameControls(true);
        WebViewController.setOverlaysVisible(true);

        const view = await WebViewController.get();
        view.off(`${PAGE_NAME}:Ready`, InternalFunctions.ready);
        view.off(`${PAGE_NAME}:Close`, InternalFunctions.close);

        WebViewController.closePages([PAGE_NAME]);

        WebViewController.unfocus();
        WebViewController.showCursor(false);

        alt.Player.local.isMenuOpen = false;
    }

    static async ready() {
        shopView.emit(ShopEvents.fillVueArray, items, action);
        alt.log("Emitting...")
    }
}

alt.on(`${PAGE_NAME}:Vue:Open`, (shopItems: Array<iShopItem>, type: string) => {
    items = shopItems;
    action = type;
    InternalFunctions.open();
    return;
});

alt.onServer(`${PAGE_NAME}:Client:OpenShop`, (shopItems: Array<iShopItem>, type: string, shopImg: string) => {
    // alt.emit(`${PAGE_NAME}:Vue:Open`, shopItems, type, shopImg);
    items = shopItems;
    action = type;
    InternalFunctions.open();
    return;
});

shopView.on(`${PAGE_NAME}:Client:HandleShop`, (shopItem: {}[], amount: number, type: string) => {
    alt.emitServer(`${PAGE_NAME}:Server:HandleShop`, shopItem, amount, type);
    return;
});
