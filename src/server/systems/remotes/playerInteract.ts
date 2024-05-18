import { World } from "@rbxts/matter";
import { store } from "server/store";
import { CannotInteract, Harvestable } from "shared/components/interactables";
import { createGuidPool } from "shared/features/guidUtils";
import { hasComponents } from "shared/hooks/components";
import { routes } from "shared/network";

function playerInteract(w: World, _: any, remoteToken: string) {
    for (const [pos, player, token, e, interactType] of routes.playerInteract.query()) {
        assert(token === remoteToken, "HAHA YOU HACKER");

        if (!w.contains(e)) continue;
        if (hasComponents(w, e, CannotInteract)) continue;

        // dropped item pickup
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
            store.putItems(
                tostring((player as Player).UserId),
                itemTypeToHarvest,
                1,
                createGuidPool(10),
            );
        }
    }
}

export = playerInteract;
