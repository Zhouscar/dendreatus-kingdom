import { AnyEntity, World, useDeltaTime } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import { ActivatingItem } from "shared/components/items";
import { Item, ItemType } from "shared/features/items/types";

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

        const plr = w.get(e, Plr);
        if (plr?.player !== Players.LocalPlayer) continue;

        if (callbacks.press && activatingItemRecord.new === undefined) {
            const activatingItem = activatingItemRecord.old;
            if (!activatingItem) continue;

            const item = activatingItem.item;
            if (item.itemType !== itemType) continue;
            if (!callbacks.canUse(w, e, item)) continue;

            callbacks.press(w, e, item, activatingItem.elapsed);
        }
        if (callbacks.release && activatingItemRecord.old === undefined) {
            const activatingItem = activatingItemRecord.new;
            if (!activatingItem) continue;

            const item = activatingItem.item;
            if (item.itemType !== itemType) continue;
            if (!callbacks.canUse(w, e, item)) continue;

            callbacks.release(w, e, item, activatingItem.elapsed);
        }
    }

    for (const [e, plr, activatingItem] of w.query(Plr, ActivatingItem)) {
        if (plr.player !== Players.LocalPlayer) continue;

        const item = activatingItem.item;
        if (item.itemType !== itemType) continue;

        if (!callbacks.canUse(w, e, item)) {
            if (activatingItem.elapsed !== 0) {
                w.insert(e, activatingItem.patch({ elapsed: 0 }));
            }
            continue;
        }

        w.insert(e, activatingItem.patch({ elapsed: activatingItem.elapsed + useDeltaTime() }));

        if (callbacks.hold) {
            callbacks.hold(w, e, item, activatingItem.elapsed);
        }
    }
}
