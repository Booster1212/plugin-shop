<template>
    <div class="shop-wrapper">
        <div class="item" v-for="(item, index) in availableItems" :key="index">
            <div id="image">
                <img :src="resolvePath(item.image)" alt="item-background" />
            </div>
            <div id="item-data">
                <p>{{ item.name }} | ${{ item.price }}</p>
            </div>
            <div id="amount-buttons">
                <button id="item-btn" @click="decreaseQuantity(item)">
                    <Icon icon="icon-minus" :size="24"></Icon>
                </button>
                <p>{{ item.quantity }}</p>
                <button id="item-btn" @click="increaseQuantity(item)"><Icon icon="icon-plus" :size="24"></Icon></button>
            </div>
            <button id="button" @click="addToCart(item)">Add to cart</button>
        </div>
    </div>
    <div class="shop-cart">
        <div id="items">
            <ul class="item-list">
                <li v-for="(cartitem, index) in cartItems" :key="index" class="cart-item">
                    <div class="item-info">
                        <div class="item-icon">
                            <img :src="resolvePath(cartitem.image)" alt="item-background" class="item-icon" />
                        </div>
                        <span class="item-name">{{ cartitem.name }} [x{{ cartitem.quantity }}]</span>
                    </div>
                    <div class="item-price">$ {{ cartitem.price }}</div>
                    <div class="item-remove" @click="removeFromCart(cartitem)">
                        <Icon icon="icon-trash" :size="24"></Icon>
                    </div>
                </li>
            </ul>
        </div>
        <div class="cart-buttons">
            <button class="left-button" @click="buyItems()">Pay with Cash</button>
            <button class="right-button">Pay with EC Card</button>
        </div>
        <div class="total-price">
            <p>Total Price:</p>
            <p class="amount">$ {{ calculateTotalPrice() }} | Total Items: {{ calculateTotalQuantity() }}</p>
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
    /* {
        name: 'Assault Rifle',
        image: '@AthenaPlugins/icons/plugin-shop/bread.png',
        price: 250,
        quantity: 1,
    },
    {
        name: 'Test 2',
        image: '@AthenaPlugins/icons/plugin-shop/beer.png',
        price: 250,
        quantity: 1,
    },
    {
        name: 'Test 3',
        image: '@AthenaPlugins/icons/plugin-shop/bread.png',
        price: 250,
        quantity: 1,
    },
    {
        name: 'Test 4',
        image: '@AthenaPlugins/icons/plugin-shop/bread.png',
        price: 250,
        quantity: 1,
    },
    {
        name: 'Test 5',
        image: '@AthenaPlugins/icons/plugin-shop/bread.png',
        price: 250,
        quantity: 1,
    },
    {
        name: 'Test 6',
        image: '@AthenaPlugins/icons/plugin-shop/bread.png',
        price: 250,
        quantity: 1,
    },
    {
        name: 'Test 7',
        image: '@AthenaPlugins/icons/plugin-shop/bread.png',
        price: 250,
        quantity: 1,
    },
    {
        name: 'Test 8',
        image: '@AthenaPlugins/icons/plugin-shop/bread.png',
        price: 250,
        quantity: 1,
    },
    {
        name: 'Test 9',
        image: '@AthenaPlugins/icons/plugin-shop/bread.png',
        price: 250,
        quantity: 1,
    },
    {
        name: 'Test 10',
        image: '@AthenaPlugins/icons/plugin-shop/bread.png',
        price: 250,
        quantity: 1,
    }, */
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
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap');

.shop-wrapper {
    display: grid;

    height: 600px;
    width: 1040px;

    background: linear-gradient(127deg, #07141d 4.01%, #040f17 71.45%);
    filter: drop-shadow(0px 4px 4px rgba(11, 13, 27, 0.25));
    opacity: 0.95;

    grid-template-columns: repeat(4, 1fr);
    grid-gap: 0px;

    overflow: auto;
    font-family: 'Oswald', sans-serif;

    padding-bottom: 40px;

    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}
.item {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;

    width: 80%;
    height: 280px;
    border-radius: 5px;
    font-size: 16px;
    background: radial-gradient(50% 50% at 50% 50%, #19242d 0%, #0d1821 100%);
    margin: 10%;
    margin-bottom: 0%;
}
.item #image {
    margin-top: 15px;
    width: 128px;
    height: 128px;

    background-size: contain;
}
.item #amount-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

#item-btn {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 30px;
    height: 30px;
    background: #4171cc;

    border: none;
    border-radius: 10px;
    cursor: pointer;

    color: white;
}

#item-btn + p {
    margin: 0 10px;
}
.item #button {
    position: absolute;
    bottom: 0%;
    transform: translateY(50%);
    width: 120px;
    height: 30px;
    border-radius: 3px;
    border: none;
    background: #4171cc;
    box-shadow: 0px 6px 20px 0px rgba(255, 255, 255, 0.3) inset;
    color: white;
    transition: 0.5s ease-in-out;
}

.item #button:hover {
    background-color: #224b99;
    transition: 0.5s ease-in-out;
    cursor: pointer;
}
.shop-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 352px;
    height: 640px;
    flex-shrink: 0;
    border-radius: 0px 10px 10px 0px;
    background: linear-gradient(0deg, #0d1821 0%, #0d1821 100%), #d9d9d9;
    font-family: 'Oswald', sans-serif;
    color: white !important;
    margin-right: 10%;
}

.cart-buttons {
    display: flex;
    justify-content: space-between;
    width: 300px;
    margin-top: 15px;
}

.left-button,
.right-button {
    background-color: #3498db;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.shop-cart #items {
    margin-top: 25px;
    width: 300px;
    height: 500px;
    border-radius: 10px;
    background: rgba(44, 43, 43, 0.2);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    overflow: auto;
}

.item-list {
    list-style: none;
    padding: 0;
}

.cart-item {
    background-color: #4171cc;
    margin: 15px;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.item-info {
    display: flex;
    align-items: center;
}

.item-icon {
    width: 32px;
    height: 32px;
    margin-right: 10px;
}

.item-name {
    min-width: 140px;
    max-width: 140px;
    font-size: 20px;
    text-align: justify;
    text-justify: inter-character;
}

.item-price {
    font-size: 20px;
    font-weight: bold;
}

.total-price {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.total-price p {
    margin: 0;
}

.amount {
    font-size: 20px;
    font-weight: bold;
    color: #3498db;
}

.shop-wrapper::-webkit-scrollbar {
    width: 0px;
}

.shop-wrapper::-webkit-scrollbar-thumb {
    background: transparent;
}
#items::-webkit-scrollbar {
    width: 0px;
}

#items::-webkit-scrollbar-thumb {
    background: transparent;
}
</style>
