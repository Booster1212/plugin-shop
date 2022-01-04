import * as alt from 'alt-client';

alt.onServer('OSS:Client:OpenShop', (shopItems) => {
    alt.emit('OSS:Vue:Open', shopItems);
});