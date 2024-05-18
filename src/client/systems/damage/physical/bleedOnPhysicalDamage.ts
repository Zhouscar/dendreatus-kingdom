import { World } from "@rbxts/matter";
import { LocalPlr, Plr, Renderable, Transform } from "shared/components";
import { Damage, Health } from "shared/components/health";
import { bleed } from "shared/effects/blood";
import { hasComponents } from "shared/hooks/components";
import { State } from "shared/state";

const BLEED_RANGE_THRESHOLD = 100;

function bloodSplatterOnDamage(w: World, s: State) {
    const characterPosition = (() => {
        for (const [e, localPlr, transform] of w.query(LocalPlr, Transform)) {
            return transform.cf.Position;
        }
        return undefined;
    })();

    if (characterPosition === undefined) return;

    for (const [e, damageRecord] of w.queryChanged(Damage)) {
        if (!w.contains(e)) continue;
        if (!damageRecord.new) continue;

        if (!hasComponents(w, e, Health)) continue;

        if (damageRecord.new.damageType !== "physical") continue;

        const model = w.get(e, Renderable)?.pv;
        if (!model) continue;

        const position = model.GetPivot().Position;
        if (characterPosition.sub(position).Magnitude > BLEED_RANGE_THRESHOLD) continue;

        bleed(w, model, 10, 20, 10, 5, position);
    }
}

export = bloodSplatterOnDamage;
