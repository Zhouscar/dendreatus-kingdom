import { useDeltaTime, World } from "@rbxts/matter";
import { Damage } from "shared/components/health";
import { CrashLanding } from "shared/components/movements";
import { isLocalPlr } from "shared/hooks/components";
import { State } from "shared/state";

function cameraShake(w: World, s: State) {
    s.cameraShake -= useDeltaTime() / 2;
    s.cameraShake = math.clamp(s.cameraShake, 0, 1);

    for (const [e, crashLandingRecord] of w.queryChanged(CrashLanding)) {
        if (!w.contains(e)) continue;
        if (crashLandingRecord.new === undefined) continue;
        if (!isLocalPlr(w, e)) continue;

        s.cameraShake += 0.8;
        s.cameraShake = math.clamp(s.cameraShake, 0, 1);
    }

    for (const [e, damageRecord] of w.queryChanged(Damage)) {
        print("hoo");
        if (!w.contains(e)) continue;
        if (damageRecord.new === undefined) continue;
        if (!isLocalPlr(w, e)) continue;

        if (damageRecord.new.damageType !== "physical") continue;

        s.cameraShake += 0.3;
        s.cameraShake = math.clamp(s.cameraShake, 0, 1);
    }
}

export = cameraShake;
