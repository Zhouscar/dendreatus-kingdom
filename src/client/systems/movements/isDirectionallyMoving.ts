import { World } from "@rbxts/matter";
import { Animatable } from "shared/components";
import {
    DirectionalMovement,
    IsDirectionallyMoving,
    OnLand,
    PotentialDirectionalMovement,
} from "shared/components/movements";
import { getTrackLength } from "shared/effects/animations";

function isDirectionallyMoving(w: World) {
    for (const [e, potentialDirectionalMovement, animatable] of w.query(
        PotentialDirectionalMovement,
        Animatable,
    )) {
        const directionalMovement = w.get(e, DirectionalMovement);
        if (directionalMovement === undefined) {
            w.remove(e, IsDirectionallyMoving);
            continue;
        }

        const trackLength = getTrackLength(animatable.animator, potentialDirectionalMovement.type);

        w.insert(e, IsDirectionallyMoving({ animTrackLength: trackLength ?? math.huge }));
    }
}

export = isDirectionallyMoving;
