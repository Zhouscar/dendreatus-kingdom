import { World } from "@rbxts/matter";
import { CraftTable, Craftable, Interactable } from "shared/components/interactables";
import { EMPTY_COOKABLE_ITEMS } from "shared/features/cookables/constants";

function craftables(w: World) {
    for (const [e, _] of w.query(CraftTable).without(Craftable, Interactable)) {
        w.insert(e, Craftable({ items: EMPTY_COOKABLE_ITEMS }), Interactable({}));
    }
}

export = craftables;
