import { AnyEntity, World, useHookState } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import variantModule, { VariantOf, fields } from "@rbxts/variant";
import withAssetPrefix from "shared/calculations/withAssetPrefix";
import { Animatable, Plr } from "shared/components";
import { Acting, Action, ShiftForward, ShiftForwardData } from "shared/components/actions";
import { CanDirectionallyMove, Climbing, OnLand } from "shared/components/movements";
import { forAction, startAnimation } from "shared/effects/animations";
import { itemAttackableContexts } from "shared/features/items/attackables";
import { ItemType } from "shared/features/items/types";
import {
    CanUseItemFunction,
    ItemActivationCallback,
    plrCallItemActivation,
} from "shared/functions/itemFunctions";
import { hasComponents, isLocalPlr } from "shared/hooks/components";

const stepInfoMap: Map<string, { nextStep: number; stepEndTime: number }> = new Map();

const getStepInfoKey = (e: AnyEntity, itemType: ItemType) => `${e}-${itemType}`;

const generalPressCallBack: ItemActivationCallback = (w, e, item) => {
    const itemContext = itemAttackableContexts.get(item.itemType);
    if (!itemContext) return;

    const stepInfoKey = getStepInfoKey(e, item.itemType);

    let stepInfo = stepInfoMap.get(stepInfoKey);

    const startTime = os.clock();

    if (!stepInfo) {
        stepInfo = {
            nextStep: 0,
            stepEndTime: -1,
        };
        stepInfoMap.set(stepInfoKey, stepInfo);
    }

    let nextStep = 0;

    const stepTimeoutTime = stepInfo.stepEndTime + itemContext.stepTimeout;
    nextStep = startTime < stepTimeoutTime ? stepInfo.nextStep : 0;
    stepInfo.nextStep = math.fmod(stepInfo.nextStep + 1, itemContext.stepAnimationIds.size());

    w.insert(
        e,
        Acting({
            action: Action.attacking({
                item: item,
                step: nextStep,
                startTime: startTime,
                duration: itemContext.cooldown,
            }),
        }),
    );

    const animatable = w.get(e, Animatable);
    if (animatable) {
        const animId = itemContext.stepAnimationIds[nextStep];

        startAnimation(animatable.animator, animId, forAction, 1, false);
    }

    itemContext.sideEffects.forEach((sideEffect) => {
        switch (sideEffect.type) {
            case "shiftForward":
                w.insert(
                    e,
                    ShiftForward({
                        delay: sideEffect.delay,
                        force: sideEffect.force,
                        startTime: os.clock(),
                    }),
                );
                break;
        }
    });
};

const generalCanUse: CanUseItemFunction = (w, e) => {
    return (
        hasComponents(w, e, CanDirectionallyMove, OnLand) && !hasComponents(w, e, Acting, Climbing)
    );
};

const generalCallbacks = {
    press: generalPressCallBack,
    canUse: generalCanUse,
};

function itemsAttackable(w: World) {
    itemAttackableContexts.forEach((_itemContext, itemType) => {
        plrCallItemActivation(w, itemType, generalCallbacks);
    });

    for (const [e, actingRecord] of w.queryChanged(Acting)) {
        if (!w.contains(e)) continue;

        if (!isLocalPlr(w, e)) continue;

        if (actingRecord.new) continue;

        const acting = actingRecord.old;
        if (!acting) continue;

        const action = acting.action;
        if (action.type !== "attacking") continue;

        const stepInfo = stepInfoMap.get(getStepInfoKey(e, action.item.itemType));
        if (!stepInfo) continue;

        stepInfo.stepEndTime = os.clock();
    }
}

export = itemsAttackable;
