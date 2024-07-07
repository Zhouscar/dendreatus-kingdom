import { World, useDeltaTime, useThrottle } from "@rbxts/matter";
import { Animatable, Human, LocalPlr, Plr, Renderable, Sound, Transform } from "shared/components";
import {
    CanDirectionallyMove,
    DirectionalMovement,
    DirectionalMovementContext,
    Landing,
    LinearVelocity,
    PotentialDirectionalMovement,
} from "shared/components/movements";
import { resumeAnimation } from "shared/effects/animations";
import { ANIM_ALPHAS } from "shared/features/movements/animAlphas";

function humanDirectionalMovement(w: World) {
    for (const [e, localPlr, human] of w.query(LocalPlr, Human).without(DirectionalMovement)) {
        human.humanoid.WalkSpeed = 0;
    }

    for (const [
        e,
        localPlr,
        human,
        directionalMovement,
        potentialDirectionalMovement,
        directionalMovementContext,
        _,
        transform,
    ] of w.query(
        LocalPlr,
        Human,
        DirectionalMovement,
        PotentialDirectionalMovement,
        DirectionalMovementContext,
        CanDirectionallyMove,
        Transform,
    )) {
        const targetWalkSpeed =
            potentialDirectionalMovement.type === "walk"
                ? directionalMovementContext.walk
                : potentialDirectionalMovement.type === "sprint"
                  ? directionalMovementContext.sprint
                  : potentialDirectionalMovement.type === "sneak"
                    ? directionalMovementContext.sneak
                    : potentialDirectionalMovement.type === "dive"
                      ? directionalMovementContext.dive
                      : potentialDirectionalMovement.type === "swim"
                        ? directionalMovementContext.swim
                        : potentialDirectionalMovement.type === "climb"
                          ? directionalMovementContext.climb
                          : 0;

        let newWalkSpeed = human.humanoid.WalkSpeed;
        if (targetWalkSpeed > newWalkSpeed) {
            newWalkSpeed = math.min(
                newWalkSpeed + directionalMovementContext.acceleration * useDeltaTime(),
                targetWalkSpeed,
            );
        } else if (targetWalkSpeed < newWalkSpeed) {
            newWalkSpeed = math.max(
                newWalkSpeed - directionalMovementContext.decceleration * useDeltaTime(),
                targetWalkSpeed,
            );
        }

        human.humanoid.WalkSpeed = newWalkSpeed;
        human.humanoid.Move(directionalMovement.direction, false);

        w.remove(e, Landing);

        const animator = w.get(e, Animatable)?.animator;
        if (animator) {
            if (potentialDirectionalMovement.type === "walk") {
                resumeAnimation(
                    animator,
                    "walk",
                    "Movement",
                    true,
                    newWalkSpeed * ANIM_ALPHAS.walk,
                    true,
                );
            } else if (potentialDirectionalMovement.type === "sprint") {
                resumeAnimation(
                    animator,
                    "sprint",
                    "Movement",
                    true,
                    newWalkSpeed * ANIM_ALPHAS.sprint,
                    true,
                );
            } else if (potentialDirectionalMovement.type === "sneak") {
                resumeAnimation(
                    animator,
                    "sneak",
                    "Movement",
                    true,
                    newWalkSpeed * ANIM_ALPHAS.sneak,
                    true,
                );
            } else if (potentialDirectionalMovement.type === "dive") {
                resumeAnimation(
                    animator,
                    "dive",
                    "Movement",
                    true,
                    newWalkSpeed * ANIM_ALPHAS.dive,
                    true,
                );
            } else if (potentialDirectionalMovement.type === "swim") {
                resumeAnimation(
                    animator,
                    "swim",
                    "Movement",
                    true,
                    newWalkSpeed * ANIM_ALPHAS.swim,
                    true,
                );
            } else if (potentialDirectionalMovement.type === "climb") {
                const linearVelocity = w.get(e, LinearVelocity);
                if (linearVelocity !== undefined) {
                    const climbingUp = linearVelocity.velocity.Y > 0;

                    resumeAnimation(
                        animator,
                        "climb",
                        "Movement",
                        true,
                        newWalkSpeed * ANIM_ALPHAS.climb * (climbingUp ? 1 : -1),
                        true,
                    );
                }
            }
        }

        break;
    }
}

export = humanDirectionalMovement;
