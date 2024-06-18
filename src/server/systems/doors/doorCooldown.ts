import { World } from "@rbxts/matter";
import { useChange } from "@rbxts/matter-hooks";
import { Renderable } from "shared/components";
import { CannotInteract, CannotInteractReason, DoorLike } from "shared/components/interactables";

function doorCooldown(w: World) {
    for (const [e, doorLike, renderable] of w.query(DoorLike, Renderable)) {
        if (useChange([doorLike.state], e)) {
            if (doorLike.state !== "opening" && doorLike.state !== "closing") continue;

            w.insert(
                e,
                CannotInteract({
                    reason: CannotInteractReason.cooldown({
                        startTime: doorLike.openingOrClosingStartTime,
                        duration:
                            doorLike.state === "opening"
                                ? doorLike.openDuration
                                : doorLike.closeDuration,
                    }),
                }),
            );
        }
    }

    for (const [e, cannotInteractRecord] of w.queryChanged(CannotInteract)) {
        if (!w.contains(e)) continue;

        const cannotInteract = cannotInteractRecord.old;
        if (cannotInteract === undefined) continue;
        if (cannotInteract.reason.type !== "cooldown") continue;

        const doorLike = w.get(e, DoorLike);
        if (doorLike === undefined) continue;

        const renderable = w.get(e, Renderable);
        if (renderable === undefined) continue;

        const hinge = renderable.pv.FindFirstChild("Hinge");
        if (hinge === undefined || !hinge.IsA("BasePart")) continue;

        if (doorLike.state === "opening") {
            w.insert(e, doorLike.patch({ state: "opened" }));

            const openGoalPart = renderable.pv.FindFirstChild("OpenGoal");
            if (openGoalPart === undefined || !openGoalPart.IsA("BasePart")) continue;

            hinge.PivotTo(openGoalPart.CFrame);
        } else if (doorLike.state === "closing") {
            w.insert(e, doorLike.patch({ state: "closed" }));

            const closeGoalPart = renderable.pv.FindFirstChild("CloseGoal");
            if (closeGoalPart === undefined || !closeGoalPart.IsA("BasePart")) continue;

            hinge.PivotTo(closeGoalPart.CFrame);
        }
    }
}

export = doorCooldown;
