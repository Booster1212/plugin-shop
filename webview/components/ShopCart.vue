<template>
    <div class="shop-cart-wrapper">
        <div class="header-wrapper">
            <div class="header"></div>
        </div>
        <div class="item-bar" v-for="(item, index) in currentCart" :key="index">
            <img :src="resolvePath(`/public/assets/icons/${item.image}.png`)" id="img" alt="item-image" />
            <p id="text">{{ item.name }} ${{ item.price }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { iShopItem } from '../../shared/interfaces/IShopItem';
import resolvePath from '../../../../../../src-webviews/src/utility/pathResolver';

const props = defineProps({
    cartItems: {
        type: Array,
        required: true,
    },
});
defineEmits(['close-page', 'set-page']);
const currentCart = [...props.cartItems] as iShopItem[];
</script>

<style scoped>
.shop-cart-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    float: right;
    background-color: black;
    width: 30vw;
    height: 80vh;
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
</style>
