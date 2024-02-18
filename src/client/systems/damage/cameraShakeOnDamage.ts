import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { store } from "client/store";
import { Plr } from "shared/components";
import { Damage } from "shared/components/health";
import { isLocalPlr } from "shared/hooks/components";
import { State } from "shared/state";

const shakeIntensity = 0.5;

function cameraShakeOnDamage(w: World, s: State) {
    for (const [e, damageRecord] of w.queryChanged(Damage)) {
        if (!w.contains(e)) continue;
        if (!isLocalPlr(w, e)) continue;

        store.shakeCamera(shakeIntensity, os.clock());
    }
}

export = cameraShakeOnDamage;
