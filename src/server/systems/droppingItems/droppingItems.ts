import { World } from "@rbxts/matter";
import { DroppingItem } from "shared/components/items";

function droppingItems(w: World) {
    for (const [e, droppingItemRecord] of w.queryChanged(DroppingItem)) {
        if (!w.contains(e)) continue;

        const droppingItem = droppingItemRecord.new;
        if (droppingItem === undefined) return;

        //TODO: create or recreate part with trail
    }

    //TODO: collision turns into dropped item with interactable component
}

export = droppingItems;
