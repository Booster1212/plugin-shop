<template>
    <div class="ShopSystem-Body" id="Mainbody" style="width: 50%; height: 75%">
        <div class="Main-Background">
            <br />
            <div class="ShopSystem-Header">
                <Button
                    color="red"
                    id="content"
                    style="
                        background-color: rgba(0, 0, 0, 1);
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
                        <img :src="ResolvePath(`../../assets/icons/${shopItem.image}.png`)" id="Images" />
                    </div>
                    <div class="descriptions">
                        <span>{{ shopItem.name }}</span
                        ><br /><br /><br /><br />
                        <br />
                    </div>
                    <hr />
                    <span>{{ shopItem.price }}$ / each</span><br />
                    <div class="inputButtons">
                        <input type="number" placeholder="1" v-model="selectedAmount[index]" />
                        <br />
                        <Button
                            class="buyButton"
                            :color="buttonColor"
                            :flatten="false"
                            :padding="2"
                            @click="buyShopItem(index)"
                            >{{ buttonText }}</Button
                        >
                    </div>
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
import ResolvePath from '../../utility/pathResolver';

const SHOP = [
    { id: 0, name: 'Hochleistungsreinigungsgerät', price: 250, image: 'burger' },
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
            shopType: 'buy',
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
        // this.fillShopItems(SHOP); // Debugging Purpose
        if ('alt' in window) {
            alt.emit(`${ComponentName}:Ready`);
            alt.on(`${ComponentName}:Vue:SetItems`, this.fillShopItems);
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
            alt.off(`${ComponentName}:Vue:SetItems`, this.fillShopItems);
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
            // shopSystem.ShopItems = SHOP; // Debugging Purpose
            shopSystem.ShopItems = shopItems;
            if (type === 'sell') {
                this.buttonText = 'Sell';
                this.buttonColor = 'red';
                this.shopType = 'sell';
            } else if (type === 'buy') {
                this.buttonText = 'Buy me!';
                this.buttonColor = 'green';
                this.shopType = 'buy';
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
            alt.emit(
                `${ComponentName}:Client:HandleShop`,
                shopSystem.ShopItems[index],
                this.selectedAmount[index],
                this.shopType,
            );
            return;
        },
        closePage() {
            if ('alt' in window) {
                alt.emit(`${ComponentName}:Vue:CloseShop`);
            }
        },
        ResolvePath,
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
    overflow-y: scroll;
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
    max-height: 50vh;
    top: 0vh;
    color: white;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    margin: auto;
    user-select: none;
    padding: 1.5vw;
    padding-bottom: 0.5vh;
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
    height: 270px;
    max-width: 250px;
    max-height: 270px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif,
        'Helvetica Neue', sans-serif;
    font-weight: none;
    font-size: 1em;
    background: rgba(138, 142, 146, 0.205);
    border-top-left-radius: 50px;
    border-bottom-right-radius: 50px;
    padding: 25px;
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
.inputButtons {
    position: relative;
    top: 1.5vh;
    align-items: center;
}
.buyButton {
    background-color: rgba(90, 90, 90, 1);
    border-radius: 15px;
    border: 15px;
    top: 1vh;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif,
        'Helvetica Neue', sans-serif;
}
.footer {
    position: sticky;
    background: rgba(255, 0, 0, 0.35);
    margin-top: 10px;
    height: 25px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    z-index: 350;
}
.descriptions {
    position: relative;
    top: 1.5vh;
    display: inline-block; /* or inline-block */
    text-overflow: ellipsis;
    word-wrap: break-word;
    overflow: hidden;
    max-height: 4.4em;
    line-height: 1.4em;
    max-width: 7vw;
}
/* width */
::-webkit-scrollbar {
    width: 10px;
    border-radius: 25px;
}

/* Track */
::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.35);
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: rgba(255, 0, 0, 0.35);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 0, 0, 0.35);
}
::placeholder {
    color: white;
    opacity: 1;
}
</style>
