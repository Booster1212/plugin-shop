# OpenSourceShop![Fichier 37mdpi](https://user-images.githubusercontent.com/82890183/148142146-ba173e98-4c11-47d9-95da-6d83de2608af.png)

Since Athena doesn't offer Shops in core at the moment i've decided to rebuild my old Vue3 Shop with new Athena Single Page Application (Vue3)
So here we go again. ;)

This plugin is based on Athena's ItemFactory so you'll need items in the database collection 'items' to make it work as expected.

# Features
- Different Item lists for different shops
- Ability to create buy / sell shops
- Randomize prices of items on Athena's Bootup entry (Optional)
- Fill up all vending machines with custom item lists.

# Setup (Plugin)

- Drop ShopUI into a folder called "shopUI" inside of src-webviews/pages
- Drop server/client files into OSS folders -> src/core/client-plugins, client stuff here -> src/core/plugins -> server stuff here.


```typescript
Imports (Client) ->
import './OSS/view';
import './OSS/src/client-events';

Imports (Server) ->
import './OSS/index';
```

# Setup (Shop - Buy)
```ts
import * as alt from 'alt-server';
// Positions are based on the index of the array so, keep that in mind when creating a shop or just do it step by step.
export const BUYERS: alt.Vector3[] = [
    { x: 25.980966567993164, y: -1345.6417236328125, z: 28.497024536132812 } as alt.Vector3, // This position is using shopList (Array Index 0)
    { x: -48.5690803527832, y: -1757.6961669921875, z: 28.4210147857666 } as alt.Vector3, // This position is using foodList (Array Index 1)
];

// Every shop CAN hold individual items, or you can just go ahead fill one list for all 24/7 and just fill the POS-Array.
// Example if you fill Index Zero 0 - 9 just fill in "shopList" x9 Times into buyLists.
const shopList = [
    { name: 'Bread', dbName: 'bread', price: 3450, image: 'crate' }
    /* { name: 'Northern Haze Seeds', dbName: 'Northern Haze Seeds', price: '75', image: 'crate' },
    { name: 'Lemon Haze Seeds', dbName: 'Lemon Haze Seeds', price: '85', image: 'crate' },
    { name: 'OG Kush Seeds', dbName: 'OG Kush Seeds', price: '115', image: 'crate' },
    { name: 'Mango Kush Seeds', dbName: 'Mango Kush Seeds', price: '125', image: 'crate' },
    { name: 'Purple Haze Seeds', dbName: 'Purple Haze Seeds', price: '105', image: 'crate' }, ..... */
]; // Shop INDEX -> 0

const foodList = [{ name: 'Burger', dbName: 'burger', price: 350, image: 'crate' }]; // Shop INDEX -> 1
// const anotherExampleList = [];
export const buyLists = [shopList, foodList, /*anotherExampleList*/]; // ADD YOUR LISTS HERE!
```

# Set (Shop - Sell)
```typescript
import * as alt from 'alt-server';

// Shops are based on the index of arrays so -> First index -> First sellList
export const SELLERS: alt.Vector3[] = [
    { x: 1163.400634765625, y: -323.938232421875, z: 68.20509338378906 } as alt.Vector3 // SELLER (SHOP-POS) INDEX -> 0
    // { Add stuff yourself } Just another seller, INDEX 1 -> The secoond list will get into this position.
];

const burgerBuyer = [
    { name: 'Burger', dbName: 'burger', price: 330, image: 'crate' }, // SellList INDEX -> 0
    // { Add stuff yourself. } Second Items for SELLERS Index -> 0
];
const anotherExampleList = [
    // { Fill me! } -> Index 0
];

export const sellLists = [burgerBuyer, /*anotherExampleList*/]; // Dont forget to add custom item lists here
```

# Settings
```typescript
export const OSS = {
    name: 'OSS',
    version: 'v1.0',
    collection: 'shops',
    enableVendingmachines: false,
    randomizeBuyers: false, // Will randomize output of vending machines as well.
    randomizeSellers: false, // Randomize drug dealer prices for examples (based on list.)
};
```

# Images

![image](https://user-images.githubusercontent.com/82890183/148335389-30f30d20-1228-45e0-b668-959eb37f7317.png)

Join the plugin Discord -> https://discord.gg/Pk6gQ2agbQ
