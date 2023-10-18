import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api/index.js';
import * as Shop from './src/controller.js';
import { shopConfig } from './src/config/index.js';

import './src/items/main.js';
import './src/events.js';

Athena.systems.plugins.registerPlugin(shopConfig.name, async () => {
    await Shop.loadShops();

    alt.log(`~lg~${shopConfig.name} ${shopConfig.version} successfully loaded.`);
});
