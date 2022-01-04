import * as alt from 'alt-client';

alt.onServer('OSS:Client:OpenShop', (shopItems, type: string) => {
    alt.emit('OSS:Vue:Open', shopItems, type);
    return;
});