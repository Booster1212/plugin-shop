<template>
    <div class="wrapper" style="float: left">
        <div class="header-wrapper">
            <div class="header">
                <Icon icon="icon-cart" :size="32" @click="enableModalCart" />
                <Icon icon="icon-cross" :size="48" @click="close" />
            </div>
        </div>
        <div class="content-wrapper">
            <div class="content">
                <div class="item-bar" v-for="(item, index) in shopItems" :key="index">
                    <img :src="resolvePath(`../../assets/icons/${item.image}.png`)" id="img" alt="item-img" />
                    <p id="text">{{ item.name }} ${{ item.price }}</p>
                    <input placeholder="1" id="input" />
                    <button id="btn"><Icon icon="icon-cart" :size="36" @click="buyItem(item)" /></button>
                </div>
            </div>
        </div>
        <div class="modal-wrapper" v-if="modalisActive" style="float: right">
            <ShopCart :cart-items="currentCart"></ShopCart>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, onMounted, onUnmounted } from '@vue/runtime-core';
import { ref } from 'vue';
import resolvePath from '../../../../../src-webviews/src/utility/pathResolver';
import { ShopEvents } from '../shared/events';
import { iShopItem } from '../shared/interfaces/IShopItem';
import ShopCart from './components/ShopCart.vue';
const Icon = defineAsyncComponent(() => import('@components/Icon.vue'));

let debugItems = [
    { name: 'Burger', price: '250', image: 'crate' },
    { name: 'Burger', price: '250', image: 'crate' },
    { name: 'Burger', price: '250', image: 'crate' },
    { name: 'Burger', price: '250', image: 'crate' },
    { name: 'Burger', price: '250', image: 'crate' },
    { name: 'Burger', price: '250', image: 'crate' },
];

let shopItems = ref<Array<iShopItem>>([
    {
        dbName: '',
        image: '',
        name: '',
        price: 0,
    },
]);
let shopType = ref('');
let modalisActive = ref(false);
let currentCart = ref(debugItems);

onMounted(() => {
    if ('alt' in window) {
        alt.emit('ShopUI:Ready');
        alt.on(ShopEvents.fillShop, fillShop);
    }
});

onUnmounted(() => {
    shopItems.value = [];
});

function fillShop(items: Array<iShopItem>) {
    shopItems.value = items;
}

function buyItem(item: iShopItem) {
    if ('alt' in window) {
        alt.emit(ShopEvents.buyShopItem, item, 1, 'buy');
    }
}

function enableModalCart() {
    modalisActive.value = !modalisActive.value;
}

function close() {
    if ('alt' in window) {
        alt.emit('ShopUI:Close');
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;600;700;800;900&display=swap');
.wrapper {
    position: absolute;
    left: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 30vw;
    height: 80vh;
}

.content-wrapper {
    display: flex;
    width: 100%;
    height: calc(80vh - 5vh);
}
.content {
    display: flex;
    flex-direction: column;

    align-items: center;
    width: 100%;
    background-color: hsl(225, 2%, 5%);
    overflow-y: scroll;
}

.header {
    display: flex;

    align-items: center;
    justify-content: flex-end;

    height: 5vh;
    width: 100%;

    background-color: hsl(0, 0%, 5%);
}
.header > .icon {
    margin-right: 5px;
    transition: 0.5s !important;
}
.header > .icon:hover {
    cursor: pointer;
    color: red;
    transition: 0.5s !important;
}
.item-bar {
    min-height: 30px;
    width: 90%;

    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
    background: hsl(225, 2%, 49%);
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}

.item-bar > #img {
    margin-left: 15px;
    width: 48px;
    height: 48px;
}

.item-bar > #text {
    flex-grow: 1;
    margin-left: 25px;
}

.item-bar > #btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;

    height: 100%;
    width: 15%;
    margin-left: 0px;
    transition: 0.5s !important;
    background: hsl(225, 2%, 45%);
}
.item-bar > #btn:hover {
    cursor: pointer;
    background: hsl(225, 2%, 29%);
    transition: 0.5s !important;
}
.item-bar > input {
    min-height: 100%;
    width: 12.5%;
    text-align: center;
    border: 0px;
    background: hsl(225, 2%, 45%);
    font-size: 18px;
    box-sizing: border-box;
}
.item-bar > input::placeholder {
    color: rgb(150, 143, 143);
}
.modal-wrapper {
    position: fixed;
    left: 36%;
}
/* Global Selector */
* {
    font-family: 'Inter', sans-serif;
    color: white;
    font-size: 18px;
}
</style>
