import { useDeltaTime, World } from "@rbxts/matter";
import { Damage } from "shared/components/health";
import { isLocalPlr } from "shared/hooks/components";
import { State } from "shared/state";

function cameraShakeOnDamage(w: World, s: State) {
    s.cameraShake -= useDeltaTime() / 2;
    s.cameraShake = math.clamp(s.cameraShake, 0, 1);

    for (const [e, damageRecord] of w.queryChanged(Damage)) {
        if (!w.contains(e)) continue;
        if (!damageRecord.new) continue;
        if (!isLocalPlr(w, e)) continue;

        if (damageRecord.new.damageType !== "physical") continue;

        s.cameraShake += 0.3;
        s.cameraShake = math.clamp(s.cameraShake, 0, 1);
    }
}

export = cameraShakeOnDamage;
