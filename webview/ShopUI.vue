<template>
    <div class="content-wrapper">
        <ShopContent />
        <ShopSidebar />
    </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, defineComponent } from '@vue/runtime-core';
defineComponent({
    name: 'ShopUI'
});
const ShopContent = defineAsyncComponent({
    loader: () => import('./components/ShopContent.vue'),
});

const ShopSidebar = defineAsyncComponent({
    loader: () => import('./components/ShopSidebar.vue'),
});
</script>

<style scoped>
.content-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
</style>
