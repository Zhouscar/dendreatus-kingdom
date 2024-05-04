import { AnyEntity, World, useDeltaTime } from "@rbxts/matter";
import { Players, RunService } from "@rbxts/services";
import { Plr } from "shared/components";
import { ActivatingItem } from "shared/components/items";
import { Item, ItemType } from "shared/features/items/types";
import { isLocalPlr } from "shared/hooks/components";
import { HOST } from "shared/host";

export type ItemActivationCallback = (
    w: World,
    plrE: AnyEntity,
    item: Item,
    elapsed: number,
) => void;
export type CanUseItemFunction = (w: World, plrE: AnyEntity, item: Item) => boolean;

interface Callbacks {
    press?: ItemActivationCallback;
    hold?: ItemActivationCallback;
    release?: ItemActivationCallback;

    canUse: CanUseItemFunction;

    //holdForSeconds
    //doubleTap
}

export function plrCallItemActivation(w: World, itemType: ItemType, callbacks: Callbacks) {
    for (const [e, activatingItemRecord] of w.queryChanged(ActivatingItem)) {
        if (!w.contains(e)) continue;

        if (HOST === "CLIENT" && !isLocalPlr(w, e)) continue;

        if (callbacks.press && activatingItemRecord.new === undefined) {
            const activatingItem = activatingItemRecord.old;
            if (!activatingItem) continue;

            const item = activatingItem.item;
            if (item.itemType !== itemType) continue;
            if (!callbacks.canUse(w, e, item)) continue;
            if (activatingItem.startTime === "temporarily_disabled") continue;

            const elapsed = tick() - activatingItem.startTime;
            callbacks.press(w, e, item, elapsed);
        }
        if (callbacks.release && activatingItemRecord.old === undefined) {
            const activatingItem = activatingItemRecord.new;
            if (!activatingItem) continue;

            const item = activatingItem.item;
            if (item.itemType !== itemType) continue;
            if (!callbacks.canUse(w, e, item)) continue;
            if (activatingItem.startTime === "temporarily_disabled") continue;

            const elapsed = tick() - activatingItem.startTime;
            callbacks.release(w, e, item, elapsed);
        }
    }

    for (const [e, plr, activatingItem] of w.query(Plr, ActivatingItem)) {
        if (plr.player !== Players.LocalPlayer) continue;

        const item = activatingItem.item;
        if (item.itemType !== itemType) continue;

        if (callbacks.canUse(w, e, item)) {
            if (activatingItem.startTime === "temporarily_disabled") {
                w.insert(e, activatingItem.patch({ startTime: tick() }));
            }
        } else {
            if (activatingItem.startTime !== "temporarily_disabled") {
                w.insert(e, activatingItem.patch({ startTime: "temporarily_disabled" }));
            }
            continue;
        }

        if (activatingItem.startTime === "temporarily_disabled") continue;
        const elapsed = tick() - activatingItem.startTime;

        if (callbacks.hold) {
            callbacks.hold(w, e, item, elapsed);
        }
    }
}
