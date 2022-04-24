<template>
    <div class="flexbox-wrapper">
    </div>
</template>

<script lang="ts" setup>
import { defineComponent } from "@vue/runtime-core";
defineComponent({
    name: "ShopUI",
});
</script>

<style lang="scss" scoped>
.flexbox-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 1200px;
    height: 700px;

    border: 1px solid black;
}
</style>