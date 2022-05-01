import * as alt from 'alt-client';
import { iShopItem } from '../../shared/interfaces/IShopItem';

const PAGE_NAME = 'ShopUI';

alt.onServer(`${PAGE_NAME}:Client:OpenShop`, (shopItems: Array<iShopItem>, type: string, shopImg: string) => {
    alt.emit(`${PAGE_NAME}:Vue:Open`, shopItems, type, shopImg);
    return;
});
