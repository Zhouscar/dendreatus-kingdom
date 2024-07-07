import { World } from "@rbxts/matter";
import { useChange } from "@rbxts/matter-hooks";
import { theLocalPlr } from "client/localPlr";
import { store } from "client/store";
import { LocalPlr, Plr } from "shared/components";
import { Equipping, EquippingByIndex, EquippingItem } from "shared/components/items";

function equippingToEquippingItem(w: World) {
    let hasEquipped = false;

    for (const [e, localPlr, equipping] of w.query(LocalPlr, Equipping)) {
        hasEquipped = true;
        const state = store.getState();
        const item = state.players.inventory[theLocalPlr]?.items.get(equipping.itemGuid);

        if (!useChange([item])) return;

        if (item === undefined) {
            useChange([""]);
            w.remove(e, EquippingItem);
            return;
        }

        w.insert(e, EquippingItem({ item: item }));
        return;
    }

    if (useChange([hasEquipped], "HasEquipped") && !hasEquipped) {
        for (const [e, localPlr] of w.query(LocalPlr)) {
            useChange([""]);
            w.remove(e, EquippingItem);
        }
    }

    useChange([""]);
}

export = equippingToEquippingItem;
