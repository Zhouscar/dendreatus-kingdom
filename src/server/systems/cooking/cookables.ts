import { World } from "@rbxts/matter";
import { CookTable, Cookable, Interactable } from "shared/components/interactables";

function cookables(w: World) {
    for (const [e, _] of w.query(CookTable).without(CookTable, Interactable)) {
        w.insert(e, Cookable({ items: [] }), Interactable({}));
    }
}

export = cookables;
