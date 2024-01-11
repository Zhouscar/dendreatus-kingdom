import { World } from "@rbxts/matter";
import { useChange } from "@rbxts/matter-hooks";
import { Players } from "@rbxts/services";
import { localPlr } from "client/localPlr";
import { store } from "client/store";
import { Plr } from "shared/components";
import { Equipping, EquippingByIndex } from "shared/components/items";

function equippingByIndexToEquipping(w: World) {
    for (const [e, plr, equippingByIndex] of w.query(Plr, EquippingByIndex)) {
        if (plr.player !== Players.LocalPlayer) continue;

        const state = store.getState();
        const itemGuid = state.players.inventory[localPlr]?.slots[equippingByIndex.index].itemGuid;

        if (!useChange([itemGuid])) return;

        if (itemGuid === undefined) {
            useChange([""]);
            w.remove(e, Equipping);
            return;
        }

        w.insert(e, Equipping({ itemGuid: itemGuid }));
        return;
    }

    useChange([""]);
}

export = equippingByIndexToEquipping;
