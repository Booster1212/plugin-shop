import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api/index.js';

export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export function foodEffect(player: alt.Player, slot: number, type: 'inventory' | 'toolbar') {
    const propertyName = String(type);
    const data = Athena.document.character.get(player);
    const item = Athena.player.inventory.getAt(player, slot);

    if (typeof data === 'undefined' || typeof data[propertyName] === 'undefined' || typeof item === 'undefined') return;

    item.quantity = 1;
    Athena.player.inventory.sub(player, item);

    data.food += 25;
}

export function drinkEffect(player: alt.Player, slot: number, type: 'inventory' | 'toolbar') {
    const propertyName = String(type);
    const data = Athena.document.character.get(player);
    const item = Athena.player.inventory.getAt(player, slot);

    if (typeof data === 'undefined' || typeof data[propertyName] === 'undefined' || typeof item === 'undefined') return;

    item.quantity = 1;
    Athena.player.inventory.sub(player, item);
    data.water += 25;
}

export function drinkEffectAlcoholic(player: alt.Player, slot: number, type: 'inventory' | 'toolbar') {
    const propertyName = String(type);
    const data = Athena.document.character.get(player);
    const item = Athena.player.inventory.getAt(player, slot);

    if (typeof data === 'undefined' || typeof data[propertyName] === 'undefined' || typeof item === 'undefined') return;

    item.quantity = 1;
    Athena.player.inventory.sub(player, item);

    Athena.player.emit.setTimeCycleEffect(player, 'Drunk', 30000);
}
