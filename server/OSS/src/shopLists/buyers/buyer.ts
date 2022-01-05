import * as alt from 'alt-server';
// Positions are based on the index of the array so, keep that in mind when creating a shop or just do it step by step.
export const BUYERS: alt.Vector3[] = [
    { x: 25.980966567993164, y: -1345.6417236328125, z: 28.497024536132812 } as alt.Vector3, // This position is using shopList (Array Index 0)
    { x: -48.5690803527832, y: -1757.6961669921875, z: 28.4210147857666 } as alt.Vector3, // This position is using foodList (Array Index 1)
];

// Every shop CAN hold individual items, or you can just go ahead fill one list for all 24/7 and just fill the POS-Array.
// Example if you fill Index Zero 0 - 9 just fill in "shopList" x9 Times into buyLists.
export const shopList = [
    { name: 'Bread', dbName: 'bread', price: 3450, image: 'crate' }
]; // Shop INDEX -> 0

export const foodList= [{ name: 'Burger', dbName: 'burger', price: 350, image: 'crate' }]; // Shop INDEX -> 1

export const buyLists = [shopList, foodList]; // ADD YOUR LISTS HERE!