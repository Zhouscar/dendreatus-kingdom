import { produce } from "@rbxts/immut";
import { World, useThrottle } from "@rbxts/matter";
import Sift from "@rbxts/sift";
import { LocalPlr } from "shared/components";
import { Stomach } from "shared/components/hunger";
import {
    DirectionalMovement,
    DirectionalMovementType,
    PotentialDirectionalMovement,
} from "shared/components/movements";

const MOVEMENT_TYPE_DIGEST_AMOUNT = new ReadonlyMap<DirectionalMovementType, number>([
    ["climb", 0.1],
    ["dive", 0],
    ["sneak", 0.1],
    ["sprint", 0.2],
    ["walk", 0.1],
    ["swim", 0.1],
]);

function movementDigests(w: World) {
    for (const [e, localPlr, stomach, potentialDirectionalMovement, directionalMovement] of w.query(
        LocalPlr,
        Stomach,
        PotentialDirectionalMovement,
        DirectionalMovement,
    )) {
        const newDigestAmount = MOVEMENT_TYPE_DIGEST_AMOUNT.get(potentialDirectionalMovement.type);
        if (newDigestAmount === undefined) continue;

        const prevDigestAmount = stomach.digest.get("Movement");

        if (
            prevDigestAmount === undefined ||
            (newDigestAmount > prevDigestAmount && useThrottle(0.1))
        ) {
            w.insert(
                e,
                stomach.patch({
                    digest: Sift.Dictionary.set(stomach.digest, "Movement", newDigestAmount),
                }),
            );
        }
    }
}

export = movementDigests;
