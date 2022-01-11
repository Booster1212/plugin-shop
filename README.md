# OpenSourceShop![Fichier 37mdpi](https://user-images.githubusercontent.com/82890183/148142146-ba173e98-4c11-47d9-95da-6d83de2608af.png)

Welcome to Athena Open Source Shop! 
Bringing Shops to the Athena Framework as absolute free and open source solution licensed as MIT. 

So feel free to do whatever you want!

# Features
- VueJS (3)
- Based on Athena's ItemFactory - Full Database integration (MongoDB)
- Build on the latest version of the Athena Framework
- Build with ease of use in mind
- Different Shops for different Items 
- Each shop can hold individual items.
- Create selling or buying shops i.e. Drugseller or 24/7 Shop
- Synced Food / Water List (Custom Item List for OSS / Custom Events)
- 34 Default Shops
- Minimalistic Frontend

# Setup (Plugin)

- Drop ShopUI into a folder called "shopUI" inside of src-webviews/pages
- Drop server/client files into athena-oss -> src/core/client-plugins, client stuff here -> src/core/server-plugins -> server stuff here.

```typescript
Imports (Client) ->
import './OSS/view';
import './OSS/src/client-events';

Imports (Server) ->
import './OSS/index';

// src-webviews/pages/components.ts ->
import ShopUI from './shopUI/ShopUI.vue';
ShopUI: shallowRef(ShopUI)
```
# Setup (Buying Shop - 24/7)
```typescript
export const BUYERS: alt.Vector3[] = [
    { x: 25.980966567993164, y: -1345.6417236328125, z: 28.497024536132812 } as alt.Vector3, // Index 0
];

// Used to give all the shops are different blip, just copy the line as often as you need it.
export const buyerBlips = [
    { sprite: 59, color: 2, text: '24/7 Shop', scale: 1 }, // Index 0
];

// In OSS each Shop can hold individual items or you can add the same list to a few more stores over and over again.
// Default List for all 24/7 & LTD Stores.
const shopList = [
    { name: 'Bread', dbName: 'bread', price: 75, image: 'crate' },
    { name: 'Hotdog', dbName: 'Shophotdog', price: 375, image: 'crate' },
    { name: 'Waterbottle', dbName: 'Shopwater', price: 250, image: 'crate' },
    { name: 'Cola', dbName: 'Shopcola', price: 250, image: 'crate'},
    { name: 'Energy Drink', dbName: 'Shopenergy', price: 300, image: 'crate'}
];

export const buyLists = [
    shopList,
]; // ADD YOUR LISTS HERE!
```

# Setup (Drugsellers)
```typescript
import * as alt from 'alt-server';

// Shops are based on the index of arrays so -> First index -> First sellList
export const SELLERS: alt.Vector3[] = [
    { x: 1163.400634765625, y: -323.938232421875, z: 68.20509338378906 } as alt.Vector3 // SELLER (SHOP-POS) INDEX -> 0
    // { Add stuff yourself } Just another seller, INDEX 1 -> The secoond list will get into this position.
];

// Used to give all the shops are different blip, just copy the line as often as you need it.
export const sellersBlips = [
    { sprite: 52, color: 1, text: 'Seller Example - Index 0', scale: 1 }, // Index 0
];

const burgerBuyer = [
    { name: 'Burger', dbName: 'burger', price: 330, image: 'crate' }, // SellList INDEX -> 0
    // { Add stuff yourself. } Second Items for SELLERS Index -> 0
];
const anotherExampleList = [
    // { Fill me! } -> Index 1
];

export const sellLists = [burgerBuyer, /*anotherExampleList*/]; // Dont forget to add custom item lists here

```

# Images
![unknown](https://user-images.githubusercontent.com/82890183/148910952-470985fe-5fed-41ed-8b87-08c9977f71c2.png)

![image](https://user-images.githubusercontent.com/82890183/148634183-00270cd2-ba69-4a46-94ba-58434967c890.png)

Join the plugin Discord -> https://discord.gg/Pk6gQ2agbQ
