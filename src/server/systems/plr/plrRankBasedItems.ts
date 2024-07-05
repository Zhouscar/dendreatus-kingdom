import { World } from "@rbxts/matter";
import { store } from "server/store";
import { createGuidPool } from "shared/features/guidUtils";
import inventoryFunctions from "shared/features/inventory/functions";
import { RANK_BASED_ITEMS } from "shared/features/items/rankBasedItems";
import { State } from "shared/state";

function plrRankBasedItems(w: World, s: State) {
    const inventories = store.getState().players.inventory;

    s.plrGroupDatas.forEach((plrData, player) => {
        const plr = tostring(player.UserId);

        const inventory = inventories[plr];
        if (inventory === undefined) return;

        RANK_BASED_ITEMS.forEach((itemTypes, rankRange) => {
            if (rankRange.Min > plrData.rank || rankRange.Max < plrData.rank) return;

            itemTypes.forEach((itemType) => {
                if (inventoryFunctions.hasItem(inventory, itemType)) return;

                store.insertItem(
                    plr,
                    { itemType: itemType, stack: 1, soulbound: true },
                    createGuidPool(10),
                );
            });
        });
    });
}

export = plrRankBasedItems;
