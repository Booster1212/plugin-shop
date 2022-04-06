import * as alt from 'alt-server';
import { PluginSystem } from '../../server/systems/plugins';

import './src/ossDiscord';
import './src/items/shopItems';
import './src/items/itemEvents';
import './src/serverEvents';
import './src/serverDatabase';
import Database from '@stuyk/ezmongodb';

export const OSS = {
    name: 'OSS',
    version: 'v1.0',
    collection: 'shops',
    interactionRange: 2,
    //enableVendingmachines: false, // OUTDATED <<->> Update: Remove Vendors from shopRegistry if not needed
    randomizeBuyers: false, // Will randomize output of vending machines as well.
    randomizeSellers: false, // Randomize drug dealer prices for examples (based on list.)
};

export enum OSS_TRANSLATIONS {
    openShop = 'Open Shop',
    openSellingShop = 'Open Shop',
    //openVendingMachine = 'Open Vending Machine', //TODO: VendingMachine as its own shopType?
    notEnoughCash = 'Not enough cash!',
}

PluginSystem.registerPlugin(OSS.name, async () => {
    alt.log(`~lg~${OSS.name} ${OSS.version} successfully loaded.`);
    await Database.createCollection(OSS.collection);
});
