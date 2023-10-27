import * as Interface from '@AthenaPlugins/plugin-shop/shared/interface/Shop.js';

// Items that appear in 24-7 Stores.
export const coreItems: Array<Interface.ShopItem> = [
    {
        name: 'Waterbottle',
        image: '@AthenaPlugins/icons/plugin-shop/waterbottle.png',
        price: 0.79,
        quantity: 1,
        description: 'Cylindrical vessel for liquid hydration, commonly made of plastic or metal.',
    },
    {
        name: 'Beer',
        image: '@AthenaPlugins/icons/plugin-shop/beer.png',
        price: 1.39,
        quantity: 1,
        description: 'Fermented alcoholic beverage made from malted barley, hops, water, and yeast.',
    },
    {
        name: 'Cola',
        image: '@AthenaPlugins/icons/plugin-shop/cola.png',
        price: 0.85,
        quantity: 1,
        description: 'Carbonated soft drink with cola flavor, sweetened, often containing caffeine.',
    },
];
