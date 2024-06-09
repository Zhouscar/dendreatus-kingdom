import { World } from "@rbxts/matter";
import { CookTable, Cookable, Interactable } from "shared/components/interactables";
import { EMPTY_COOKABLE_ITEMS } from "shared/features/cookables/constants";

function cookables(w: World) {
    for (const [e, _] of w.query(CookTable).without(Cookable, Interactable)) {
        w.insert(e, Cookable({ items: EMPTY_COOKABLE_ITEMS }), Interactable({}));
    }
}

export = cookables;
