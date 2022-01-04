<template>
    <div class="ShopSystem-Body" id="Mainbody" style="width: 50%; height: 75%">
        <div class="Main-Background">
            <br />
            <div class="ShopSystem-Header">
                <Button
                    color="red"
                    id="content"
                    style="
                        background-color: rgba(0, 0, 0, 0.75);
                        border: 0px;
                        border-top-left-radius: 25px;
                        border-top-right-radius: 0px;
                        margin-top: -2vh;
                    "
                    @click="closePage()"
                    >Close</Button
                >
            </div>
            <div class="ShopSystem-ItemHolder" v-for="(shopItem, index) in ShopSystem.ShopItems" :key="index">
                <div class="ShopSystem-Items" v-if="ShopSystem.ShopItems">
                    <div class="ShopSystem-ImageHolder">
                        <img :src="`../../../public/assets/icons/${shopItem.image}.png`" id="Images" />
                    </div>
                    <span>{{ shopItem.name }}</span
                    ><br /><br />
                    <span>{{ shopItem.price }}$</span><br />
                    <br />
                    <input type="number" placeholder="1" v-model="selectedAmount[index]" />
                    <br /><br />
                    <Button
                        id="buyButton"
                        :color="buttonColor"
                        :flatten="false"
                        :padding="2"
                        @click="buyShopItem(index)"
                        style="
                            background-color: rgba(90, 90, 90, 1);
                            font-family: monospace;
                            border-radius: 0px;
                            border: 15px;
                            top: 1vh;
                            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial,
                                sans-serif, 'Helvetica Neue', sans-serif;
                        "
                        >{{ buttonText }}</Button
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
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
    { id: 0, name: 'Burger', price: 250, image: 'burger' },
    { id: 1, name: 'Bread', price: 350, image: 'bread' },
    { id: 2, name: 'Burger', price: 450, image: 'burger' },
    { id: 3, name: 'Bread', price: 550, image: 'bread' },
    { id: 4, name: 'Burger', price: 650, image: 'burger' },
    { id: 5, name: 'Bread', price: 750, image: 'bread' },
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
            buttonText: 'Buy me!',
            buttonColor: 'green',
            selectedAmount: [],
            ShopSystem: {
                ShopItems: [],
            },
        };
    },
    // Called when the page is loaded.
    mounted() {
        // Bind Events to Methods
        // this.fillShopItems(SHOP);
        if ('alt' in window) {
            alt.emit(`${ComponentName}:Ready`);
            alt.on('OSS:Vue:SetItems', this.fillShopItems);
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
            alt.off('OSS:Vue:SetItems', this.fillShopItems);
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
        fillShopItems(shopItems: Array<String | number>[], type: string) {
            const shopSystem = { ...this.ShopSystem };
            this.ShopSystem = shopSystem;
            // shopSystem.ShopItems = SHOP;
            shopSystem.ShopItems = shopItems;
            console.log(type);
            if (type === 'sell') {
                this.buttonText = 'Sell';
                this.buttonColor = 'red';
            } else if (type === 'buy') {
                this.buttonText = 'Buy me!';
                this.buttonColor = 'green';
            }
            return;
        },
        // ShopItem
        buyShopItem(index: number) {
            const shopSystem = { ...this.ShopSystem };
            this.ShopSystem = shopSystem;
            if (this.selectedAmount[index] === null || this.selectedAmount[index] === undefined)
                this.selectedAmount[index] = 1;
            console.log(JSON.stringify(shopSystem.ShopItems[0]));
            console.log(index, this.selectedAmount[index]);
            alt.emit('OSS:Client:HandleShop', shopSystem.ShopItems[index], this.selectedAmount[index]);
            return;
        },
        closePage() {
            if ('alt' in window) {
                alt.emit('OSS:Vue:CloseShop');
            }
        },
    },
});
</script>

<style scoped>
.ShopSystem-Body {
    margin: auto;
    width: 50%;
    margin-top: 5%;
    padding: 0px;
    display: block;
}
.Main-Background {
    position: absolute;
    background: rgba(0, 0, 0, 0.75);
    right: 59vw;
    top: 5vh;
    height: 65vh;
    width: 40vw;
    text-align: center;
    user-select: none;
    margin: 0 auto;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    overflow: auto;
}
.ShopSystem-Header {
    position: sticky;
    color: white;
    text-align: center;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif,
        'Helvetica Neue', sans-serif;
    font-weight: bold;
    font-size: 1.5em;
    width: 100%;
    user-select: none;
    top: 0vh;
    z-index: 300;
}
.ShopSystem-ItemHolder {
    position: relative;
    max-width: 8vw;
    top: 2vh;
    color: white;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    margin: auto;
    user-select: none;
    padding: 1.5vw;
    right: 0.7vw;
}
#Images {
    max-width: 128px;
    width: 64px;
    height: 64px;
    max-height: 128px;
    padding: 2px;
}
.ShopSystem-ImageHolder {
    max-height: 150px;
}
.ShopSystem-Items {
    color: white;
    width: 350px;
    height: 300px;
    max-width: 250px;
    max-height: 250px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif,
        'Helvetica Neue', sans-serif;
    font-weight: none;
    font-size: 1em;
    border: 1px solid grey;
    border-radius: 25px;
    padding: 30px;
}
#buyButton {
    max-height: 2vw;
}
input {
    background-color: rgba(90, 90, 90, 1);
    color: white;
    max-width: 7vw;
    text-align: center;
    user-select: none;
    height: 2.2vh;
    border: 0px;
    border-radius: 15px;
    border-color: white;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif,
        'Helvetica Neue', sans-serif;
}
/* width */
::-webkit-scrollbar {
    width: 10px;
    border-radius: 25px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #000000;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: rgb(255, 0, 0);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: rgb(255, 0, 0);
}
::placeholder {
    color: white;
    opacity: 1;
}
</style>
