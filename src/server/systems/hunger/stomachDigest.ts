import { World, useThrottle } from "@rbxts/matter";
import { Stomach } from "shared/components/hunger";

const DIGEST_THROTTLE = 0.2;

function stomachDigest(w: World) {
    if (!useThrottle(DIGEST_THROTTLE)) return;

    for (const [e, stomach, digesting] of w.query(Stomach)) {
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
