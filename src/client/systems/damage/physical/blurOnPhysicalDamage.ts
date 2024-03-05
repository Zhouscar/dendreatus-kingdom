import { Make } from "@rbxts/altmake";
import { World, useDeltaTime } from "@rbxts/matter";
import { Lighting, Players, Workspace } from "@rbxts/services";
import { Plr } from "shared/components";
import { Damage } from "shared/components/health";
import { isLocalPlr } from "shared/hooks/components";

const DECAY_ALPHA = 50;

const blurEffect = Make("BlurEffect", {
    Size: 0,
    Name: "DamageBlur",
    Parent: Lighting,
});

function blurOnDamage(w: World) {
    blurEffect.Size = math.max(0, blurEffect.Size - useDeltaTime() * DECAY_ALPHA);

    for (const [e, damageRecord] of w.queryChanged(Damage)) {
        if (!w.contains(e)) continue;
        if (!damageRecord.new) continue;

        if (!isLocalPlr(w, e)) continue;

        if (damageRecord.new.damageType !== "physical") continue;

        blurEffect.Size = 10;

        break;
    }
}

export = blurOnDamage;
