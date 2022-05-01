<template>
    <div class="wrapper">
        <ShopHeader />
        <div class="content-wrapper">
            <div class="shop-items">
                <ShopItems />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from '@vue/runtime-core';
const ShopHeader = defineAsyncComponent({
    loader: () => import('./ShopHeader.vue'),
});
// @ts-ignore
const ShopItems = defineAsyncComponent(() => import('./ShopItems.vue'));
</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 840px;
    width: 1060px;
    background: rgb(0, 0, 0, 0.7);
}

.content-wrapper {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #000000;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(66, 63, 63);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
