import * as alt from 'alt-server';
import { PluginSystem } from '../../../server/systems/plugins';
import { ShopInitializer } from './src/serverInitializer';

import './src/items/shopItems';
import './src/serverEvents';

const PLUGIN_NAME = 'Open Source Shop';
const AUTHORS = ['Der Lord!', 'deeMace'];

PluginSystem.registerPlugin(PLUGIN_NAME, async () => {
    alt.log(`~lg~[PLUGIN] ==> ${PLUGIN_NAME} successfully loaded! Authors: (~w~${AUTHORS.join(', ')}~lg~)`);
    ShopInitializer.startupShop();
});
