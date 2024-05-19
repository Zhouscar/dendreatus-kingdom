import { World } from "@rbxts/matter";
import { store } from "server/store";
import { CannotInteract, Harvestable } from "shared/components/interactables";
import { DroppedItem } from "shared/components/items";
import { createGuidPool } from "shared/features/guidUtils";
import { hasOpenSlot } from "shared/features/inventory/functions";
import spaceFor from "shared/features/inventory/functions/spaces/spaceFor";
import { isItemType } from "shared/features/items/types";
import { hasComponents } from "shared/hooks/components";
import { routes } from "shared/network";

function playerInteract(w: World, _: any, remoteToken: string) {
    for (const [pos, player, token, e, interactType] of routes.playerInteract.query()) {
        assert(token === remoteToken, "HAHA YOU HACKER");

        if (!w.contains(e)) continue;
        if (hasComponents(w, e, CannotInteract)) continue;

        const plr = tostring((player as Player).UserId);

        if (interactType === "harvest") {
            const harvestable = w.get(e, Harvestable);
            if (harvestable === undefined) continue;

            w.insert(
                e,
                harvestable.patch({
                    amountLeftToHarvest: harvestable.amountLeftToHarvest - 1,
                }),
            );

            const itemTypeToHarvest = harvestable.itemType;
            store.putItems(plr, itemTypeToHarvest, 1, createGuidPool(10));
        } else if (interactType === "pickup") {
            const inventory = store.getState().players.inventory[plr];
            if (inventory === undefined) continue;

            const droppedItem = w.get(e, DroppedItem);
            if (droppedItem === undefined) continue;

            if (isItemType(droppedItem.item)) {
                if (spaceFor(inventory, droppedItem.item) === 0) continue;
                store.putItems(plr, droppedItem.item, 1, createGuidPool(5));
            } else {
                if (!hasOpenSlot(inventory)) continue;
                store.insertItem(plr, droppedItem.item, createGuidPool(5));
            }

            w.despawn(e);
        }
    }
}

export = playerInteract;
