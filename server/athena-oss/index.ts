import * as alt from 'alt-server';
import { PluginSystem } from '../../server/systems/plugins';
import Database from '@stuyk/ezmongodb';

import './src/oss-discord';
import './src/server-events';
import './src/shopLists/buyers/buyer';
import './src/shopLists/sellers/sellers';
import './src/shopLists/vendingmachines/vendingItems';
import './src/server-database';

export const OSS = {
    name: 'OSS',
    version: 'v1.0',
    collection: 'shops',
    interactionRange: 2,
    enableVendingmachines: false,
    randomizeBuyers: false, // Will randomize output of vending machines as well.
    randomizeSellers: false, // Randomize drug dealer prices for examples (based on list.)
};

export const OSS_TRANSLATIONS = {
    openShop: 'Open Shop',
    openSeller: 'Open Shop',
    openVendingMachine: 'Open Vending Machine',
}

PluginSystem.registerPlugin(OSS.name, async () => {
    alt.log(`~lg~${OSS.name} ${OSS.version} successfully loaded.`);
    await Database.createCollection(OSS.collection);
});
