<template>
    <div class="container mx-auto p-4 flex justify-center items-center select-none h-screen w-screen">
        <div class="bg-gray-900 bg-opacity-95 p-6 rounded-lg shadow-md min-h-[900px] max-h-[900px] min-w-[1540px] flex select-none">
            <div class="w-[75%] overflow-y-scroll custom-scrollbar-hidden">
                <div class="grid grid-cols-4 items-center text-center justify-center">
                    <div
                        v-for="(item, index) in availableItems"
                        :key="index"
                        class="h-[425px] w-[250px] flex flex-col justify-between mb-6 bg-sky-800 bg-opacity-80 rounded"
                    >
                        <div
                            class="rounded-full w-32 h-32 bg-sky-600 bg-opacity-80 mx-auto mt-4 flex items-center justify-center overflow-hidden"
                        >
                            <img
                                :src="resolvePath(item.image)"
                                :alt="item.name"
                                class="max-w-[128px] max-h-[128px] object-cover bg-sky-900 bg-opacity-40 flex items-center justify-center"
                            />
                        </div>

                        <div class="text-xl font-semibold mt-4 text-white">{{ item.name }}</div>

                        <div class="text-lg font-bold text-sky-400">Price: ${{ item.price }}</div>
                        <div class="text-lg font-normal text-white mt-2">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut</div>
                        
                        <div class="flex justify-between mx-auto">
                            <div class="flex justify-center items-center mt-4">
                                <button class="px-3 py-2 h-6 rounded bg-gray-700 text-white flex items-center" @click="decreaseQuantity(item)">-</button>
                                <p class="mx-2 text-2xl text-white">{{ item.quantity }}</p>
                                <button class="px-3 py-2 h-6 rounded bg-gray-700 text-white flex items-center" @click="increaseQuantity(item)">+</button>
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
                        class="flex items-center justify-between bg-gray-800 p-4 mb-4 rounded shadow-md"
                    >
                        <div class="text-white text-lg font-bold">{{ item.name }} x{{ item.quantity }}</div>
                        <div class="text-gray-200 text-lg font-normal">{{ item.price }}$</div>
                        <button class="bg-red-500 text-white px-3 py-1 rounded text-lg">Remove</button>
                    </div>
                </div>

                <!-- Footer section for displaying the total price -->
                <div class="flex items-center mt-auto bg-sky-800 rounded">
                    <div class="flex items-center">
                        <p class="text-white text-lg font-bold ml-4">Total Price:&nbsp;</p>
                        <p class="text-gray-200 text-lg font-normal">{{ calculateTotalPrice() }}$</p>
                    </div>
                    <button
                        class="ml-auto bg-sky-700 hover:bg-sky-600 text-white text-lg font-bold py-2 px-4 rounded w-35 h-10 flex items-center justify-center transition duration-500"
                    @click="buyItems()"
                        >
                        Buy
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import WebViewEvents from '@utility/webViewEvents.js';
import { onMounted, ref } from 'vue';
import { ShopEvents } from '../shared/enums/ShopEvents.js';
import { ShopType } from '../shared/enums/ShopType.js';
import resolvePath from '@utility/pathResolver.js';

const availableItems = ref([
    {
        name: 'Assault Rifle',
        image: '@AthenaPlugins/icons/plugin-shop/beer.png',
        price: 799.00,
        quantity: 1,
    },
    {
        name: 'Beer',
        image: '@AthenaPlugins/icons/plugin-shop/beer.png',
        price: 1.75,
        quantity: 1,
    },
]);

const cartItems = ref([]);
const shopType = ref('');

const addToCart = (item: { name: string; quantity: number }) => {
    const existingItem = cartItems.value.find((cartItem) => cartItem.name === item.name);
    if (existingItem) {
        existingItem.quantity += item.quantity;
    } else {
        cartItems.value.push({ ...item });
    }
};

const removeFromCart = (item) => {
    const index = cartItems.value.findIndex((cartItem) => cartItem.id === item.id);
    if (index !== -1) {
        cartItems.value.splice(index, 1);
    }
};

const increaseQuantity = (item: { quantity: number }) => {
    item.quantity++;
};

const decreaseQuantity = (item: { quantity: number }) => {
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

const fillShopItems = (shopItems: any, type: string, shopName: string, acceptsCard: boolean) => {
    availableItems.value = shopItems;
    shopType.value = type;

    console.log(JSON.stringify(shopItems, undefined, 4));
};

const buyItems = () => {
    if (shopType.value === ShopType.BUY) {
        WebViewEvents.emitServer(ShopEvents.BUY_ITEMS_FROM_CART, cartItems.value);
    } else {
        WebViewEvents.emitServer(ShopEvents.SELL_ITEMS_FROM_CART, cartItems.value);
    }
};

const resetCart = () => {
    cartItems.value = [];
};

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
    width: 4px; /* Adjust this value to make the scrollbar thinner or thicker */
}

.custom-scrollbar-hidden::-webkit-scrollbar-thumb {
    background-color: #888; /* Color of the scrollbar thumb */
    border-radius: 4px; /* Round the scrollbar thumb */
}

.custom-scrollbar-hidden::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* Color of the scrollbar thumb on hover */
}
</style>
