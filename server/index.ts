import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api';
import * as Shop from './src/controller';
import { shopConfig } from './src/config';

import './src/items/main';
import './src/events';

Athena.systems.plugins.registerPlugin(shopConfig.name, async () => {
    await Shop.loadShops();

    alt.log(`~lg~${shopConfig.name} ${shopConfig.version} successfully loaded.`);
});
