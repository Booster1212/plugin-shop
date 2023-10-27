import * as Athena from '@AthenaServer/api/index.js';
import * as Shop from './src/controller.js';

import './src/items/main.js';
import './src/events.js';

Athena.systems.plugins.registerPlugin('SHOP', async () => {
    Shop.loadAllShops();
});
