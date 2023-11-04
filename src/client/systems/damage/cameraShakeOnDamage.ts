import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import { Damage } from "shared/components/health";
import { State } from "shared/state";

const shakeIntensity = 0.5;

function cameraShakeOnDamage(w: World, s: State) {
    for (const [e, damageRecord] of w.queryChanged(Damage)) {
        if (!w.contains(e)) continue;

        const plr = w.get(e, Plr);
        if (plr?.player !== Players.LocalPlayer) continue;

        s.cameraShake = math.max(s.cameraShake, shakeIntensity);
    }
}

export = cameraShakeOnDamage;
