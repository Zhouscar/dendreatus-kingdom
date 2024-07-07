import { World } from "@rbxts/matter";
import { useChange } from "@rbxts/matter-hooks";
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
import { resumeAnimation, startAnimation, stopAnimation } from "shared/effects/animations";
import { ItemType } from "shared/features/items/types";
import { hasComponents, hasOneOfComponents } from "shared/hooks/components";

const TAKEOUT_LANTERN_TYPES: ItemType[] = [
    "survivor_lantern",
    "noble_lantern",
    "royal_lantern",
    "owner_lantern",
];
const TAKEOUT_SWORD_TYPES: ItemType[] = ["sword", "scrap_blade", "spikeball"];

function humanTakeOutItemAnim(w: World) {
    for (const [e, localPlr, animatable] of w.query(LocalPlr, Animatable)) {
        const itemType = w.get(e, EquippingItem)?.item.itemType;

        if (!useChange([itemType ?? ""], e)) continue;

        if (
            hasOneOfComponents(w, e, Climbing, Dashing, CrashLanding, Dead) ||
            !hasComponents(w, e, OnLand)
        )
            continue;

        if (itemType !== undefined && TAKEOUT_LANTERN_TYPES.includes(itemType)) {
            startAnimation(animatable.animator, "takeOutLantern", "Action2", true);
        } else if (itemType !== undefined && TAKEOUT_SWORD_TYPES.includes(itemType)) {
            startAnimation(animatable.animator, "takeOutSword", "Action2", true);
        } else if (itemType !== undefined) {
            startAnimation(animatable.animator, "takeOutItem", "Action2", true);
        } else {
            stopAnimation(animatable.animator, "takeOutLantern");
            stopAnimation(animatable.animator, "takeOutSword");
            stopAnimation(animatable.animator, "takeOutItem");
        }
    }
}

export = humanTakeOutItemAnim;
