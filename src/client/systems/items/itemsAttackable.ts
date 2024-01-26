import { AnyEntity, World, useHookState } from "@rbxts/matter";
import { useMap } from "@rbxts/matter-hooks";
import { ComponentCtor } from "@rbxts/matter/lib/component";
import { start } from "@rbxts/plasma/src/Runtime";
import { Players } from "@rbxts/services";
import variantModule, { VariantOf, fields } from "@rbxts/variant";
import withAssetPrefix from "shared/calculations/withAssetPrefix";
import { Animatable, Plr } from "shared/components";
import { Acting, Action, ShiftForward, ShiftForwardData } from "shared/components/actions";
import { ActivatingItem } from "shared/components/items";
import {
    CanDirectionallyMove,
    CrashLanding,
    Dashing,
    Falling,
    Jumping,
    OnLand,
} from "shared/components/movements";
import { forAction, startAnimation } from "shared/effects/animations";
import { ItemType } from "shared/features/items/types";
import {
    CanUseItemFunction,
    ItemActivationCallback,
    plrCallItemActivation,
} from "shared/functions/itemFunctions";
import { hasComponents, hasOneOfComponents } from "shared/hooks/components";
import { ComponentRecord } from "type";

const ItemAttackSideEffect = variantModule({
    shiftForward: fields<ShiftForwardData>(),
});

type ItemAttackSideEffect = VariantOf<typeof ItemAttackSideEffect>;

type ItemContext = {
    damage: number;
    cooldown: number;
    stepTimeout: number;
    stepAnimationIds: string[];
    sideEffects: ItemAttackSideEffect[];
};

const contexts: Map<ItemType, ItemContext> = new Map([
    [
        "crucifix_dagger",
        {
            damage: 10,
            cooldown: 0.5,
            stepTimeout: 0.5,
            stepAnimationIds: [withAssetPrefix("16103969460"), withAssetPrefix("16103898485")],
            sideEffects: [ItemAttackSideEffect.shiftForward({ force: 20 })],
        },
    ],
]);

const stepInfoMap: Map<string, { nextStep: number; stepEndTime: number }> = new Map();

const getStepInfoKey = (e: AnyEntity, itemType: ItemType) => `${e}-${itemType}`;

const generalPressCallBack: ItemActivationCallback = (w, e, item) => {
    const itemContext = contexts.get(item.itemType);
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

    print({
        item: item,
        step: nextStep,
        startTime: startTime,
        duration: itemContext.cooldown,
    });

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

    // TODO: client cast (very hard)
};

const generalCanUse: CanUseItemFunction = (w, e) => {
    return hasComponents(w, e, CanDirectionallyMove, OnLand) && !hasComponents(w, e, Acting);
};

const generalCallbacks = {
    press: generalPressCallBack,
    canUse: generalCanUse,
};

function itemsAttackable(w: World) {
    contexts.forEach((_itemContext, itemType) => {
        plrCallItemActivation(w, itemType, generalCallbacks);
    });

    for (const [e, actingRecord] of w.queryChanged(Acting)) {
        if (!w.contains(e)) continue;

        const plr = w.get(e, Plr);
        if (plr?.player !== Players.LocalPlayer) continue;

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
