import { World } from "@rbxts/matter";
import { Animatable } from "shared/components";
import { Acting, Action } from "shared/components/actions";
import { Dead } from "shared/components/health";
import { CanDirectionallyMove, Climbing, OnLand } from "shared/components/movements";
import { forAction, startAnimation } from "shared/effects/animations";
import { ITEM_CONSUMABLE_CONTEXT } from "shared/features/items/consumables";
import {
    CanUseItemFunction,
    ItemActivationCallback,
    plrCallItemActivation,
} from "shared/functions/itemFunctions";
import { hasComponents, isLocalPlr } from "shared/hooks/components";

const generalPressCallback: ItemActivationCallback = (w, e, item) => {
    const itemContext = ITEM_CONSUMABLE_CONTEXT.get(item.itemType);
    if (!itemContext) return;

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

    print(nextCosumeStage);

    const animatable = w.get(e, Animatable);
    if (animatable) {
        const animId = itemContext.stageAnimationIds[nextCosumeStage];

        startAnimation(animatable.animator, animId, forAction, 1, false);
    }

    // itemContext.sideEffects.forEach((sideEffect) => {
    // });
};

const generalCanUse: CanUseItemFunction = (w, e) => {
    return (
        hasComponents(w, e, CanDirectionallyMove, OnLand) &&
        !hasComponents(w, e, Acting, Climbing, Dead)
    );
};

const generalCallbacks = {
    press: generalPressCallback,
    canUse: generalCanUse,
};

function itemConsumable(w: World) {
    ITEM_CONSUMABLE_CONTEXT.forEach((_itemContext, itemType) => {
        plrCallItemActivation(w, itemType, generalCallbacks);
    });
}

export = itemConsumable;
