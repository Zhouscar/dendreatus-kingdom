import { useLatest, useMountEffect, useUnmountEffect } from "@rbxts/pretty-roact-hooks";
import Roact from "@rbxts/roact";
import { useEffect, useState } from "@rbxts/roact-hooked";
import { RunService } from "@rbxts/services";
import useComponent from "client/apps/hooks/useComponent";
import useEventMemo from "client/apps/hooks/useEventMemo";
import useLocalPlrE from "client/apps/hooks/useLocalPlrE";
import useW from "client/apps/hooks/useW";
import useWait from "client/apps/hooks/useWait";
import { Animatable } from "shared/components";
import { Acting, Action, ShiftForward } from "shared/components/actions";
import { Dead } from "shared/components/health";
import { ActivatingItem } from "shared/components/items";
import { CanDirectionallyMove, Climbing, OnLand } from "shared/components/movements";
import { startAnimationById } from "shared/effects/animations";
import { ITEM_ATTACKABLE_CONTEXTS } from "shared/features/items/attackables";
import { ItemAttackableType } from "shared/features/items/types";
import { hasComponents, hasOneOfComponents } from "shared/hooks/components";

export default function AttackableItem(props: { itemType: ItemAttackableType }) {
    const itemType = props.itemType;

    const w = useW();
    const localPlrE = useLocalPlrE();
    const latestLocalPlrE = useLatest(localPlrE);

    const activatingItem = useComponent(localPlrE, ActivatingItem);
    const animatable = useComponent(localPlrE, Animatable);
    const acting = useComponent(localPlrE, Acting);

    const [nextStep, setNextStep] = useState(0);
    const itemContext = ITEM_ATTACKABLE_CONTEXTS[itemType];

    const canUse = useEventMemo(RunService.Heartbeat, () => {
        if (!w.contains(latestLocalPlrE.current)) return false;
        return (
            hasComponents(w, latestLocalPlrE.current, CanDirectionallyMove, OnLand) &&
            !hasOneOfComponents(w, latestLocalPlrE.current, Acting, Climbing, Dead)
        );
    });

    const timedOut = useWait(itemContext.stepTimeout, [activatingItem]);

    useEffect(() => {
        if (!timedOut) return;
        setNextStep(0);
    }, [timedOut]);

    useEffect(() => {
        if (canUse) return;
        if (acting?.action.type === "attacking" && acting.action.item.itemType === itemType) {
            w.remove(localPlrE, Acting);
        }
    }, [canUse]);

    useEffect(() => {
        if (activatingItem?.item.itemType !== itemType || !canUse) return;

        setNextStep(math.fmod(nextStep + 1, itemContext.stepAnimationIds.size()));

        w.insert(
            localPlrE,
            Acting({
                action: Action.attacking({
                    step: nextStep,
                    startTime: os.clock(),
                    duration: itemContext.cooldown,
                    item: activatingItem.item,
                }),
            }),
        );

        if (animatable !== undefined) {
            const animId = itemContext.stepAnimationIds[nextStep];

            startAnimationById(animatable.animator, animId, "Action2");
        }

        itemContext.sideEffects.forEach((sideEffect) => {
            switch (sideEffect.type) {
                case "shiftForward":
                    w.insert(
                        localPlrE,
                        ShiftForward({
                            delay: sideEffect.delay,
                            force: sideEffect.force,
                            startTime: os.clock(),
                        }),
                    );
                    break;
            }
        });
    }, [activatingItem]);

    return <></>;
}
