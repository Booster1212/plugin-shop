<template>
    <div class="flexbox-wrapper">
        <div class="sidebar-left">
            <button>General</button>
            <button>Food</button>
            <button>Drinks</button>
        </div>

        <div class="item-wrapper" v-if="isDebugMode">
            <div class="shop-items" v-for="(item, index) in debugItems" :key="index">
                <p>{{ item.name }}</p>
            </div>
        </div>
        <div class="item-wrapper" v-else>
            <div class="shop-items" v-for="(item, index) in debugItems" :key="index">
                <p>{{ item.name }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineComponent } from '@vue/runtime-core';
let isDebugMode = true;
let debugItems = [
    { name: 'Item', price: 250 },
    { name: 'Item', price: 250 },
    { name: 'Item', price: 250 },
    { name: 'Item', price: 250 },
    { name: 'Item', price: 250 },
    { name: 'Item', price: 250 },
    { name: 'Item', price: 250 },
    { name: 'Item', price: 250 },
    { name: 'Item', price: 250 },
    { name: 'Item', price: 250 },
    { name: 'Item', price: 250 },
    { name: 'Item', price: 250 },
];

defineComponent({
    name: 'ShopUI',
});
</script>

<style lang="scss" scoped>
@use './scss/vars.scss';
.flexbox-wrapper {
    display: flex;
    width: 1600px;
    height: 800px;
}

.item-wrapper {
    display: flex;
    flex-grow: 1;
    flex-wrap: wrap;
    background: vars.$background-color;
    justify-content: center;

    & .shop-items {
        flex: 1 1 20%;
        margin: 15px;
        width: 100%;
        height: 500px;
        border: 1px solid white;
    }

    overflow-y: scroll;
}

.sidebar-left {
    align-self: center;

    width: 15%;
    height: 100%;
    background: rgb(38, 139, 201);

    & > button {
        margin: auto;
        width: 100%;
        height: 50px;
        border: none;
        background: rgb(76, 90, 219);
        color: white;
        font-size: 1.5em;
        font-weight: bold;
        cursor: pointer;
    }
}
</style>
