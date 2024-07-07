import { World } from "@rbxts/matter";
import { Animatable, LocalPlr } from "shared/components";
import { Dead } from "shared/components/health";
import { EquippingItem } from "shared/components/items";
import {
    Climbing,
    CrashLanding,
    Dashing,
    DirectionalMovement,
    Landing,
    OnLand,
    Sitting,
    Sneaking,
} from "shared/components/movements";
import { resumeAnimation, stopAnimation } from "shared/effects/animations";
import { ItemType } from "shared/features/items/types";
import { hasComponents, hasOneOfComponents } from "shared/hooks/components";

const HOLD_ITEM_TYPES: ItemType[] = [
    "mushroom_soup",
    "survivor_lantern",
    "noble_lantern",
    "ritualist_candle",
    "royal_lantern",
    "owner_lantern",
];
const CARRY_ITEM_TYPES: ItemType[] = ["sword", "scrap_blade", "spikeball"];

function humanHoldItemAnim(w: World) {
    for (const [e, localPlr, animatable, _onLand] of w.query(LocalPlr, Animatable, OnLand)) {
        if (
            !hasComponents(w, e, EquippingItem) ||
            hasOneOfComponents(w, e, Climbing, Dashing, CrashLanding, Landing, Dead, Sitting)
        ) {
            stopAnimation(animatable.animator, "holdItem");
            stopAnimation(animatable.animator, "carryItem");
            continue;
        }

        const itemType = w.get(e, EquippingItem)!.item.itemType;
        if (HOLD_ITEM_TYPES.includes(itemType)) {
            resumeAnimation(animatable.animator, "holdItem", "Action");
        } else if (CARRY_ITEM_TYPES.includes(itemType)) {
            resumeAnimation(animatable.animator, "carryItem", "Action");
        } else {
            stopAnimation(animatable.animator, "holdItem");
            stopAnimation(animatable.animator, "carryItem");
        }
    }
}

export = humanHoldItemAnim;
