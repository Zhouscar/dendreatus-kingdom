import { World } from "@rbxts/matter";
import Sift from "@rbxts/sift";
import { findPlrE } from "shared/calculations/findEntity";
import { Stomach } from "shared/components/hunger";
import { network } from "shared/network";

function playerDigests(w: World) {
    network.ecs.playerDigest.connect((player, digestType, newDigestAmount) => {
        const plrE = findPlrE(w, player);
        if (plrE === undefined) return;

        const stomach = w.get(plrE, Stomach);
        if (!stomach) return;

        const prevDigestAmount = stomach.digest.get(digestType);
        if (prevDigestAmount === undefined || newDigestAmount > prevDigestAmount) {
            w.insert(
                plrE,
                stomach.patch({
                    digest: Sift.Dictionary.set(stomach.digest, digestType, newDigestAmount),
                }),
            );
        }
    });
}

export = playerDigests;
