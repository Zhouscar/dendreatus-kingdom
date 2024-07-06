import { useThrottle, World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { store } from "server/store";
import { Plr } from "shared/components";
import { Acting } from "shared/components/actions";
import { Stomach } from "shared/components/hunger";
import { Equipping } from "shared/components/items";
import { createGuidPool } from "shared/features/guidUtils";
import { ITEM_CONSUMABLE_CONTEXTS } from "shared/features/items/consumables";
import { isItemConsumableType } from "shared/features/items/types";

function itemConsumeEffects(w: World) {
    // if (useThrottle(2, "putItems")) {
    //     Players.GetPlayers().forEach((player) => {
    //         const plr = tostring(player.UserId);
    //         store.putItems(plr, "crucifix_dagger", 1, createGuidPool(10));
    //     });
    // }

    for (const [e, actingRecord] of w.queryChanged(Acting)) {
        if (!w.contains(e)) continue;
        if (actingRecord.new !== undefined) continue;

        const player = w.get(e, Plr)?.player;
        if (player === undefined) continue;

        const action = actingRecord.old?.action;
        if (action === undefined) continue;
        if (action.type !== "consuming") continue;

        if (!isItemConsumableType(action.item.itemType)) continue;
        const context = ITEM_CONSUMABLE_CONTEXTS[action.item.itemType];

        const guid = w.get(e, Equipping)?.itemGuid;
        if (guid === undefined) continue;

        // const lastStage = context.stageAnimationIds.size() - 1;
        // if (action.stage === lastStage) {
        //     store.removeItemByGuid(tostring(player.UserId), guid);
        // }

        // fill hunger
        const stomach = w.get(e, Stomach);
        if (stomach !== undefined) {
            w.insert(
                e,
                stomach.patch({
                    hunger: math.min(stomach.hunger + context.calories, stomach.capacity),
                }),
            );
        }

        store.consumeItem(tostring(player.UserId), guid);
    }
}

export = itemConsumeEffects;
