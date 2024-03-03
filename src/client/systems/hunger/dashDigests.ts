import { World } from "@rbxts/matter";
import Sift from "@rbxts/sift";
import { Stomach } from "shared/components/hunger";
import { Dashing } from "shared/components/movements";
import { isLocalPlr } from "shared/hooks/components";
import { network } from "shared/network";

const DASHING_DIGEST_AMOUNT = 0.3;

function dashDigests(w: World) {
    for (const [e, dashing] of w.queryChanged(Dashing)) {
        if (!w.contains(e)) continue;
        if (!isLocalPlr(w, e)) continue;

        if (dashing.new === undefined) continue;

        const stomach = w.get(e, Stomach);
        if (!stomach) continue;

        if (!stomach.digest.has("Dash")) {
            network.ecs.playerDigest.fire("Dash", DASHING_DIGEST_AMOUNT);
            // w.insert(
            //     e,
            //     stomach.patch({
            //         digest: Sift.Dictionary.set(stomach.digest, "Dash", DASHING_DIGEST_AMOUNT),
            //     }),
            // );
        }
    }
}

export = dashDigests;
