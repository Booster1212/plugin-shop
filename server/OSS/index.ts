import * as alt from 'alt-server';
import { ServerBlipController } from '../../server/systems/blip';
import { InteractionController } from '../../server/systems/interaction';
import './src/server-events';

const INTERACTION_RANGE = 2;
const SHOPS: alt.Vector3[] = [
    { x: 25.980966567993164, y: -1345.6417236328125, z: 28.497024536132812 } as alt.Vector3,
    { x: -48.5690803527832, y: -1757.6961669921875, z: 28.4210147857666 } as alt.Vector3,
    { x: 1135.9544677734375, y: -981.8599853515625, z: 45.41580581665039 } as alt.Vector3,
    { x: 1163.400634765625, y: -323.938232421875, z: 68.20509338378906 } as alt.Vector3,
    { x: 374.3475341796875, y: 328.112060546875, z: 102.56637573242188 } as alt.Vector3,
    { x: -707.4390258789062, y: -914.5612182617188, z: 18.21558952331543 } as alt.Vector3,
    { x: -1222.91162109375, y: -907.1942749023438, z: 11.326356887817383 } as alt.Vector3,
    { x: -1487.08349609375, y: -379.2518005371094, z: 39.163429260253906 } as alt.Vector3,
    { x: -2967.888427734375, y: 390.76654052734375, z: 14.043313026428223 } as alt.Vector3,
    { x: -3041.32763671875, y: 585.155029296875, z: 6.908928871154785 } as alt.Vector3,
    { x: -3243.743408203125, y: 1001.3903198242188, z: 11.830706596374512 } as alt.Vector3,
    { x: 548.0447387695312, y: 2669.48876953125, z: 41.156490325927734 } as alt.Vector3,
    { x: 1166.243896484375, y: 2709.356689453125, z: 37.15770721435547 } as alt.Vector3,
    { x: 1393.5035400390625, y: 3605.268798828125, z: 33.98093032836914 } as alt.Vector3,
    { x: 1960.2322998046875, y: 3742.317138671875, z: 31.343746185302734 } as alt.Vector3,
    { x: 1697.968505859375, y: 4924.54833984375, z: 41.06367492675781 } as alt.Vector3,
    { x: 1730.01171875, y: 6416.22021484375, z: 34.03722381591797 } as alt.Vector3,
    { x: 2555.4609375, y: 382.1643371582031, z: 107.62295532226562 } as alt.Vector3,
    { x: -1820.6717529296875, y: 792.8975219726562, z: 137.11163330078125 } as alt.Vector3,
];

// All 24/7 Shops are using the same items.
// Be careful to put in the correct database name here.
const shopItems = [
    { name: 'Burger', dbName: 'burger', price: 250, image: 'burger' },
    { name: 'Bread', dbName: 'bread', price: 350, image: 'bread' },
    { name: 'Burger', dbName: 'burger', price: 450, image: 'burger' },
    { name: 'Bread', dbName: 'bread', price: 550, image: 'bread' },
    { name: 'Burger', dbName: 'burger', price: 650, image: 'burger' },
    { name: 'Bread', dbName: 'bread', price: 750, image: 'bread' },
];

for (let i = 0; i < SHOPS.length; i++) {
    ServerBlipController.append({
        pos: SHOPS[i],
        shortRange: true,
        sprite: 220,
        color: 15,
        text: '24/7',
        scale: 1,
        uid: `Shop-${i}`
    });
    InteractionController.add({
        position: SHOPS[i],
        description: 'Open Shop',
        range: INTERACTION_RANGE,
        callback: (player: alt.Player) => {
            alt.emitClient(player, 'OSS:Client:OpenShop', shopItems);
            return;
        },
    });
}
