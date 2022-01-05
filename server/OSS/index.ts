import Database from '@stuyk/ezmongodb';
import * as alt from 'alt-server';
import { ServerBlipController } from '../../server/systems/blip';
import ChatController from '../../server/systems/chat';
import { InteractionController } from '../../server/systems/interaction';
import { PluginSystem } from '../../server/systems/plugins';
import { SYSTEM_EVENTS } from '../../shared/enums/system';
import { PERMISSIONS } from '../../shared/flags/permissionFlags';
import vendingMachines from '../../shared/information/vendingMachines';
import { BUYERS, buyLists } from './src/shopLists/buyers/buyer';
import { SELLERS, sellLists } from './src/shopLists/sellers/sellers';
import { vendingItems, vendingList } from './src/shopLists/vendingmachines/vendingItems';
import IShop from './src/interfaces/IShop';
import './src/server-events';
import './src/shopLists/buyers/buyer';
import './src/shopLists/sellers/sellers';
import './src/shopLists/vendingmachines/vendingItems';

export const OSS = {
    name: 'OSS',
    version: 'v1.0',
    collection: 'shops',
    enableVendingmachines: false,
    randomizeBuyers: false, // Will randomize output of vending machines as well.
    randomizeSellers: false, // Randomize drug dealer prices for examples (based on list.)
    useItemFactory: true // Disable if you want to use items which are not stored into the database "items"-collection.
};
const INTERACTION_RANGE = 2;

const PAGENAME = 'ShopUI';

PluginSystem.registerPlugin(OSS.name, async () => {
    alt.log(`~lg~${OSS.name} ${OSS.version} successfully loaded.`);
    await Database.createCollection(OSS.collection);
});

alt.on(SYSTEM_EVENTS.BOOTUP_ENABLE_ENTRY, async () => {
    if (OSS.randomizeBuyers) {
        const allShops = await Database.fetchAllData<IShop>(OSS.collection);
        if (allShops) {
            allShops.forEach(async (shop, index) => {
                shop.data.items.forEach((item, main, itemArray) => {
                    if (shop.shopType === 'buy') {
                        buyLists.forEach((list, x) => {
                            list.forEach((entry, index, listArray) => {
                                if (itemArray[main]['name'] === listArray[index]['name']) {
                                    itemArray[main]['price'] = getRandomInt(1, listArray[index].price);
                                }
                            });
                        });
                    }
                });
            });
        }
    } else if (!OSS.randomizeBuyers) {
        for (let i = 0; i < BUYERS.length; i++) {
            const dataExists = await Database.fetchData<IShop>('position', BUYERS[i] as alt.Vector3, OSS.collection);
            if(dataExists) {
                const updateDocument: IShop = {
                    data: {
                        items: buyLists[i]
                    },
                    position: dataExists.position
                }
                await Database.updatePartialData(dataExists._id, updateDocument, OSS.collection);
            } else break;
        }
    }

    if (OSS.randomizeSellers) {
        const allShops = await Database.fetchAllData<IShop>(OSS.collection);
        if (allShops) {
            allShops.forEach(async (shop, index) => {
                shop.data.items.forEach((item, main, itemArray) => {
                    if (shop.shopType === 'sell') {
                        sellLists.forEach((list, x) => {
                            list.forEach((entry, index, listArray) => {
                                if (itemArray[main]['name'] === listArray[index]['name']) {
                                    itemArray[main]['price'] = getRandomInt(1, listArray[index].price);
                                }
                            });
                        });
                    }
                });
            });
        }
    } else if (!OSS.randomizeSellers) {
        for (let i = 0; i < SELLERS.length; i++) {
            const dataExists = await Database.fetchData<IShop>('position', SELLERS[i] as alt.Vector3, OSS.collection);
            if(dataExists) {
                const updateDocument: IShop = {
                    data: {
                        items: sellLists[i]
                    },
                    position: dataExists.position
                }
                await Database.updatePartialData(dataExists._id, updateDocument, OSS.collection);
            } else break;
        }
    }

    if (OSS.enableVendingmachines) {
        for (let x = 0; x < vendingMachines.length; x++) {
            for (let vendIndex = 0; vendIndex < vendingItems.length; vendIndex++) {
                const newMachine: IShop = {
                    sellerIndex: vendIndex,
                    shopType: 'buy',
                    data: {
                        items: vendingList[vendIndex],
                    },
                    position: {
                        x: vendingMachines[x].x,
                        y: vendingMachines[x].y,
                        z: vendingMachines[x].z,
                    } as alt.Vector3,
                };
                const dataExists = await Database.fetchData<IShop>(
                    'position',
                    {
                        x: vendingMachines[x].x,
                        y: vendingMachines[x].y,
                        z: vendingMachines[x].z,
                    } as alt.Vector3,
                    OSS.collection,
                );
                if (!dataExists) await Database.insertData(newMachine, OSS.collection, false);
            }
        }
    }

    for (let sellIndex = 0; sellIndex < sellLists.length; sellIndex++) {
        const newSeller: IShop = {
            sellerIndex: sellIndex,
            shopType: 'sell',
            data: {
                items: sellLists[sellIndex],
            },
            position: SELLERS[sellIndex] as alt.Vector3,
        };
        const dataExists = await Database.fetchData<IShop>(
            'position',
            SELLERS[sellIndex] as alt.Vector3,
            OSS.collection,
        );
        if (!dataExists) await Database.insertData(newSeller, OSS.collection, false);
    }

    for (let listIndex = 0; listIndex < buyLists.length; listIndex++) {
        const newBuyer: IShop = {
            buyerIndex: listIndex,
            shopType: 'buy',
            data: {
                items: buyLists[listIndex],
            },
            position: BUYERS[listIndex] as alt.Vector3,
        };
        const dataExists = await Database.fetchData<IShop>(
            'position',
            BUYERS[listIndex] as alt.Vector3,
            OSS.collection,
        );
        if (!dataExists) await Database.insertData(newBuyer, OSS.collection, false);
    }
});

