import { World } from "@rbxts/matter";
import { Interactable, Waypointer } from "shared/components/interactables";
import { State } from "shared/state";

function waypointerInteractables(w: World, s: State) {
    for (const [e, waypointer] of w.query(Waypointer).without(Interactable)) {
        w.insert(e, Interactable({}));
    }
}

export = waypointerInteractables;
