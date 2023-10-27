<template>
    <div class="container mx-auto p-4 flex justify-center items-center select-none h-screen w-screen">
        <div
            class="bg-gray-900 bg-opacity-95 p-6 rounded-lg shadow-md min-h-[900px] max-h-[900px] min-w-[1540px] flex select-none"
        >
            <div class="w-[75%] overflow-y-scroll custom-scrollbar-hidden">
                <div class="grid grid-cols-4 items-center text-center justify-center">
                    <div
                        v-for="(item, index) in availableItems"
                        :key="index"
                        class="h-[400px] w-[250px] flex flex-col justify-between mb-6 bg-sky-800 bg-opacity-80 rounded border-b-2 border-t-2 border-sky-400"
                    >
                        <div
                            class="bg-sky-700 bg-opacity-80 mx-auto mt-0 flex items-center justify-center overflow-hidden w-full h-30"
                        >
                            <img
                                :src="resolvePath(item.image)"
                                :alt="item.name"
                                class="p-20 object-cover flex items-center justify-center"
                            />
                        </div>

                        <div class="text-xl font-semibold mt-4 text-white">{{ item.name }}</div>

                        <div class="text-lg font-bold text-sky-400">Price: ${{ item.price }}</div>
                        <div class="text-lg font-normal text-white p-4">
                            {{ item.description }}
                        </div>

                        <div class="flex justify-between mx-auto">
                            <div class="flex justify-center items-center mt-2">
                                <button
                                    class="px-3 py-2 h-6 rounded bg-gray-700 text-white flex items-center hover:bg-gray-600 transition duration-50"
                                    @click="decreaseQuantity(item)"
                                >
                                    <span>-</span>
                                </button>
                                <p class="mx-2 text-2xl text-white">{{ item.quantity }}</p>
                                <button
                                    class="px-3 py-2 h-6 rounded bg-gray-700 text-white flex items-center justify-center hover:bg-gray-600 transition duration-500"
                                    @click="increaseQuantity(item)"
                                >
                                    <span>+</span>
                                </button>
                            </div>
                        </div>

                        <button
                            class="mx-auto mb-4 bg-sky-700 hover:bg-sky-800 text-white text-lg font-bold py-2 px-4 rounded w-40 h-10 flex items-center justify-center transition duration-500 mt-4"
                            @click="addToCart(item)"
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
            <div class="h-[850px] w-[25%] bg-sky-900 opacity-90 p-4 rounded shadow-md flex flex-col">
                <div class="overflow-y-auto">
                    <div
                        v-for="(item, index) in cartItems"
                        :key="index"
                        class="flex items-center justify-between bg-gray-800 p-4 mb-4 rounded shadow-md cart-item"
                    >
                        <div class="text-white text-lg font-bold">{{ item.name }} x{{ item.quantity }}</div>
                        <div class="text-gray-200 text-lg font-normal">{{ item.price }}$</div>
                        <button class="bg-red-500 text-white px-3 py-1 rounded text-lg">Remove</button>
                    </div>
                </div>

                <div class="flex items-center mt-auto bg-sky-700 rounded">
                    <div class="flex items-center">
                        <p class="text-white text-lg font-bold ml-4">Total Price:&nbsp;</p>
                        <p class="text-gray-200 text-lg font-normal">{{ calculateTotalPrice().toFixed(2) }}$</p>
                    </div>
                    <button
                        class="ml-auto bg-sky-600 hover:bg-sky-500 text-white text-lg font-bold py-2 px-4 rounded w-35 h-10 flex items-center justify-center transition duration-500"
                        @click="buyItems()"
                    >
                        Cash
                    </button>
                    <button
                        class="ml-2 bg-sky-600 hover:bg-sky-500 text-white text-lg font-bold py-2 px-4 rounded w-35 h-10 flex items-center justify-center transition duration-500"
                        v-if="cardAccepted"
                    >
                        EC Card
                    </button>
                </div>
                <div class="flex items-center mt-2 bg-sky-700 rounded h-10">
                    <div class="flex items-center">
                        <p class="text-white text-lg font-bold ml-4">Total Amount Items:&nbsp;</p>
                        <p class="text-gray-200 text-lg font-normal">{{ calculateTotalQuantity() }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import * as Interface from '@AthenaPlugins/plugin-shop/shared/interface/Shop.js';

import WebViewEvents from '@utility/webViewEvents.js';
import resolvePath from '@utility/pathResolver.js';

import { onMounted, ref } from 'vue';
import { ShopEvents } from '../shared/enums/ShopEvents.js';

const availableItems = ref<Array<Interface.ShopItem>>(
    [
        // {
        //     name: 'Beer',
        //     image: 'beer',
        //     price: 1.79,
        //     quantity: 1,
        //     description: 'Fermented alcoholic beverage made from malted barley, hops, water, and yeast.'
        // }, 
        // {
        //     name: 'Coca Cola',
        //     image: 'cola',
        //     price: 0.95,
        //     quantity: 1,
        //     description: 'Carbonated soft drink with cola flavor, sweetened, often containing caffeine.'
        // }
    ]
);

const cartItems = ref([]);
const shopType = ref('');
const cardAccepted = ref(false);


const addToCart = (item: Partial<Interface.ShopItem>) => {
    const existingItem = cartItems.value.find((cartItem) => cartItem.name === item.name);
    if (existingItem) {
        existingItem.quantity += item.quantity;
    } else {
        cartItems.value.push({ ...item });
    }
};

const removeFromCart = (item: Partial<Interface.ShopItem>) => {
    const itemToRemove = cartItems.value.find((cartItem) => cartItem.name === item.name);
    if (itemToRemove !== -1) {
        cartItems.value.splice(itemToRemove, 1);
    }
};

const increaseQuantity = (item: Interface.ShopItem) => {
    item.quantity++;
};

const decreaseQuantity = (item: Interface.ShopItem) => {
    if (item.quantity > 1) {
        item.quantity--;
    } else {
        removeFromCart(item);
    }
};

const calculateTotalPrice = () => {
    return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
};

const calculateTotalQuantity = () => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0);
};

const fillShopItems = (shop: Interface.Shop, location: Interface.ShopLocation) => {
    availableItems.value = shop.data.items;
    shopType.value = shop.type;
    cardAccepted.value = location.shopAcceptsCard;

    console.log(`Shop accepts Card: ${location.shopAcceptsCard} | EC: ${cardAccepted.value}`);
};

function buyItems() {
    if(shopType.value === 'Buy') {
        WebViewEvents.emitServer(ShopEvents.BUY_ITEMS_FROM_CART, cartItems.value);
    }
}
function resetCart() {
    cartItems.value = [];
}
onMounted(() => {
    if ('alt' in window) {
        WebViewEvents.emitServer(ShopEvents.REQUEST_SHOP_ITEMS);
        
        WebViewEvents.on(ShopEvents.SET_ITEMS, fillShopItems);
        WebViewEvents.on(ShopEvents.RESET_CART, resetCart);
    }
});
</script>
<style scoped>
.custom-scrollbar-hidden::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar-hidden::-webkit-scrollbar-thumb {
    background-color: #125994;
    border-radius: 4px;
}

.custom-scrollbar-hidden::-webkit-scrollbar-thumb:hover {
    background-color: #115288;
}
.notification-text {
    width: 100%;
    text-align: center;
}
.progress-bar {
    height: 100%;
    width: 0%;
    background-color: green;
    transition: width 10s linear;
}

button:focus {
  outline: none;
}
</style>
