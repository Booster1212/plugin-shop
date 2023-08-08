import { IShopLocation } from '@AthenaPlugins/open-source-shop/shared/interfaces/IShopLocation';
import vendingMachines from '@AthenaShared/information/vendingMachines';

/* <-- AMMUNATION --> */
export const ammunationLocations: IShopLocation[] = [
    { x: 21.903297424316406, y: -1108.140625, z: 29.785400390625, isBlip: true },
    { x: -330.4879150390625, y: 6083.93408203125, z: 31.4534912109375, isBlip: true },
    { x: 1693.3714599609375, y: 3760.12744140625, z: 34.6885986328125, isBlip: true },
    { x: -1117.4769287109375, y: 2698.839599609375, z: 18.5465087890625, isBlip: true },
    { x: 2567.301025390625, y: 294.1450500488281, z: 108.7266845703125, isBlip: true },
    { x: 251.92088317871094, y: -50.36043930053711, z: 69.9384765625, isBlip: true },
    { x: -1305.982421875, y: -394.4703369140625, z: 36.6937255859375, isBlip: true },
    { x: -661.9384765625, y: -935.2879028320312, z: 21.8154296875, isBlip: true },
    { x: 842.1626586914062, y: -1033.81982421875, z: 28.1845703125, isBlip: true },
    { x: 810.0263671875, y: -2157.177978515625, z: 29.6168212890625, isBlip: true },
];

/* <-- BAHAMA MAMAS --> */
export const bahamaMamasLocations: IShopLocation[] = [
    { x: -1394.1494140625, y: -603.96923828125, z: 30.3077392578125, isBlip: true },
    { x: -1377.6131591796875, y: -627.3362426757812, z: 30.813232421875, isBlip: true },
];

/* <-- CORE SHOPS (24/7) --> */
export const coreShopLocations: IShopLocation[] = [
    { x: 25.980966567993164, y: -1345.6417236328125, z: 28.497024536132812, isBlip: true, shopAcceptsCard: true },
    { x: 374.3475341796875, y: 328.112060546875, z: 102.56637573242188, isBlip: true, shopAcceptsCard: true },
    { x: -3041.32763671875, y: 585.155029296875, z: 6.908928871154785, isBlip: true, shopAcceptsCard: true },
    { x: -3243.743408203125, y: 1001.3903198242188, z: 11.830706596374512, isBlip: true, shopAcceptsCard: true },
    { x: 548.0447387695312, y: 2669.48876953125, z: 41.156490325927734, isBlip: true, shopAcceptsCard: true },
    { x: 1960.2322998046875, y: 3742.317138671875, z: 31.343746185302734, isBlip: true, shopAcceptsCard: true },
    { x: 1730.01171875, y: 6416.22021484375, z: 34.03722381591797, isBlip: true, shopAcceptsCard: true },
    { x: 2555.4609375, y: 382.1643371582031, z: 107.62295532226562, isBlip: true, shopAcceptsCard: true },
];

/* <-- JUICE --> */
export const juiceLocations: IShopLocation[] = [
    { x: 1166.243896484375, y: 2709.356689453125, z: 37.15770721435547, isBlip: true },
];

/* <-- LIQUOR ACE --> */
export const liquorAceLocations: IShopLocation[] = [
    { x: 1393.5035400390625, y: 3605.268798828125, z: 33.98093032836914, isBlip: true },
];

/* <-- LTD --> */
export const ltdLocations: IShopLocation[] = [
    { x: -48.5690803527832, y: -1757.6961669921875, z: 28.4210147857666, isBlip: true, shopAcceptsCard: true },
    { x: 1163.400634765625, y: -323.938232421875, z: 68.20509338378906, isBlip: true, shopAcceptsCard: true },
    { x: -707.4390258789062, y: -914.5612182617188, z: 18.21558952331543, isBlip: true, shopAcceptsCard: true },
    { x: 1697.968505859375, y: 4924.54833984375, z: 41.06367492675781, isBlip: true, shopAcceptsCard: true },
    { x: -1820.6717529296875, y: 792.8975219726562, z: 137.11163330078125, isBlip: true, shopAcceptsCard: true },
];

/* <-- ROBS LIQUOR --> */
export const robsLiquorLocations: IShopLocation[] = [
    { x: 1135.9544677734375, y: -981.8599853515625, z: 45.41580581665039, isBlip: true },
    { x: -1222.91162109375, y: -907.1942749023438, z: 11.326356887817383, isBlip: true },
    { x: -1487.08349609375, y: -379.2518005371094, z: 39.163429260253906, isBlip: true },
    { x: -2967.888427734375, y: 390.76654052734375, z: 14.043313026428223, isBlip: true },
];

/* <-- CORE (SELLERS) --> */
export const sellerExampleLocations: IShopLocation[] = [
    { x: 1241.4119873046875, y: -367.92218017578125, z: 68.08222961425781, isBlip: true },
];

/* <-- TequiLala --> */
export const tequiLaLaLocations: IShopLocation[] = [
    { x: -560.1758422851562, y: 286.4307556152344, z: 82.17138671875, isBlip: true },
];

/* <-- TOOL SHOPS --> */
export const toolShopLocations: IShopLocation[] = [
    { x: 2748.77392578125, y: 3472.442626953125, z: 55.67741012573242 - 1, isBlip: true, shopAcceptsCard: true },
];

/* <-- Vanilla Unicorn --> */
export const vanillaUnicornLocations: IShopLocation[] = [
    { x: 127.16043853759766, y: -1283.4989013671875, z: 29.2630615234375, isBlip: true },
];

export const vendingMachinesShop: IShopLocation[] = [
    ...vendingMachines.map((machine) => ({ ...machine, isBlip: false })),
];
