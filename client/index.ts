import * as alt from 'alt-client';
import * as AthenaClient from '@AthenaClient/api';
import { onTicksStart } from '@AthenaClient/events/onTicksStart';
import { ShopEvents } from '../shared/enums/ShopEvents';

function init() {
    const page = new AthenaClient.webview.Page({
        name: 'OSS_ShopUI',
        callbacks: {
            onReady: async () => {},
            onClose: () => {},
        },
        options: {
            onOpen: {
                focus: true,
                hideHud: true,
                setIsMenuOpenToTrue: true,
                hideOverlays: false,
                showCursor: true,
                disableControls: 'all',
                disablePauseMenu: true,
            },
            onClose: {
                hideCursor: true,
                showHud: true,
                unfocus: true,
                setIsMenuOpenToFalse: true,
                enableControls: true,
                enablePauseMenu: true,
            },
        },
    });

    alt.onServer(ShopEvents.OPEN_SHOP, () => {
        if (typeof page !== 'undefined') {
            page.open();
        }
    });
}

onTicksStart.add(init);
