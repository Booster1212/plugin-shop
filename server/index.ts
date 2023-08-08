import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api';

import './src/items/main';
import './src/events';

import { shopConfig } from './src/config';
import * as Shop from './src/controller';

Athena.systems.plugins.registerPlugin(shopConfig.name, () => {
    Shop.loadShops();

    alt.log(`~lg~${shopConfig.name} ${shopConfig.version} successfully loaded.`);
});
