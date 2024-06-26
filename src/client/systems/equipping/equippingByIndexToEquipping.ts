import { World } from "@rbxts/matter";
import { useChange } from "@rbxts/matter-hooks";
import { theLocalPlr } from "client/localPlr";
import { store } from "client/store";
import { LocalPlr, Plr } from "shared/components";
import { Equipping, EquippingByIndex } from "shared/components/items";

function equippingByIndexToEquipping(w: World) {
    let hasEquipped = false;

    for (const [e, localPlr, equippingByIndex] of w.query(LocalPlr, EquippingByIndex)) {
        hasEquipped = true;
        const state = store.getState();
        const itemGuid =
            state.players.inventory[theLocalPlr]?.slots[equippingByIndex.index].itemGuid;

        if (!useChange([itemGuid])) return;

        if (itemGuid === undefined) {
            useChange([""]);
            w.remove(e, Equipping);
            return;
        }

        w.insert(e, Equipping({ itemGuid: itemGuid }));
        return;
    }

    if (useChange([hasEquipped], "HasEquipped") && !hasEquipped) {
        for (const [e, localPlr] of w.query(LocalPlr)) {
            useChange([""]);
            w.remove(e, Equipping);
        }
    }

    useChange([""]);
}

export = equippingByIndexToEquipping;
