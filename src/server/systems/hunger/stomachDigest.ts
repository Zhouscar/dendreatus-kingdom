import { World, useThrottle } from "@rbxts/matter";
import { Dead } from "shared/components/health";
import { Stomach } from "shared/components/hunger";

const DIGEST_THROTTLE = 0.2;

function stomachDigest(w: World) {
    if (!useThrottle(DIGEST_THROTTLE)) return;

    for (const [e, stomach] of w.query(Stomach).without(Dead)) {
        print("Digesting");
        print(stomach.digest);

        let amountToDigest = 0;
        stomach.digest.forEach((amount) => {
            amountToDigest += amount;
        });

        w.insert(
            e,
            stomach.patch({
                digest: new Map(),
                hunger: math.max(0, stomach.hunger - amountToDigest),
            }),
        );
    }
}

export = stomachDigest;
