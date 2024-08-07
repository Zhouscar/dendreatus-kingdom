import { World } from "@rbxts/matter";
import { Animatable, LocalPlr, Plr } from "shared/components";
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
import { hasComponents, hasOneOfComponents } from "shared/hooks/components";
import { Dead } from "shared/components/health";
import { EquippingItem } from "shared/components/items";

function humanDaggerIdleAnim(w: World) {
    for (const [e, localPlr, animatable] of w.query(LocalPlr, Animatable)) {
        if (
            hasComponents(w, e, EquippingItem, OnLand) &&
            w.get(e, EquippingItem)!.item.itemType === "crucifix_dagger" &&
            !hasOneOfComponents(
                w,
                e,
                Climbing,
                DirectionalMovement,
                Dashing,
                CrashLanding,
                Landing,
                Dead,
                Sitting,
            )
        ) {
            resumeAnimation(animatable.animator, "daggerIdle", "Action", true, 0, true);
        } else {
            stopAnimation(animatable.animator, "daggerIdle");
        }
    }
}

export = humanDaggerIdleAnim;
