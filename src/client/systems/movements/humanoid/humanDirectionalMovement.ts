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
import { getTrackLength, resumeAnimation } from "shared/effects/animations";
import { SoundName } from "shared/features/ids/sounds";
import { randomChoice } from "shared/calculations/random";

function getFootStepSoundName(): SoundName {
    return randomChoice("footStep1", "footStep2", "footStep3");
}

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
                resumeAnimation(animator, "walk", "Movement", newWalkSpeed * 0.15, true);
            } else if (potentialDirectionalMovement.type === "sprint") {
                resumeAnimation(animator, "sprint", "Movement", newWalkSpeed * 0.05, true);
            } else if (potentialDirectionalMovement.type === "sneak") {
                resumeAnimation(animator, "sneak", "Movement", newWalkSpeed * 0.2, true);
            } else if (potentialDirectionalMovement.type === "dive") {
                resumeAnimation(animator, "dive", "Movement", newWalkSpeed * 0.1, true);
            } else if (potentialDirectionalMovement.type === "swim") {
                resumeAnimation(animator, "swim", "Movement", newWalkSpeed * 0.1, true);
            } else if (potentialDirectionalMovement.type === "climb") {
                const linearVelocity = w.get(e, LinearVelocity);
                if (linearVelocity !== undefined) {
                    const climbingUp = linearVelocity.velocity.Y > 0;

                    resumeAnimation(
                        animator,
                        "climb",
                        "Movement",
                        newWalkSpeed * 0.2 * (climbingUp ? 1 : -1),
                        true,
                    );
                }
            }

            const cf = transform.cf;

            if (potentialDirectionalMovement.type === "walk") {
                const trackLength = getTrackLength(animator, "walk");
                if (trackLength !== undefined && useThrottle(trackLength / 2, "walk")) {
                    w.spawn(
                        Sound({
                            cf: cf,
                            audibility: 1,
                            context: { soundName: getFootStepSoundName(), speed: 1, volume: 1 },
                        }),
                    );
                }
            } else if (potentialDirectionalMovement.type === "sprint") {
                const trackLength = getTrackLength(animator, "sprint");
                if (trackLength !== undefined && useThrottle(trackLength / 2, "sprint")) {
                    w.spawn(
                        Sound({
                            cf: cf,
                            audibility: 1,
                            context: { soundName: getFootStepSoundName(), speed: 1, volume: 1 },
                        }),
                    );
                }
            }
        }

        break;
    }
}

export = humanDirectionalMovement;
