import * as alt from 'alt-server';
import { PluginSystem } from '../../../server/systems/plugins';
import { ShopInitializer } from './src/shopInitializer';

import './src/items/main';
import './src/serverEvents';

export const OSS = {
    name: 'OSS',
    version: 'v1.2',
    interactionRange: 2,
    randomizeBuyers: false, // Will randomize output of vending machines as well.
    randomizeSellers: false, // Randomize drug dealer prices for examples (based on list.)
};

PluginSystem.registerPlugin(OSS.name, async () => {
    ShopInitializer.startupShop();
    alt.log(`~lg~${OSS.name} ${OSS.version} successfully loaded.`);
});
