import { useLatest } from "@rbxts/pretty-roact-hooks";
import Roact from "@rbxts/roact";
import { useEffect, useState } from "@rbxts/roact-hooked";
import { RunService } from "@rbxts/services";
import useComponent from "client/apps/hooks/useComponent";
import useEventMemo from "client/apps/hooks/useEventMemo";
import useLocalPlrE from "client/apps/hooks/useLocalPlrE";
import useW from "client/apps/hooks/useW";
import { Animatable, Sound, Transform } from "shared/components";
import { Acting, Action } from "shared/components/actions";
import { Dead } from "shared/components/health";
import { ActivatingItem } from "shared/components/items";
import { CanDirectionallyMove, Climbing, CrashLanding, OnLand } from "shared/components/movements";
import { startAnimationById } from "shared/effects/animations";
import { ITEM_CONSUMABLE_CONTEXTS } from "shared/features/items/consumables";
import { ItemConsumableType } from "shared/features/items/types";
import { hasComponents, hasOneOfComponents } from "shared/hooks/components";
import gameTime from "shared/hooks/gameTime";

export default function ConsumableItem(props: { itemType: ItemConsumableType }) {
    const itemType = props.itemType;

    const w = useW();
    const localPlrE = useLocalPlrE();
    const latestLocalPlrE = useLatest(localPlrE);

    const activatingItem = useComponent(localPlrE, ActivatingItem);
    const animatable = useComponent(localPlrE, Animatable);
    const acting = useComponent(localPlrE, Acting);
    const transform = useComponent(localPlrE, Transform);
    const itemContext = ITEM_CONSUMABLE_CONTEXTS[itemType];

    const canUse = useEventMemo(RunService.Heartbeat, () => {
        if (!w.contains(latestLocalPlrE.current)) return false;
        return (
            hasComponents(w, latestLocalPlrE.current, OnLand) &&
            !hasOneOfComponents(w, latestLocalPlrE.current, CrashLanding, Acting, Climbing, Dead)
        );
    });

    useEffect(() => {
        if (canUse) return;
        if (acting?.action.type === "consuming" && acting.action.item.itemType === itemType) {
            w.remove(localPlrE, Acting);
        }
    }, [canUse]);

    useEffect(() => {
        if (activatingItem?.item.itemType !== itemType || !canUse) return;

        const nextStage = activatingItem.item.consumeStage ?? 0;
        if (nextStage >= itemContext.stageAnimationIds.size()) return;

        w.insert(
            localPlrE,
            Acting({
                action: Action.consuming({
                    stage: nextStage,
                    startTime: gameTime(),
                    duration: itemContext.duration,
                    item: activatingItem.item,
                }),
            }),
        );

        if (transform !== undefined) {
            w.spawn(
                Sound({ context: { soundName: itemContext.consumeSoundName }, cf: transform.cf }),
            );
        }

        if (animatable !== undefined) {
            const animId = itemContext.stageAnimationIds[nextStage];

            startAnimationById(animatable.animator, animId, "Action2", true);
        }

        // itemContext.sideEffects.forEach((sideEffect) => {});
    }, [activatingItem]);

    return <></>;
}