for (let i = 0; i < BUYERS.length; i++) {
    ServerBlipController.append({
        pos: BUYERS[i],
        shortRange: true,
        sprite: 52,
        color: 2,
        text: 'Buyer Examples.',
        scale: 1,
        uid: `Shop-${i}`,
    });

    InteractionController.add({
        position: BUYERS[i],
        description: 'Open Shop',
        range: INTERACTION_RANGE,
        callback: async (player: alt.Player) => {
            const allShops = await Database.fetchAllData<IShop>(OSS.collection);
            allShops.forEach((shop, index) => {
                if (player.pos.isInRange(shop.position as alt.Vector3, INTERACTION_RANGE)) {
                    alt.emitClient(player, `${PAGENAME}:Client:OpenShop`, shop.data.items, shop.shopType);
                }
            });
            return;
        },
    });
}

for (let i = 0; i < SELLERS.length; i++) {
    ServerBlipController.append({
        pos: SELLERS[i],
        shortRange: true,
        sprite: 52,
        color: 14,
        text: 'Seller Examples.',
        scale: 1,
        uid: `Verkauf-${i}`,
    });
    InteractionController.add({
        position: SELLERS[i],
        description: 'Open Shop',
        range: INTERACTION_RANGE,
        callback: async (player: alt.Player) => {
            const allShops = await Database.fetchAllData<IShop>(OSS.collection);
            allShops.forEach((shop, index) => {
                if (player.pos.isInRange(shop.position as alt.Vector3, INTERACTION_RANGE)) {
                    alt.emitClient(player, `${PAGENAME}:Client:OpenShop`, shop.data.items, shop.shopType);
                }
            });
            return;
        },
    });
}

for (let vendingIndex = 0; vendingIndex < vendingMachines.length; vendingIndex++) {
    InteractionController.add({
        position: vendingMachines[vendingIndex],
        description: 'Open Vending Machine',
        callback: async (player: alt.Player) => {
            const allShops = await Database.fetchAllData<IShop>(OSS.collection);
            allShops.forEach((shop, index) => {
                if (player.pos.isInRange(shop.position as alt.Vector3, INTERACTION_RANGE)) {
                    alt.emitClient(player, `${PAGENAME}:Client:OpenShop`, shop.data.items, shop.shopType);
                }
            });
        },
    });
}

// Thanks to developer docs of mozilla kekw.
function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
