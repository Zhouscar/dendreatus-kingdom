import { AnyEntity, Entity, World } from "@rbxts/matter";
import { Plr, Sound } from "shared/components";
import { network } from "shared/network";

function playerPlaySound(w: World) {
    network.playerPlaySound.connect((player, audibility, soundContext, cf) => {
        let plrE: AnyEntity | undefined = undefined;
        for (const [e, plr] of w.query(Plr)) {
            if (plr.player !== player) continue;
            plrE = e;
        }
        if (plrE === undefined) return;

        w.spawn(Sound({ creator: player, audibility: audibility, context: soundContext, cf: cf }));
    });
}

export = playerPlaySound;
