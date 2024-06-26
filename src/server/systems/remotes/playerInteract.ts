import { produce } from "@rbxts/immut";
import { World } from "@rbxts/matter";
import { store } from "server/store";
import { findPlrE } from "shared/calculations/findEntity";
import {
    CannotInteract,
    Cookable,
    Craftable,
    Harvestable,
    Interacted,
} from "shared/components/interactables";
import { DroppedItem, Equipping } from "shared/components/items";
import { createGuidPool, newGuid } from "shared/features/guidUtils";
import { hasOpenSlot } from "shared/features/inventory/functions";
import spaceFor from "shared/features/inventory/functions/spaces/spaceFor";
import { isItemType } from "shared/features/items/types";
import { hasComponents } from "shared/hooks/components";
import { useTestLog } from "shared/hooks/debug";

function playerInteract(w: World, _: any) {
    for (const [e, interactedRecord] of w.queryChanged(Interacted)) {
        if (!w.contains(e)) continue;

        const interacted = interactedRecord.new;
        if (interacted === undefined) continue;

        const player = interacted.player;
        const interactType = interacted.interactType;

        const plrE = findPlrE(w, player);

        if (plrE === undefined) continue;
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
        } else if (interactType === "place_item") {
            const equipping = w.get(plrE, Equipping);
            if (equipping === undefined) continue;

            const inventory = store.getState().players.inventory[plr];
            if (inventory === undefined) continue;

            const item = inventory.items.get(equipping.itemGuid);
            if (item === undefined) continue;

            const itemWithOneStack = produce(item, (draft) => {
                draft.stack = 1;
            });

            let putItem = false;

            store.takeItemAtGuid(plr, equipping.itemGuid, 1);

            const cookable = w.get(e, Cookable);
            const craftable = w.get(e, Craftable);
            if (cookable !== undefined) {
                const newItems = produce(cookable.items, (draft) => {
                    draft.forEach((container) => {
                        if (putItem) return;
                        if (container.item === undefined) {
                            container.item = itemWithOneStack;
                            putItem = true;
                        }
                    });
                });

                if (!putItem) continue;

                w.insert(e, cookable.patch({ items: newItems }));
            } else if (craftable !== undefined) {
                const newItems = produce(craftable.items, (draft) => {
                    draft.forEach((container) => {
                        if (putItem) return;
                        if (container.item === undefined) {
                            container.item = itemWithOneStack;
                            putItem = true;
                        }
                    });
                });

                if (!putItem) continue;

                w.insert(e, craftable.patch({ items: newItems }));
            }
        } else if (interactType === "cook") {
            const cookable = w.get(e, Cookable);
            if (cookable === undefined) continue;
        }
    }
}

export = playerInteract;
