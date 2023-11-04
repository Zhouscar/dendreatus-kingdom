import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr, Renderable } from "shared/components";
import { Damage, Health } from "shared/components/health";
import { bleed } from "shared/effects/blood";
import { hasComponents } from "shared/hooks/components";
import { State } from "shared/state";

const BLEED_RANGE_THRESHOLD = 100;

function bloodSplatterOnDamage(w: World, s: State) {
    let characterPosition: Vector3 | undefined = undefined;

    for (const [e, plr, renderable] of w.query(Plr, Renderable)) {
        if (plr.player !== Players.LocalPlayer) continue;

        characterPosition = renderable.model.GetPivot().Position;
    }

    if (!characterPosition) return;

    for (const [e, damageRecord] of w.queryChanged(Damage)) {
        if (!w.contains(e)) continue;

        if (!hasComponents(w, e, Health)) continue;

        const model = w.get(e, Renderable)?.model;
        if (!model) continue;

        const position = model.GetPivot().Position;
        if (characterPosition.sub(position).Magnitude > BLEED_RANGE_THRESHOLD) continue;

        bleed(s, model, 10, 20, 10, 5, position);
    }
}

export = bloodSplatterOnDamage;
