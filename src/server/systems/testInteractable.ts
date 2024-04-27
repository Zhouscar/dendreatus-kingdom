import { World } from "@rbxts/matter";
import { Interactable, TestInteractable } from "shared/components/interactables";

function testInteractable(w: World) {
    for (const [e] of w.query(TestInteractable).without(Interactable)) {
        w.insert(e, Interactable({}));
    }
}

export = testInteractable;
