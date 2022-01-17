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
- Imports (Client) ->
- import './athena-oss/view';
- import './athena-oss/src/client-events';

Imports (Server) ->
- import './OSS/index';

src-webviews/pages/components.ts ->
- import ShopUI from './shopUI/ShopUI.vue';
- ShopUI: shallowRef(ShopUI)
```
# Setup (Shops / TYPE )
```typescript
export const coreShopLocations: IShopLocation[] = [
    { x: 25.980966567993164, y: -1345.6417236328125, z: 28.497024536132812, isBlip: true } as IShopLocation, 
    { x: 374.3475341796875, y: 328.112060546875, z: 102.56637573242188, isBlip: true } as IShopLocation, 
    { x: -3041.32763671875, y: 585.155029296875, z: 6.908928871154785, isBlip: true } as IShopLocation, 
    { x: -3243.743408203125, y: 1001.3903198242188, z: 11.830706596374512, isBlip: true } as IShopLocation, 
    { x: 548.0447387695312, y: 2669.48876953125, z: 41.156490325927734, isBlip: true } as IShopLocation, 
    { x: 1960.2322998046875, y: 3742.317138671875, z: 31.343746185302734, isBlip: true } as IShopLocation, 
    { x: 1730.01171875, y: 6416.22021484375, z: 34.03722381591797, isBlip: true } as IShopLocation, 
    { x: 2555.4609375, y: 382.1643371582031, z: 107.62295532226562, isBlip: true } as IShopLocation, 
];

export const ShopRegistry: Array<IShop> = [
    // BUY SHOP
    {
        name: '24/7 Shop',
        dbName: '24-7-Shop',
        blipSprite: 59,
        blipColor: 2,
        blipScale: 1,
        data: {
            items: [
                { dbName: 'bread', price: 75 },
                { dbName: 'Shophotdog', price: 375 },
                { dbName: 'Shopwater', price: 250 },
                { dbName: 'Shopcola', price: 250 },
                { dbName: 'Shopenergy', price: 300 },
            ],
        },
        locations: coreShopLocations,
    },
    // SELL SHOP
    {
        name: 'Seller Example',
        dbName: 'SellerExample',
        shopType: shopType.SELL,
        blipSprite: 52,
        blipColor: 1,
        blipScale: 1,
        data: {
            items: [{ dbName: 'burger', price: 330 }],
        },
        locations: sellerExampleLocations,
    },
];
```

# Images
![unknown](https://user-images.githubusercontent.com/82890183/148910952-470985fe-5fed-41ed-8b87-08c9977f71c2.png)

![image](https://user-images.githubusercontent.com/82890183/148634183-00270cd2-ba69-4a46-94ba-58434967c890.png)

Join the plugin Discord -> https://discord.gg/Pk6gQ2agbQ
