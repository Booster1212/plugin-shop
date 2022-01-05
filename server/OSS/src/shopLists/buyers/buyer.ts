import * as alt from 'alt-server';
// Positions are based on the index of the array so, keep that in mind when creating a shop or just do it step by step.
export const BUYERS: alt.Vector3[] = [
    { x: 25.980966567993164, y: -1345.6417236328125, z: 28.497024536132812 } as alt.Vector3, // Weed Dealer INDEX 0
    { x: -48.5690803527832, y: -1757.6961669921875, z: 28.4210147857666 } as alt.Vector3, // Food Dealer INDEX 1
    { x: 1135.9544677734375, y: -981.8599853515625, z: 45.41580581665039 } as alt.Vector3, // Drug Dealer INDEX 2
];
// All 24/7 Shops are using individual items. So try to understand my examples carefully!
// Also replace name / dbName / image you want to display on the item inside a shop.
// All example shops are buying shops - so you can't sell there!
export const weedDealer = [
    { name: 'Northern Haze Seeds', dbName: 'Northern Haze Seeds', price: 10100, image: 'crate' },
    { name: 'Lemon Haze Seeds', dbName: 'Northern Haze Seeds', price: 20200, image: 'crate' },
    { name: 'OG Kush Seeds', dbName: 'OG Kush Seeds', price: 30300, image: 'crate' },
]; // Shop INDEX -> 0
export const foodDealer = [{ name: 'Burger', dbName: 'burger', price: 40400, image: 'crate' }]; // Shop INDEX -> 1
export const drugDealer = [{ name: 'Bread', dbName: 'bread', price: 50500, image: 'crate' }]; // Shop INDEX -> 2, ... so on.
export const buyLists = [weedDealer, foodDealer, drugDealer]; // ADD YOUR LISTS HERE!