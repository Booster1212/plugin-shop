<template>
    <div class="shop-wrapper">
        <div class="shop-content">
            <div class="item-wrapper">
                <div class="items">
                    <div class="item" v-for="item in availableItems" :key="item.id">
                        <div class="item-content">
                            <div class="item-icon" v-if="item.image">
                                <img :src="resolvePath(item.image)" id="images" alt="item-Image" />
                            </div>
                            <div class="item-details">
                                <h4>{{ item.name }} ({{ item.price }}$)</h4>
                                <div class="add-to-cart">
                                    <button class="remove-button" @click="addToCart(item)">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="shopping-cart">
                <h3>Shopping Cart</h3>
                <div class="cart-items">
                    <div class="cart-item" v-for="item in cartItems" :key="item.id">
                        <div class="cart-item-icon">
                            <img
                                :src="resolvePath(`${item.image}`)"
                                id="cart-image"
                                alt="cartImage"
                                style="width: 64px; height: 64px"
                            />
                        </div>
                        <div class="cart-item-details">
                            <p class="cart-item-name">{{ item.name }}</p>
                            <div class="cart-item-quantity">
                                <button class="quantity-button" @click="decreaseQuantity(item)">-</button>
                                <p class="quantity">{{ item.quantity }}</p>
                                <button class="quantity-button" @click="increaseQuantity(item)">+</button>
                            </div>
                            <button class="remove-button" @click="removeFromCart(item)">Remove</button>
                        </div>
                    </div>
                </div>
                <div class="cart-total">
                    <p class="total-price">Total Price: {{ calculateTotalPrice() }}$</p>
                    <p class="total-quantity">Amount of Items in Total: {{ calculateTotalQuantity() }}</p>
                </div>
                <div class="payment-buttons">
                    <button class="payment-button cash" @click="buyItems">Pay with Cash</button>
                    <button class="payment-button ec-card">Pay with EC Card</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import resolvePath from '@utility/pathResolver';
import WebViewEvents from '@utility/webViewEvents';
import { onMounted, ref } from 'vue';
import { ShopEvents } from '../shared/enums/ShopEvents';
import { ShopType } from '../shared/enums/ShopType';

const availableItems = ref([
    {
        id: 0,
        name: 'Test',
        image: '@AthenaPlugins/icons/plugin-shop/bread.png',
        price: 250,
        quantity: 1,
    },
]);

const cartItems = ref([]);
const shopType = ref('');

const addToCart = (item) => {
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

const increaseQuantity = (item) => {
    item.quantity++;
};

const decreaseQuantity = (item) => {
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
.shop-wrapper {
    height: 600px;
    display: flex;
    justify-content: center; /* Horizontally center the content */
    background-color: #f2f2f200;
    font-family: Arial, sans-serif;
}
.shop-content {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
}

.item-wrapper {
    height: 100%;
    width: 1050px;
    background-color: #000000;
    overflow-y: scroll;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 4px 4px 12px rgba(97, 41, 41, 0.1);

    /* Hide the scrollbar track */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer / Edge */

    /* Hide the thumb */
    &::-webkit-scrollbar {
        width: 0.2em;
    }
    &::-webkit-scrollbar-thumb {
        background-color: transparent;
    }

    /* Make the content scrollable */
    overflow: auto;
}

.items {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.item {
    flex: 0 0 calc(30% - 1rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    background-color: #3c558140;
    border-radius: 12px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.item-icon {
    margin-bottom: 1rem;
}

.item-icon > #images {
    max-width: 128px;
    max-height: 128px;
}

.item-price {
    margin-top: 0.5rem;
    color: #777777;
}

.add-to-cart {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
}

.shopping-cart {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 2rem;
    background-color: #2b2929;
    border-radius: 12px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.cart-items {
    overflow-x: hidden;
    overflow-y: scroll;
    width: 20vw;
    height: 75vh;
    margin-top: 1rem;
}

.cart-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 0;
}

.cart-item-icon {
    font-size: 1.5rem;
}

.cart-item-name {
    width: 100px;
    margin: 0;
}

.cart-item-details {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 0;
    width: 70%;
}

.cart-item-quantity {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-button {
    background-color: #cccccc;
    color: #333333;
    border: none;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.quantity {
    font-size: 1.2rem;
    margin: 0;
}
.remove-button {
    background-color: #ff4b5c;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 0.3rem 0.5rem;
    cursor: pointer;
}

.total-price {
    margin-top: 1rem;
    font-weight: bold;
}

.payment-button {
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 1rem 2rem;
    margin-top: 1rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
}

.payment-button.cash {
    background-color: #27ae60;
}

.payment-button.ec-card {
    background-color: #27ae60;
}

.payment-button:hover {
    background-color: #2980b9;
}
.payment-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
}
</style>
