import { World, useThrottle } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Animatable, Human, Plr, Renderable, Sound, Transform } from "shared/components";
import {
    CanDirectionallyMove,
    DirectionalMovement,
    Landing,
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

const walkAnimId = withAssetPrefix("14213721870");
const sprintAnimId = withAssetPrefix("14207192205");
const sneakAnimId = withAssetPrefix("14215263201");
const diveAnimId = withAssetPrefix("14215257367"); //TODO: new animation
const swimAnimId = withAssetPrefix("14207199744");

const footStepSoundId = withAssetPrefix("5761648082");

function humanDirectionalMovement(w: World) {
    for (const [e, animatableRecord] of w.queryChanged(Animatable)) {
        const plr = w.get(e, Plr);
        if (plr?.player !== Players.LocalPlayer) continue;
        if (animatableRecord.new === undefined) continue;

        preloadAnimations(
            animatableRecord.new.animator,
            walkAnimId,
            sprintAnimId,
            sneakAnimId,
            diveAnimId,
            swimAnimId,
        );
    }

    for (const [
        e,
        plr,
        human,
        directionalMovement,
        potentialDirectionalMovement,
        usableDirectionalMovementContext,
        _canDirectionallyMove,
    ] of w.query(
        Plr,
        Human,
        DirectionalMovement,
        PotentialDirectionalMovement,
        UsableDirectionalMovementContext,
        CanDirectionallyMove,
    )) {
        if (plr.player !== Players.LocalPlayer) continue;
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
                            context: { soundId: footStepSoundId, speed: 1, volume: 1 },
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
                            context: { soundId: footStepSoundId, speed: 1, volume: 1 },
                        }),
                    );
                }
            }
        }

        break;
    }
}

export = humanDirectionalMovement;
