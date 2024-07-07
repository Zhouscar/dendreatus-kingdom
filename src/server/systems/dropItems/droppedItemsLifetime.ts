import { World } from "@rbxts/matter";
import { DroppedItem } from "shared/components/items";

const LIFE_TIME = 60;

function droppedItemsLifetime(w: World) {
    for (const [e, droppedItem] of w.query(DroppedItem)) {
        const elapsed = tick() - droppedItem.droppedTime;
        if (elapsed >= LIFE_TIME) {
            w.despawn(e);
        }
    }
}

export = droppedItemsLifetime;
