<template>
    <div class="header">
        <p>Open Source Shop<Icon icon="icon-cart" :size="28" style="margin-left: 15px" /></p>
        <div class="buttons">
            <button id="rob">Rob this shop!</button>
            <button id="close"><Icon icon="icon-close" :size="36" /></button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from '@vue/runtime-core';

const Icon = defineAsyncComponent({
    loader: () => import('@components/Icon.vue'),
});
</script>

<style scoped>
.header {
    display: flex;
    width: 100%;
    height: 80px;
}

.header > p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: white;
    font-size: 24px;
    width: 100%;
    margin-left: 20px;
}

.buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
}

.buttons > button#rob {
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(255, 255, 255);
    font-size: 20px;
    font-weight: bold;
    background: none;
    height: 40px;
    margin-right: 0px;
    border-radius: 5px;
    height: 100%;
    border: none;
}
#close {
    background: none;
    border: none;
    transition: 0.5s !important;
    height: 100%;
    width: 70px;
    color: white;
}
#close:hover {
    cursor: pointer;
    color: red;
    transition: 0.5s !important;
}
</style>
