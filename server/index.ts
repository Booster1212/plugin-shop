import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api';

import './src/items/main';
import './src/events';

import { shopConfig } from './src/config';
import * as Shop from './src/controller';
import Database from '@stuyk/ezmongodb';

Athena.systems.plugins.registerPlugin(shopConfig.name, async () => {
    if (shopConfig.useDatabase) {
        await Database.createCollection(shopConfig.collection);
    }
    await Shop.loadShops();

    alt.log(`~lg~${shopConfig.name} ${shopConfig.version} successfully loaded.`);
});
