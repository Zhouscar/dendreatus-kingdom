import { World, useThrottle } from "@rbxts/matter";
import Sift from "@rbxts/sift";
import { Stomach } from "shared/components/hunger";
import { Jumping } from "shared/components/movements";

const JUMP_DIGEST_AMOUNT = 95;

function jumpDigests(w: World) {
    for (const [e, jumping] of w.queryChanged(Jumping)) {
        if (!w.contains(e)) continue;

        if (jumping.new === undefined) continue;

        const stomach = w.get(e, Stomach);
        if (!stomach) continue;

        if (!stomach.digest.has("Jump") && useThrottle(0.1)) {
            w.insert(
                e,
                stomach.patch({
                    digest: Sift.Dictionary.set(stomach.digest, "Jump", JUMP_DIGEST_AMOUNT),
                }),
            );
        }
    }
}

export = jumpDigests;
