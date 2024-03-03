import { World, useThrottle } from "@rbxts/matter";
import Sift from "@rbxts/sift";
import { Stomach } from "shared/components/hunger";
import { Jumping } from "shared/components/movements";
import { isLocalPlr } from "shared/hooks/components";
import { network } from "shared/network";

const JUMP_DIGEST_AMOUNT = 0.3;

function jumpDigests(w: World) {
    for (const [e, jumping] of w.queryChanged(Jumping)) {
        if (!w.contains(e)) continue;
        if (!isLocalPlr(w, e)) continue;

        if (jumping.new === undefined) continue;

        const stomach = w.get(e, Stomach);
        if (!stomach) continue;

        if (!stomach.digest.has("Jump") && useThrottle(0.1)) {
            network.ecs.playerDigest.fire("Jump", JUMP_DIGEST_AMOUNT);
            // w.insert(
            //     e,
            //     stomach.patch({
            //         digest: Sift.Dictionary.set(stomach.digest, "Jump", JUMP_DIGEST_AMOUNT),
            //     }),
            // );
        }
    }
}

export = jumpDigests;
