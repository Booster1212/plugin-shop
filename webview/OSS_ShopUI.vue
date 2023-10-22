<template>
    <div class="container mx-auto p-4 flex justify-center items-center mt-4">
        <div class="bg-sky-900 p-6 rounded-lg shadow-md min-h-[900px] max-h-[900px] min-w-[1240px] flex">
            <div class="w-[75%] overflow-y-scroll custom-scrollbar-hidden">
                <div class="grid grid-cols-4 items-center text-center justify-center">
                    <div
                        v-for="(item, index) in availableItems"
                        :key="index"
                        class="h-[300px] w-[200px] flex flex-col justify-between mb-6 bg-sky-800 bg-opacity-80 rounded"
                    >
                        <div
                            class="rounded-full w-32 h-32 bg-sky-400 bg-opacity-40 mx-auto mt-4 flex items-center justify-center overflow-hidden"
                        >
                            <img
                                :src="resolvePath(item.image)"
                                :alt="item.name"
                                class="max-w-full max-h-full object-contain bg-gray-400 bg-opacity-70"
                            />
                        </div>

                        <div class="text-xl font-semibold mt-4">{{ item.name }}</div>

                        <div class="text-lg font-bold text-gray-700">Price: ${{ item.price }}</div>
                        <button class="mx-auto mb-4 bg-gray-700 hover:bg-gray-600 text-white text-lg font-bold py-2 px-4 rounded w-40 h-10 flex items-center justify-center">
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
            <div class="w-[25%] bg-gray-600">

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
import Icon from '@components/Icon.vue';

const availableItems = ref([
    {
        name: 'Assault Rifle',
        image: '@AthenaPlugins/icons/plugin-shop/beer.png',
        price: 250,
        quantity: 1,
    },
    {
        name: 'Beer',
        image: '@AthenaPlugins/icons/plugin-shop/beer.png',
        price: 250,
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

const removeFromCart = (item: { id: number }) => {
    const index = cartItems.value.findIndex((cartItem) => cartItem.id === item.id);
    if (index !== -1) {
        cartItems.value.splice(index, 1);
    }
};

const increaseQuantity = (item: { quantity: number }) => {
    item.quantity++;
};

const decreaseQuantity = (item: { id: number; quantity: number }) => {
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
