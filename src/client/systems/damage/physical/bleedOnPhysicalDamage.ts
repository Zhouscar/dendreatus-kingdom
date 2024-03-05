import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { LocalPlr, Plr, Renderable } from "shared/components";
import { Damage, Health } from "shared/components/health";
import { bleed } from "shared/effects/blood";
import { hasComponents } from "shared/hooks/components";
import { useTestLog } from "shared/hooks/debug";
import { State } from "shared/state";

const BLEED_RANGE_THRESHOLD = 100;

function bloodSplatterOnDamage(w: World, s: State) {
    let characterPosition: Vector3 | undefined = undefined;

    for (const [e, localPlr, renderable] of w.query(LocalPlr, Renderable)) {
        characterPosition = renderable.model.GetPivot().Position;
    }

    if (!characterPosition) return;

    const l = useTestLog(script);

    for (const [e, damageRecord] of w.queryChanged(Damage)) {
        if (!w.contains(e)) continue;
        if (!damageRecord.new) continue;

        if (!hasComponents(w, e, Health)) continue;

        if (damageRecord.new.damageType !== "physical") continue;

        const model = w.get(e, Renderable)?.model;
        if (!model) continue;

        const position = model.GetPivot().Position;
        if (characterPosition.sub(position).Magnitude > BLEED_RANGE_THRESHOLD) continue;

        bleed(s, model, 10, 20, 10, 5, position);
    }
}

export = bloodSplatterOnDamage;
