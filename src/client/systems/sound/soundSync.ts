import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Sound } from "shared/components";
import { network } from "shared/network";

function soundSync(w: World) {
    for (const [e, sound] of w.query(Sound)) {
        if (sound.creator !== Players.LocalPlayer) continue;

        network.playerPlaySound.fire(sound.audibility, sound.context, sound.cf);
    }
}

export = soundSync;
