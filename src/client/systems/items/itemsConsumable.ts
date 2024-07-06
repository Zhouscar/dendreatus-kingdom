import { World } from "@rbxts/matter";
import Sift from "@rbxts/sift";
import { Animatable } from "shared/components";
import { Acting, Action } from "shared/components/actions";
import { Dead } from "shared/components/health";
import { CanDirectionallyMove, Climbing, OnLand } from "shared/components/movements";
import { startAnimation, startAnimationById } from "shared/effects/animations";
import { ITEM_CONSUMABLE_CONTEXTS } from "shared/features/items/consumables";
import {
    isItemAttackableType,
    isItemConsumableType,
    isItemType,
} from "shared/features/items/types";
import {
    CanUseItemFunction,
    ItemActivationCallback,
    plrCallItemActivation,
} from "shared/functions/itemFunctions";
import { hasComponents, hasOneOfComponents, isLocalPlr } from "shared/hooks/components";

const generalPressCallback: ItemActivationCallback = (w, e, item) => {
    if (!isItemConsumableType(item.itemType)) return;
    const itemContext = ITEM_CONSUMABLE_CONTEXTS[item.itemType];

    let nextCosumeStage = 0;
    if (item.consumeStage !== undefined) {
        nextCosumeStage = item.consumeStage + 1;
    }

    if (nextCosumeStage >= itemContext.stageAnimationIds.size()) return;

    w.insert(
        e,
        Acting({
            action: Action.consuming({
                stage: nextCosumeStage,
                item: item,
                startTime: os.clock(),
                duration: itemContext.duration,
            }),
        }),
    );

    const animatable = w.get(e, Animatable);
    if (animatable) {
        const animId = itemContext.stageAnimationIds[nextCosumeStage];

        startAnimationById(animatable.animator, animId, "Action", 1, false);
    }

    // itemContext.sideEffects.forEach((sideEffect) => {
    // });
};

const generalCanUse: CanUseItemFunction = (w, e) => {
    return (
        hasComponents(w, e, CanDirectionallyMove, OnLand) &&
        !hasOneOfComponents(w, e, Acting, Climbing, Dead)
    );
};

const generalCallbacks = {
    press: generalPressCallback,
    canUse: generalCanUse,
};

function itemConsumable(w: World) {
    Sift.Dictionary.keys(ITEM_CONSUMABLE_CONTEXTS).forEach((itemType) => {
        plrCallItemActivation(w, itemType, generalCallbacks);
    });
}

export = itemConsumable;
