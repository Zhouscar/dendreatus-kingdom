import { World, useThrottle } from "@rbxts/matter";
import Sift from "@rbxts/sift";
import { Stomach } from "shared/components/hunger";
import { Dashing } from "shared/components/movements";

const DASHING_DIGEST_AMOUNT = 0.3;

function dashDigests(w: World) {
    for (const [e, dashing] of w.queryChanged(Dashing)) {
        if (!w.contains(e)) continue;

        if (dashing.new === undefined) continue;

        const stomach = w.get(e, Stomach);
        if (!stomach) continue;

        if (!stomach.digest.has("Dash") && useThrottle(0.1)) {
            w.insert(
                e,
                stomach.patch({
                    digest: Sift.Dictionary.set(stomach.digest, "Dash", DASHING_DIGEST_AMOUNT),
                }),
            );
        }
    }
}

export = dashDigests;
