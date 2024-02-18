import { World, useThrottle } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Animatable, Human, LocalPlr, Plr, Renderable, Sound, Transform } from "shared/components";
import {
    CanDirectionallyMove,
    DirectionalMovement,
    Landing,
    LinearVelocity,
    PotentialDirectionalMovement,
    UsableDirectionalMovementContext,
} from "shared/components/movements";
import {
    forMovement,
    getTrackLength,
    preloadAnimations,
    resumeAnimation,
} from "shared/effects/animations";
import withAssetPrefix from "shared/calculations/withAssetPrefix";
import { isLocalPlr } from "shared/hooks/components";
import localPlr from "client/systems/localPlr";

const walkAnimId = withAssetPrefix("14213721870");
const sprintAnimId = withAssetPrefix("14207192205");
const sneakAnimId = withAssetPrefix("14215263201");
const diveAnimId = withAssetPrefix("14215257367"); //TODO: new animation
const swimAnimId = withAssetPrefix("14207199744");
const climbAnimId = withAssetPrefix("14207203133");

const footStepSoundIds = [
    withAssetPrefix("619083295"),
    withAssetPrefix("619184927"),
    withAssetPrefix("619188333"),
];

function getFootStepSoundId(): string {
    return footStepSoundIds[math.random(0, footStepSoundIds.size() - 1)];
}

function humanDirectionalMovement(w: World) {
    for (const [e, animatableRecord] of w.queryChanged(Animatable)) {
        if (!isLocalPlr(w, e)) continue;
        if (animatableRecord.new === undefined) continue;

        preloadAnimations(
            animatableRecord.new.animator,
            walkAnimId,
            sprintAnimId,
            sneakAnimId,
            diveAnimId,
            swimAnimId,
            climbAnimId,
        );
    }

    for (const [
        e,
        localPlr,
        human,
        directionalMovement,
        potentialDirectionalMovement,
        usableDirectionalMovementContext,
        _canDirectionallyMove,
    ] of w.query(
        LocalPlr,
        Human,
        DirectionalMovement,
        PotentialDirectionalMovement,
        UsableDirectionalMovementContext,
        CanDirectionallyMove,
    )) {
        const newWalkSpeed =
            potentialDirectionalMovement.type === "walk"
                ? usableDirectionalMovementContext.walk
                : potentialDirectionalMovement.type === "sprint"
                  ? usableDirectionalMovementContext.sprint
                  : potentialDirectionalMovement.type === "sneak"
                    ? usableDirectionalMovementContext.sneak
                    : potentialDirectionalMovement.type === "dive"
                      ? usableDirectionalMovementContext.dive
                      : potentialDirectionalMovement.type === "swim"
                        ? usableDirectionalMovementContext.swim
                        : potentialDirectionalMovement.type === "climb"
                          ? usableDirectionalMovementContext.climb
                          : 0;

        human.humanoid.WalkSpeed = newWalkSpeed;
        human.humanoid.Move(directionalMovement.direction, false);

        w.remove(e, Landing);

        const animator = w.get(e, Animatable)?.animator;
        if (animator) {
            if (potentialDirectionalMovement.type === "walk") {
                resumeAnimation(animator, walkAnimId, forMovement, newWalkSpeed * 0.1, true);
            } else if (potentialDirectionalMovement.type === "sprint") {
                resumeAnimation(animator, sprintAnimId, forMovement, newWalkSpeed * 0.05, true);
            } else if (potentialDirectionalMovement.type === "sneak") {
                resumeAnimation(animator, sneakAnimId, forMovement, newWalkSpeed * 0.2, true);
            } else if (potentialDirectionalMovement.type === "dive") {
                resumeAnimation(animator, diveAnimId, forMovement, newWalkSpeed * 0.1, true);
            } else if (potentialDirectionalMovement.type === "swim") {
                resumeAnimation(animator, swimAnimId, forMovement, newWalkSpeed * 0.1, true);
            } else if (potentialDirectionalMovement.type === "climb") {
                const linearVelocity = w.get(e, LinearVelocity);
                if (linearVelocity !== undefined) {
                    const climbingUp = linearVelocity.velocity.Y > 0;

                    resumeAnimation(
                        animator,
                        climbAnimId,
                        forMovement,
                        newWalkSpeed * 0.2 * (climbingUp ? 1 : -1),
                        true,
                    );
                }
            }

            const cf = w.get(e, Renderable)!.model.GetPivot();

            if (potentialDirectionalMovement.type === "walk") {
                const trackLength = getTrackLength(animator, walkAnimId);
                if (trackLength !== undefined && useThrottle(trackLength / 2, "walk")) {
                    w.spawn(
                        Sound({
                            creator: Players.LocalPlayer,
                            cf: cf,
                            audibility: 1,
                            context: { soundId: getFootStepSoundId(), speed: 1, volume: 1 },
                        }),
                    );
                }
            } else if (potentialDirectionalMovement.type === "sprint") {
                const trackLength = getTrackLength(animator, sprintAnimId);
                if (trackLength !== undefined && useThrottle(trackLength / 2, "sprint")) {
                    w.spawn(
                        Sound({
                            creator: Players.LocalPlayer,
                            cf: cf,
                            audibility: 1,
                            context: { soundId: getFootStepSoundId(), speed: 1, volume: 1 },
                        }),
                    );
                }
            }
        }

        break;
    }
}

export = humanDirectionalMovement;
