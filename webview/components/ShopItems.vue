<template>
    <div class="item-wrapper">
        <div class="item" v-for="(item, index) in serverItems" :key="index">
            <div class="img-wrapper">
                <p>{{ item.name }}</p>
                <img src="../../../../../../src-webviews/public/assets/icons/burger.png" id="image" />
            </div>

            <div class="item-info">
                <p>Price: ${{ item.price }}</p>
            </div>

            <div class="input-wrapper">
                <input type="number" placeholder="1" />
            </div>

            <div class="buttons">
                <button class="btn btn-primary"><Icon icon="icon-cart" :size="24" /></button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { ShopEvents } from '../../shared/events/index';
const Icon = defineAsyncComponent({
    loader: () => import('@components/Icon.vue'),
});

let serverItems = ref([]);

const debugItems = [
    { name: 'Burger', price: 250 },
    { name: 'Burger', price: 250 },
    { name: 'Burger', price: 250 },
    { name: 'Burger', price: 250 },
    { name: 'Burger', price: 250 },
    { name: 'Burger', price: 250 },
];

onMounted(() => {
    if('alt' in window) {
        alt.emit('ShopUI:Ready');
        alt.on(ShopEvents.fillVueArray, handleSetItems);
    }
});

function handleSetItems(currentShopItems: Array<any>, action: string) {
    serverItems.value = currentShopItems;
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;600;700;800;900&display=swap');
.item-wrapper {
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    width: 100%;
    height: 100%;
}

.item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 245px;
    height: 360px;
    margin: 10px;
    background: rgb(88, 94, 88);
    border-radius: 10px;
    box-shadow: 0px 0px 5px 0px rgb(4, 113, 167);
}

.item > p {
    margin: 10px;
    font-size: 20px;
}

.item-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    margin-top: 15px;
    border-bottom: 2px inset black;
}

.input-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    margin-top: auto;
}

.input-wrapper > input {
    width: 100%;
    height: 30px;
    border-radius: 5px;
    border: 1px solid rgb(40, 38, 38);
    font-size: 20px;
    text-align: center;
    background: rgb(0, 0, 0);
    border: none;
}

.input-wrapper > ::placeholder {
    color: rgb(255, 255, 255);
}

.img-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 2px inset black;
    width: 80%;
    margin-top: 15px;
}

#image {
    margin-top: 15px;
    width: 64px;
    height: 64px;
}

.buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin-top: auto;
    margin-bottom: 25px;
}

.buttons > button {
    width: 200px;
    height: 50px;
    background: rgb(0, 0, 0);
    border: none;
    color: rgb(255, 255, 255);
    font-size: 20px;
    cursor: pointer;
    border-radius: 5px;
    transition: 0.5s !important;
}

.buttons > button:hover {
    background: rgb(117, 108, 108);
    cursor: pointer;
    transition: 0.5s !important;
}

* {
    font-family: 'Inter', sans-serif;
    font-size: 1em;
}
</style>
