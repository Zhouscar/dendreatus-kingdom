import { useDeltaTime, World } from "@rbxts/matter";
import { useChange } from "@rbxts/matter-hooks";
import { Damage } from "shared/components/health";
import { CrashLanding } from "shared/components/movements";
import { adjustBlur } from "shared/effects/lightings";
import { isLocalPlr } from "shared/hooks/components";
import { State } from "shared/state";

function trauma(w: World, s: State) {
    s.trauma -= useDeltaTime() / 1.5;
    s.trauma = math.clamp(s.trauma, 0, 1);

    if (useChange([s.trauma])) {
        print(s.trauma);
        adjustBlur("TraumaBlur", s.trauma * 100);
    }

    for (const [e, crashLandingRecord] of w.queryChanged(CrashLanding)) {
        if (!w.contains(e)) continue;
        if (crashLandingRecord.new === undefined) continue;
        if (!isLocalPlr(w, e)) continue;

        s.trauma += 0.8;
        s.trauma = math.clamp(s.trauma, 0, 1);
    }

    for (const [e, damageRecord] of w.queryChanged(Damage)) {
        if (!w.contains(e)) continue;
        if (damageRecord.new === undefined) continue;
        if (!isLocalPlr(w, e)) continue;

        if (damageRecord.new.damageType !== "physical") continue;

        s.trauma += 0.3;
        s.trauma = math.clamp(s.trauma, 0, 1);
    }
}

export = trauma;
