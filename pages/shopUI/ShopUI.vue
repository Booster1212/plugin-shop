<template>
    <div class="ShopSystem-Body" id="Mainbody" style="display: block">
        <div class="Main-Background">
            <br />
            <div class="ShopSystem-Header">
                <Button color="red" id="content" style="border-radius: 25px">Shopmenü schließen</Button>
                <hr />
            </div>
            <div class="ShopSystem-ItemHolder" v-for="(shopItem, index) in ShopSystem.ShopItems" :key="index">
                <div class="ShopSystem-Items" v-if="ShopSystem.ShopItems">
                    <div class="ShopSystem-ImageHolder">
                        <img :src="`../../../public/assets/icons/${shopItem.image}.png`" id="Images" />
                    </div>
                    <span>{{ shopItem.name }}</span
                    ><br /><br />
                    <span>{{ shopItem.price }}$</span><br />
                    <hr />
                    <input
                        :class="textboxClass"
                        class="textbox pa-2"
                        type="number"
                        placeholder="Amount"
                        v-model="selectedAmount[index]"
                    />
                    <br />
                    <Button
                        id="buyButton"
                        color="green"
                        :flatten="false"
                        @click="buyShopItem(index)"
                        style="background-color: rgba(0, 0, 0, 0.85)"
                        >Kaufen</Button
                    >
                    <hr />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import Button from '../../components/Button.vue';
import Frame from '../../components/Frame.vue';
import Icon from '../../components/Icon.vue';
import Input from '../../components/Input.vue';
import Modal from '../../components/Modal.vue';
import Module from '../../components/Module.vue';
import RangeInput from '../../components/RangeInput.vue';
import Toolbar from '../../components/Toolbar.vue';
const SHOP = [
    { id: 0, name: 'Burger', price: 250, image: 'burger', type: 'buy' },
    { id: 1, name: 'Bread', price: 350, image: 'bread', type: 'buy' },
    { id: 2, name: 'Burger', price: 450, image: 'burger', type: 'buy' },
    { id: 3, name: 'Bread', price: 550, image: 'bread', type: 'buy' },
    { id: 4, name: 'Burger', price: 650, image: 'burger', type: 'buy' },
    { id: 5, name: 'Bread', price: 750, image: 'bread', type: 'buy' },
];
// Very Important! The name of the component must match the file name.
// Don't forget to do this. This is a note so you don't forget.
const ComponentName = 'ShopUI';
export default defineComponent({
    name: ComponentName,
    // Used to add Custom Components
    components: {
        Button,
        Frame,
        Icon,
        Input,
        Modal,
        Module,
        RangeInput,
        Toolbar,
    },
    // Used to define state
    data() {
        return {
            shopType: '',
            selectedAmount: [],
            ShopSystem: {
                ShopItems: {},
            },
            Translations: {
                shopName: 'System',
                buyName: 'Kaufpreis',
                inStorage: 'Lagerbestand',
            },
        };
    },
    // Called when the page is loaded.
    mounted() {
        this.openShopView(SHOP);
        // Bind Events to Methods
        if ('alt' in window) {
            alt.emit(`${ComponentName}:Ready`);
        }
        // Add Keybinds for In-Menu
        document.addEventListener('keyup', this.handleKeyPress);
    },
    // Called when the page is unloaded.
    unmounted() {
        // Make sure to turn off any document events as well.
        // Only if they are present of course.
        // Example:
        // document.removeEventListener('mousemove', this.someFunction)
        if ('alt' in window) {
            alt.off(`${ComponentName}:Close`, this.close);
        }
        // Remove Keybinds for In-Menu
        document.removeEventListener('keyup', this.handleKeyPress);
    },
    // Used to define functions you can call with 'this.x'
    methods: {
        handleKeyPress(e) {
            // Escape Key
            if (e.keyCode === 27 && 'alt' in window) {
                alt.emit(`${ComponentName}:Close`);
            }
        },
        openShopView(Items) {
            const shopSystem = { ...this.ShopSystem };
            this.ShopSystem = shopSystem;
            shopSystem.ShopItems = Items;
            console.log('Filled shop!');
        },
        closeShopView() {
            document.getElementById('Mainbody').style.display = 'none';
            alt.emit('ShopSystem:Vue:CloseShop');
        },
        // ShopItem
        buyShopItem(index) {
            console.log(index, this.selectedAmount[index]);
        },
        sellShopItem() {
            // N/A
        },
    },
    computed: {
        textboxClass() {
            const classes = {};

            if (!this.stack) {
                classes['textbox-full-width'] = true;
            }

            if (this.stack) {
                classes['mt-2'] = true;
            }

            return classes;
        },
    },
});
</script>

<style scoped>
@font-face {
    font-family: 'CHIBI';
    src: url(./chibi.ttf);
}

.ShopSystem-Body {
    margin: auto;
    width: 50%;
    margin-top: 5%;
    padding: 10px;
    display: block;
}
.Main-Background {
    position: absolute;
    background: rgba(0, 0, 0, 0.75);
    height: 75vh;
    width: 50vw;
    text-align: center;
    user-select: none;
    overflow-x: scroll;
    margin: 0 auto;
    border-radius: 25px;
}

#buyButton {
    margin-top: 10px;
}
.ShopSystem-Header {
    position: absolute;
    color: white;
    text-align: center;
    font-family: 'Chibi';
    font-weight: bold;
    font-size: 1.5em;
    width: 100%;
    user-select: none;
    z-index: 100;
    top: 5px;
}
.ShopSystem-ItemHolder {
    position: relative;
    top: 1.5vh;
    color: white;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    margin: auto;
    user-select: none;
    padding: 25px;
}
#Images {
    width: 128px;
    height: 128px;
    padding: 2px;
}
.ShopSystem-ImageHolder {
    max-height: 150px;
    overflow: auto;
}
.ShopSystem-Items {
    color: white;
    max-width: 200px;
    font-family: 'CHIBI';
    font-weight: bold;
    font-size: 1.2em;
}
input[type='number']::-ms-input-placeholder {
    text-align: center;
}
.Main-Background::-webkit-scrollbar {
    position: absolute;
    width: 0.3em;
}
.Main-Background::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.Main-Background::-webkit-scrollbar-thumb {
    background-color: rgb(255, 0, 0);
    outline: 1px solid rgb(0, 0, 0);
    border-radius: 25px;
}
</style>
