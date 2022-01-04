import Database from '@stuyk/ezmongodb';
import * as alt from 'alt-server';
import { ServerBlipController } from '../../server/systems/blip';
import ChatController from '../../server/systems/chat';
import { InteractionController } from '../../server/systems/interaction';
import { PluginSystem } from '../../server/systems/plugins';
import { SYSTEM_EVENTS } from '../../shared/enums/system';
import { PERMISSIONS } from '../../shared/flags/permissionFlags';
import IShop from './src/interfaces/IShop';
import './src/server-events';

const OSS = {
    name: 'OSS',
    version: 'v1.0',
    collection: 'shops',
};
const PAGENAME = 'ShopUI';
PluginSystem.registerPlugin(OSS.name, async () => {
    alt.log(`~lg~${OSS.name} ${OSS.version} successfully loaded.`);
    await Database.createCollection(OSS.collection);
});

const INTERACTION_RANGE = 2;
// Positions are based on the index of the array so, keep that in mind when creating a shop or just do it step by step.
const BUYERS: alt.Vector3[] = [
    { x: 25.980966567993164, y: -1345.6417236328125, z: 28.497024536132812 } as alt.Vector3, // Weed Dealer
    { x: -48.5690803527832, y: -1757.6961669921875, z: 28.4210147857666 } as alt.Vector3, // Food Dealer
    { x: 1135.9544677734375, y: -981.8599853515625, z: 45.41580581665039 } as alt.Vector3, // Drug Dealer
];

const SELLERS: alt.Vector3[] = [
    { x: 1163.400634765625, y: -323.938232421875, z: 68.20509338378906 } as alt.Vector3
];
// All 24/7 Shops are using individual items. So try to understand my examples carefully!
// All example shops are buying shops - so you can't sell there!
const weedDealer = [
    { name: 'Northern Haze Seeds', dbName: 'Northern Haze Seeds', price: 20, image: 'crate' },
    { name: 'Lemon Haze Seeds', dbName: 'Northern Haze Seeds', price: 20, image: 'crate' },
    { name: 'OG Kush Seeds', dbName: 'OG Kush Seeds', price: 20, image: 'crate' },
]; // Shop INDEX -> 0
const foodDealer = [{ name: 'Burger', dbName: 'burger', price: 20, image: 'crate' }]; // Shop INDEX -> 1
const drugDealer = [{ name: 'Bread', dbName: 'bread', price: 20, image: 'crate' }]; // Shop INDEX -> 2, ... so on.
const buyLists = [weedDealer, foodDealer, drugDealer]; // ADD YOUR LISTS HERE!

const budsBuyer = [
    { name: 'OG Kush Buds', dbName: 'OG Kush Buds', price: 30, image: 'crate' }, // Pay per quantity.
];
const sellLists = [budsBuyer];

// DEBUGGING Purpose, or maybe it could be used to change prices ingame? ;)
ChatController.addCommand('Testshop', '/Testshop', PERMISSIONS.ADMIN, testFunction)
async function testFunction(shopIndex: number, itemIndex: number, newPrice: number) {
    const fetched = await Database.fetchData<IShop>('buyerIndex', shopIndex, OSS.collection);
    // await Database.updatePartialData(fetched._id, fetched.data.items.entries().next, newPrice);
}

alt.on(SYSTEM_EVENTS.BOOTUP_ENABLE_ENTRY, async () => {
    for(let sellIndex = 0; sellIndex < sellLists.length; sellIndex ++) {
        const newSeller: IShop = {
            sellerIndex: sellIndex,
            shopType: 'sell',
            data: {
                items: sellLists[sellIndex],
            },
            position: SELLERS[sellIndex] as alt.Vector3,
        };
        const dataExists = await Database.fetchData<IShop>('position', SELLERS[sellIndex] as alt.Vector3, OSS.collection);
        if(!dataExists) await Database.insertData(newSeller, OSS.collection, false);
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
        const dataExists = await Database.fetchData<IShop>('position', BUYERS[listIndex] as alt.Vector3, OSS.collection);
        if(!dataExists) await Database.insertData(newBuyer, OSS.collection, false);
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

for(let i = 0; i < SELLERS.length;i++) {
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
/* 
const shopItems = [
    { name: 'Burger', dbName: 'burger', price: 250, image: 'burger' },
    { name: 'Bread', dbName: 'bread', price: 350, image: 'bread' },
]; */
