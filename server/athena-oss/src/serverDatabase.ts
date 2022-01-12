import * as alt from 'alt-server';
import vendingMachines from '../../../shared/information/vendingMachines';
import Database from '@stuyk/ezmongodb';
import IShop from './interfaces/IShop';

import { SELLERS, sellersBlips, sellLists } from './shopLists/sellingShops/sellers';
import { buyerBlips, BUYERS, buyLists } from './shopLists/buyingShops/buyers';
import { OSS, OSS_TRANSLATIONS } from '../index';
import { InteractionController } from '../../../server/systems/interaction';
import { ServerBlipController } from '../../../server/systems/blip';
import { SYSTEM_EVENTS } from '../../../shared/enums/system';
import { vendingList } from './shopLists/vendingMachines/vendingMachines';
import {ItemFactory} from "../../../server/systems/item";

const PAGENAME = 'ShopUI';

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
            if (dataExists) {
                const updateDocument: IShop = {
                    data: {
                        items: buyLists[i],
                    },
                    position: dataExists.position,
                };
                await Database.updatePartialData(dataExists._id, updateDocument, OSS.collection);
            }
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
            if (dataExists) {
                const updateDocument: IShop = {
                    data: {
                        items: sellLists[i],
                    },
                    position: dataExists.position,
                };
                await Database.updatePartialData(dataExists._id, updateDocument, OSS.collection);
            } else break;
        }
    }

    if (OSS.enableVendingmachines) {
        for (let x = 0; x < vendingMachines.length; x++) {
            for (let vendIndex = 0; vendIndex < vendingList.length; vendIndex++) {
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
    for (let i = 0; i < BUYERS.length; i++) {
        ServerBlipController.append({
            pos: BUYERS[i],
            shortRange: true,
            sprite: buyerBlips[i].sprite,
            color: buyerBlips[i].color,
            text: buyerBlips[i].text,
            scale: buyerBlips[i].scale,
            uid: `Shop-${i}`,
        });

        InteractionController.add({
            position: BUYERS[i],
            description: OSS_TRANSLATIONS.openShop,
            range: OSS.interactionRange,
            uid: `IC-${BUYERS[i]}`,
            debug: false,
            callback: initShopCallback,
        });
    }

    for (let i = 0; i < SELLERS.length; i++) {
        ServerBlipController.append({
            pos: SELLERS[i],
            shortRange: true,
            sprite: sellersBlips[i].sprite,
            color: sellersBlips[i].color,
            text: sellersBlips[i].text,
            scale: sellersBlips[i].scale,
            uid: `Selling-${i}`,
        });

        InteractionController.add({
            position: SELLERS[i],
            description: OSS_TRANSLATIONS.openSellingShop,
            range: OSS.interactionRange,
            uid: `IC-${SELLERS[i]}`,
            debug: false,
            callback: initShopCallback
        });
    }

    for (let vendingIndex = 0; vendingIndex < vendingMachines.length; vendingIndex++) {
        InteractionController.add({
            position: vendingMachines[vendingIndex],
            description: OSS_TRANSLATIONS.openVendingMachine,
            debug: false,
            callback: initShopCallback,
        });
    }
});

// Thanks to developer docs of mozilla.
function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

async function initShopCallback(player: alt.Player) {
    const allShops = await Database.fetchAllData<IShop>(OSS.collection);
    for (const shop of allShops) {
        alt.log(`searching shop`);
        if (player.pos.isInRange(shop.position as alt.Vector3, OSS.interactionRange)) {
            alt.log(`got shop`);
            let dataItems = [];
            for (const item of shop.data.items) {
                alt.log(`Item ${item.dbName}`);
                let factoryItem = await ItemFactory.get(item.dbName);
                if (!factoryItem) {
                    alt.log(`~lr~${OSS.name} ${OSS.version}: Item ${item.dbName} is not in your ItemFactory!`);
                } else {
                    let itemIcon;
                    let itemName;
                    let itemDbName = item.dbName;
                    let itemPrice = item.price;
                    if (!item.icon || !item.name) {
                        itemIcon = item.icon ? item.icon : factoryItem.icon;
                        itemName = item.name ? item.name : factoryItem.name;
                    } else {
                        itemIcon = item.icon;
                        itemName = item.name;
                    }
                    alt.log(`Item ${itemName} ${itemIcon} ${itemDbName} ${itemPrice} ${factoryItem.icon} ${factoryItem.name}`);
                    // { name: 'Bread', dbName: 'bread', price: 75, image: 'crate' },
                    dataItems.push({name: itemName, dbName: itemDbName, price: itemPrice, image: itemIcon})
                }
            }
            alt.emitClient(player, `${PAGENAME}:Client:OpenShop`, dataItems, shop.shopType);
            return;
        }
    }
    return;
}
