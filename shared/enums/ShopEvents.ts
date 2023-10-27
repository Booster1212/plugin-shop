export const enum ShopEvents {
    OPEN_SHOP = 'open-source-shop:open-shop',
    CLOSE_SHOP = 'open-source-shop:close-shop',
    HANDLE_SHOP = 'open-source-shop:handle-shop',

    // Shop (Active) Events
    SET_ITEMS = 'open-source-shop:set-items',
    REQUEST_SHOP_ITEMS = 'open-source-shop:request-shop-items',
    RESET_CART = 'open-source-shop:reset-cart',

    // Cart Events
    BUY_ITEMS_FROM_CART = 'open-source-shop:buy-items-from-cart',
    SELL_ITEMS_FROM_CART = 'open-source-shop:sell-items-from-cart',
}
