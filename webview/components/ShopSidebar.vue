<template>
    <div class="sidebar">
        <div class="cart-wrapper">
            <Icon icon="icon-shopping-cart1" :size="72" style="margin-bottom: 25px" />
        </div>

        <div class="cart-items">
            <p>Placeholder Item (1)</p>
            <p>Placeholder Item (2)</p>
        </div>

        <div class="cart-checkout">
            <p>Items (Total): 250</p>
            <p>Money (Total): $12250</p>
        </div>

        <div class="footer">
            <button id="buy">Buy all!</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue';
const Icon = defineAsyncComponent({
    loader: () => import('@components/Icon.vue'),
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;600;700;800;900&display=swap');
.sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 840px;
    width: 300px;
    background: black;
}

.cart-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    width: 100%;
}

.cart-items {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 2px inset white;
    overflow-y: scroll;
    height: 100%;
    width: 100%;
}

.cart-items > p {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 20px;
    font-weight: bold;
    background: red;
    height: 40px;
    margin-bottom: -10px;
    width: 80%;
    border-radius: 5px;
}

.cart-checkout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.footer {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: auto;
}

.footer > button#buy {
    background: rgb(30, 113, 0);
    color: white;
    font-size: 20px;
    font-weight: bold;
    padding: 10px;
    width: 85%;
    border-radius: 5px;
    margin-bottom: 10px;
    border: none;
}
* {
    font-family: 'Inter', sans-serif;
}
</style>
