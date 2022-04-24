# Open Source Shop
<p align="center">
<img src="https://user-images.githubusercontent.com/82890183/157355387-465bf4ca-382c-4e90-85ea-3fb05fab5984.png" style="text-align:center; width:256px; height:256px;"/>
</p>
Herewith we bring a free store system for the Athena Framework which is under the MIT license and thus can be completely modified and re-released.

## Description
The store system is completely adapted to the Athena Framework and only things that are already integrated into the Athena Framework (Core) are used.
* Features
  * Athena Framework (3.0.4)
  * Database driven
  * Vending Machines
  * Custom Shops (Buy/Sell)
  * Searchbar
  * TypeScript / VueJS 3

## Getting Started

### Dependencies

* Basic Knowledge of the Athena Framework, TypeScript and VueJS.

### Installing

* Clone Repository (https://github.com/Booster1212/OpenSourceShop.git)
* Copy the athena-oss folder from server/ directory into your src/core/server-plugins folder
* Copy the athena-oss folder from client/ directory into your src/core/client-plugins folder
* Copy the shopUI folder from pages/ directory into your src-webviews/pages folder
* Add the imports listed below
```typescript
// Server - imports.ts (TypeScript) => 
import './athena-oss/index';

// Client - impports.ts (TypeScript)
import './athena-oss/view';
import './athena-oss/src/client-events';

// VueJS - components.ts (Vue) =>
import ShopUI from './shopUI/ShopUI.vue';
const componentList = {
    ShopUI: shallowRef(ShopUI),
}
```

## Help

In case of any unforeseen problems with the store system, please feel free to contact us in our Discord server, we will try to help you as soon as possible.

## Contribute to this plugin

If you want to contribute something to our open source store system, you are very welcome to do so by creating a pull request, you can of course also submit bugs or feature requests via the GitHub issue system!

## Authors & Contributors
* Author
  * Der Lord!
* Contributors
  * deeMace (Special Thanks)
  * jonesXYZ (Some Frontend)
  * CANAKIL

## License

This project is licensed under the [MIT] License - see the LICENSE.md file for details

## Links

* [Athena Framework](https://athenaframework.com/)
* [Lord-Development Discord Server](https://discord.gg/UzyFp8SKKg)

## Support my work

Programming plugins of course takes a lot of time, since I provide most of it as open source code for learning purposes, you have the opportunity to support me here, this is of course on a purely voluntary basis, thank you! <3
<p align="left">
 <a href="https://www.paypal.com/donate/?hosted_button_id=V7L7S57VACCQQ">
 <img src="https://raw.githubusercontent.com/andreostrovsky/donate-with-paypal/master/PNG/blue.png" style="width:256px"/>
 </a>
</p>
