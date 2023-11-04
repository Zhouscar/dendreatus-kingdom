import { World, useDeltaTime } from "@rbxts/matter";
import { Lighting, Players, Workspace } from "@rbxts/services";
import { Plr } from "shared/components";
import { Damage } from "shared/components/health";

const DECAY_ALPHA = 50;

const blurEffect = new Instance("BlurEffect");
blurEffect.Size = 0;
blurEffect.Name = "DamageBlur";
blurEffect.Parent = Lighting;

function blurOnDamage(w: World) {
    blurEffect.Size = math.max(0, blurEffect.Size - useDeltaTime() * DECAY_ALPHA);

    for (const [e, damageRecord] of w.queryChanged(Damage)) {
        if (!w.contains(e)) continue;

        const plr = w.get(e, Plr);
        if (plr?.player !== Players.LocalPlayer) continue;

        blurEffect.Size = 10;

        break;
    }
}

export = blurOnDamage;
