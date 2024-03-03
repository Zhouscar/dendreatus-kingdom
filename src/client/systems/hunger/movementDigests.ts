import { produce } from "@rbxts/immut";
import { World } from "@rbxts/matter";
import Sift from "@rbxts/sift";
import { Stomach } from "shared/components/hunger";
import {
    DirectionalMovement,
    DirectionalMovementType,
    PotentialDirectionalMovement,
} from "shared/components/movements";
import { network } from "shared/network";

const MOVEMENT_TYPE_DIGEST_AMOUNT = new ReadonlyMap<DirectionalMovementType, number>([
    ["climb", 0.1],
    ["dive", 0],
    ["sneak", 0.1],
    ["sprint", 0.2],
    ["walk", 0.1],
    ["swim", 0.1],
]);

function movementDigests(w: World) {
    for (const [e, stomach, potentialDirectionalMovement, directionalMovement] of w.query(
        Stomach,
        PotentialDirectionalMovement,
        DirectionalMovement,
    )) {
        const newDigestAmount = MOVEMENT_TYPE_DIGEST_AMOUNT.get(potentialDirectionalMovement.type);
        if (newDigestAmount === undefined) continue;

        const prevDigestAmount = stomach.digest.get("Movement");

        if (prevDigestAmount === undefined || newDigestAmount > prevDigestAmount) {
            network.ecs.playerDigest.fire("Movement", newDigestAmount);
            // w.insert(
            //     e,
            //     stomach.patch({
            //         digest: Sift.Dictionary.set(stomach.digest, "Movement", newDigestAmount),
            //     }),
            // );
        }
    }
}

export = movementDigests;
