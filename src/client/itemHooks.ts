import { AnyEntity, World, useDeltaTime } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import { ActivatingItem } from "shared/components/items";
import { Item, ItemType } from "shared/features/items/types";

export type UseItemEffectCallback = (
    w: World,
    plrE: AnyEntity,
    item: Item,
    duration: number,
) => void;
export type CanUseItemFunction = (w: World, plrE: AnyEntity, item: Item) => boolean;

interface Callbacks {
    press?: UseItemEffectCallback;
    hold?: UseItemEffectCallback;
    release?: UseItemEffectCallback;

    canUse: CanUseItemFunction;

    //holdForSeconds
    //doubleTap
}

export function callItemActivation(w: World, itemType: ItemType, callbacks: Callbacks) {
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

            callbacks.press(w, e, item, activatingItem.duration);
        }
        if (callbacks.release && activatingItemRecord.old === undefined) {
            const activatingItem = activatingItemRecord.new;
            if (!activatingItem) continue;

            const item = activatingItem.item;
            if (item.itemType !== itemType) continue;
            if (!callbacks.canUse(w, e, item)) continue;

            callbacks.release(w, e, item, activatingItem.duration);
        }
    }

    for (const [e, plr, activatingItem] of w.query(Plr, ActivatingItem)) {
        if (plr.player !== Players.LocalPlayer) continue;

        const item = activatingItem.item;
        if (item.itemType !== itemType) continue;

        if (!callbacks.canUse(w, e, item)) {
            if (activatingItem.duration !== 0) {
                w.insert(e, activatingItem.patch({ duration: 0 }));
            }
            continue;
        }

        w.insert(e, activatingItem.patch({ duration: activatingItem.duration + useDeltaTime() }));

        if (callbacks.hold) {
            callbacks.hold(w, e, item, activatingItem.duration);
        }
    }
}
